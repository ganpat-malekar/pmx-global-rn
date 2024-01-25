import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import _ from "underscore";
import { closeFileModal } from "../../../store/actions/Common/filePopupActions";

import FileViewPopup from "../../../components/FileViewPopup";

import validatorRules from "../../../helper/customValidatorRules";
import { getFileAsBase64 } from "../../../helper/fileReader";
import useSimpleReactValidator from "../../../helper/useSimpleReactValidator";

import { formUseStyles } from "../../../Theme";

import {
  fetchViewImage,
  saveKYCDocumentDetails,
} from "../../../store/actions/BusinessManagement/ManageBusinesses/KYC/action_CommonKYC";
import { handleFileModal } from "../../../store/actions/Common/filePopupActions";
import { initialFilePopupState } from "../../../store/reducers/Common/filePopupReducer";

function BankAccountDetails(props) {
  const classes = formUseStyles();
  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    validators: { ...validatorRules },
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const [values, setValues] = useState({
    BankAccountProof: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    if (validator.allValid()) {
      if (selectedFile?.name) {
        const fileName = selectedFile.name;
        const fileExtension = "." + fileName.split(".")[1];
        try {
          const fileByteArray = await getFileAsBase64(selectedFile);

          var data = {
            Crid: props.Crid,
            DocumentExpiryDate: null,
            DocumentFile: null,
            DocumentFileExtension: fileExtension,
            DocumentFileName: fileName,
            DocumentId: values.BankAccountProof,
            KycType: "liBankStatement",
            DocumentContent: fileByteArray,
            ClientId: props.ClientId,
          };
          props.saveKYCDocumentDetails(data);
          props.redirect(true);
        } catch (err) {
          console.log(err);
        }
      }
    } else if (
      props.BankAccountProofData?.PaymateDocumentId &&
      props.BankAccountProofData.PaymateDocumentId
    ) {
      var data = {
        Crid: props.Crid,
        DocumentExpiryDate: null,
        DocumentFile: null,
        DocumentFileExtension: props.BankAccountProofData.DocumentFileExtension,
        DocumentFileName: props.BankAccountProofData.DocumentFileName,
        DocumentId: values.BankAccountProof,
        KycType: "liBankStatement",
        PaymateDocumentId: props.BankAccountProofData.PaymateDocumentId,
        DocumentDetailId: props.BankAccountProofData.DocumentDetailId,
        ClientId: props.ClientId,
      };
      props.saveKYCDocumentDetails(data);
      props.redirect(true);
    } else {
      validator.showMessages();
      forceUpdate();
    }
  };

  const viewFile = () => {
    props.fetchViewImage(
      {
        PaymateReferenceId: props.BankAccountProofData.PaymateDocumentId,
        DocumentFileName: props.BankAccountProofData.DocumentFileName,
      },
      true,
      true
    );
  };

  useEffect(() => {
    return () => {
      setSelectedFile(null);

      setValues({
        BankAccountProof: "",
      });
      props.closeFileModal();
    };
  }, []);

  useEffect(() => {
    if (props.BankAccountProofData) {
      setValues({
        BankAccountProof: props.BankAccountProofData?.DocumentId,
      });
    }
  }, [props.BankAccountProofData]);

  return (
    <>
      <div className={classes.FormPanel}>
        <FileViewPopup />
        <Grid container item lg={6} md={6} xs={12} spacing={3}>
          <Grid item lg={6} sm={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                id="BankAccountProof"
                name="BankAccountProof"
                label="Choose Bank Account Proof"
                required
                select
                color="secondary"
                margin="normal"
                variant="outlined"
                size="normal"
                value={values.BankAccountProof}
                onChange={handleChange}
                onBlur={() => {
                  validator.showMessageFor("BankAccountProof");
                }}
                helperText={validator.message(
                  "BankAccountProof",
                  values.BankAccountProof,
                  "required"
                )}
              >
                {!_.isEmpty(props.DocumentNames) ? (
                  props.DocumentNames.map((document, index) => {
                    return (
                      <MenuItem key={index} value={document.Value}>
                        {document.Text}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem disabled>No options</MenuItem>
                )}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                // TODO: Try making a component for this
                sx={{
                  "& input": {
                    opacity: selectedFile?.name ? 1 : 0,
                  },
                }}
                id="InvoiceFile"
                name="InvoiceFile"
                label={
                  props.BankAccountProofData?.PaymateDocumentId
                    ? props.BankAccountProofData?.DocumentFileName
                    : "Upload Valid Proof"
                }
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
                  validator.showMessageFor("InvoiceFile");
                }}
                helperText={
                  // TODO: Make a rule for filetype, filesize. validation
                  validator.message(
                    "InvoiceFile",
                    selectedFile,
                    "required|upload_file_size:10485760|upload_file_type"
                  ) || (
                    <div>
                      {props?.BankAccountProofData?.PaymateDocumentId && (
                        <>
                          <Typography variant="caption">
                            Click{" "}
                            <span
                              style={{ color: "#47B6E7", cursor: "pointer" }}
                              onClick={viewFile}
                            >
                              here
                            </span>{" "}
                            to view document.
                          </Typography>
                          <br />
                        </>
                      )}

                      <Typography variant="caption">
                        Upload a PDF, JPG, JPEG, GIF, PNG of invoice for upto
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
      </div>
      {props.KycStatus !== 7 &&
      props.BankAccountProofData?.Status !== "Approved" ? (
        <Stack spacing={3} sx={{ paddingBottom: "36px" }}>
          <Divider className={classes.Divider} />
          <Stack spacing={2} direction="row">
            <Button
              style={{ marginRight: "1%" }}
              variant="outlined"
              color="primary"
              onClick={() => {
                props.changeTab("e", 2);
              }}
            >
              Back
            </Button>
            <Button
              style={{ marginRight: "1%" }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Link
              to={
                props.fromPage === "AddContact"
                  ? "/App/ManageContacts"
                  : "/App/ManageBusiness"
              }
            >
              <Button color="error">Cancel</Button>
            </Link>
          </Stack>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
}

BankAccountDetails.propTypes = {};

const mapStateToProps = (state) => ({
  DocumentNames: state.businessKYC.BankAccountProof?.DocumentNames,
  BankAccountProofData: state.businessKYC.BankAccountProof,
  ClientId: state.businessKYC.ClientId,
});

export default connect(mapStateToProps, {
  saveKYCDocumentDetails,
  fetchViewImage,
  handleFileModal,
  closeFileModal,
})(BankAccountDetails);
