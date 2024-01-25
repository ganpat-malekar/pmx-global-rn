import React, { useState } from "react";
import { connect } from "react-redux";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Dialog,
  Typography,
  Stack,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";
import Button from "@mui/material/Button";

import validatorRules from "../../helper/customValidatorRules";
import { getFileAsBase64 } from "../../helper/fileReader";
import useSimpleReactValidator from "../../helper/useSimpleReactValidator";

import alertImage from "../../Assets/images/alert.svg";

import { useStyles } from "../../Theme";

import { saveSingleDocumentFile } from "../../store/actions/Common/UploadDocumentPromptActions";

function UploadDocumentPrompt({
  isPromptOpen,
  DocumentDetailId,
  DocumentName,
  closePrompt,
  ...props
}) {
  const classes = useStyles();
  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    validators: { ...validatorRules },
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async () => {
    if (validator.allValid()) {
      if (selectedFile?.name) {
        const fileName = selectedFile.name;
        const fileExtension = "." + fileName.split(".")[1];
        try {
          const base64File = await getFileAsBase64(selectedFile);

          const payload = {
            DocumentDetiailId: DocumentDetailId, // Yes, the spelling is worng!
            DocumentFileExtension: fileExtension,
            DocumentFileName: fileName,
            DocumentContentstring: base64File,
          };

          // console.log(base64File);
          const success = await props.saveSingleDocumentFile(payload);
          if (success) {
            closePrompt();
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      validator.showMessages();
      forceUpdate();
    }
  };

  return (
    <Dialog
      PaperProps={{ square: true }}
      className={classes.NewDeleteDialog}
      open={isPromptOpen ?? false}
      onClose={closePrompt}
      fullWidth={true}
      maxWidth="sm"
    >
      <div className="CustomDialogContainer-root">
        <div>
          <img alt="alert" src={alertImage} />
        </div>
        <div style={{ flex: "0 0 82%" }}>
          <DialogTitle className={classes.ViewDialogTitle}>
            <Typography variant="h6">Verify Document</Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container item lg={12} md={12} xs={12} spacing={3}>
              <Grid item lg={12} sm={12} md={12} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    // TODO: Try making a component for this
                    sx={{
                      "& input": {
                        opacity: selectedFile?.name ? 1 : 0,
                      },
                    }}
                    id="file"
                    name="file"
                    label={`Upload valid ${DocumentName}`}
                    type="file"
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    size="normal"
                    // value={""}
                    onChange={(e) => {
                      const file = Array.from(e.target.files)[0];
                      setSelectedFile(file?.name ? file : null);
                    }}
                    onBlur={() => {
                      validator.showMessageFor("file");
                    }}
                    helperText={
                      // TODO: Make a rule for filetype, filesize. validation
                      validator.message(
                        "file",
                        selectedFile,
                        "required|upload_file_size:10485760|upload_file_type"
                      ) || (
                        <div>
                          <Typography variant="caption">
                            Upload a PDF, JPG, JPEG, PNG of invoice for upto
                            10MB size.
                          </Typography>
                        </div>
                      )
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <FileUploadIcon /> {/* FIXME: Import correct icon */}
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      multiple: false, // In case of true, we might need chips to display individual files and a removal logic
                      accept: "image/*,application/pdf", // Will fail if file is dragged n dropped
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleSubmit} autoFocus>
                Submit
              </Button>
              <Button color="primary" onClick={closePrompt}>
                Cancel
              </Button>
            </Stack>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.uploadDocumentPrompt,
  };
};

export default connect(mapStateToProps, {
  saveSingleDocumentFile,
})(UploadDocumentPrompt);
