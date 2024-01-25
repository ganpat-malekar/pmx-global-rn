import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import EventIcon from "@mui/icons-material/Event";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
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

import moment from "moment";
import _ from "underscore";

import FileViewPopup from "../../../components/FileViewPopup";

import validatorRules from "../../../helper/customValidatorRules";
import { getFileAsBase64 } from "../../../helper/fileReader";
import useSimpleReactValidator from "../../../helper/useSimpleReactValidator";

import { formUseStyles } from "../../../Theme";
import { closeFileModal } from "../../../store/actions/Common/filePopupActions";

import {
  fetchViewImage,
  saveKYCDocumentDetails,
} from "../../../store/actions/BusinessManagement/ManageBusinesses/KYC/action_CommonKYC";
import { handleFileModal } from "../../../store/actions/Common/filePopupActions";
import { initialFilePopupState } from "../../../store/reducers/Common/filePopupReducer";

function BusinessProof(props) {
  const classes = formUseStyles();
  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    validators: { ...validatorRules },
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [issueDate, setIssueDate] = useState(null);

  const [values, setValues] = useState({
    businessName: "",
    documentType: "",
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleDate = (type) => (newValue) => {
    if (type === "Expiry") {
      setExpiryDate(newValue);
    }
    if (type === "Issue") {
      setIssueDate(newValue);
    }
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
            CompanyName: values.businessName,
            DocumentExpiryDate:
              expiryDate !== null
                ? moment(expiryDate).format("DD/MM/YYYY")
                : null, //"26/08/2022"
            DocumentIssueDate:
              issueDate !== null
                ? moment(issueDate).format("DD/MM/YYYY")
                : null,
            DocumentFile: null,
            DocumentFileExtension: fileExtension,
            DocumentFileName: fileName,
            DocumentId: values.documentType,
            KycType: "liBusinessProof",
            DocumentContent: fileByteArray,
            ClientId: props.ClientId,
          };
          props.saveKYCDocumentDetails(data);
        } catch (err) {
          console.log(err);
        }
      }
    } else if (
      props.BusinessData?.PaymateDocumentId &&
      props.BusinessData.PaymateDocumentId
    ) {
      var data = {
        Crid: props.Crid,
        CompanyName: values.businessName,
        DocumentExpiryDate:
          expiryDate !== null ? moment(expiryDate).format("DD/MM/YYYY") : null, //"26/08/2022"
        DocumentIssueDate:
          issueDate !== null ? moment(issueDate).format("DD/MM/YYYY") : null,
        DocumentFile: null,
        DocumentFileExtension: props.BusinessData.DocumentFileExtension,
        DocumentFileName: props.BusinessData.DocumentFileName,
        DocumentId: values.documentType,
        KycType: "liBusinessProof",
        PaymateDocumentId: props.BusinessData.PaymateDocumentId,
        DocumentDetailId: props.BusinessData.DocumentDetailId,
        DocumentHolderName: props.BusinessData.DocumentHolderName,
        ClientId: props.ClientId,
      };
      props.saveKYCDocumentDetails(data);
    } else {
      validator.showMessages();
      forceUpdate();
    }
  };

  const viewFile = () => {
    props.fetchViewImage(
      {
        PaymateReferenceId: props.BusinessData.PaymateDocumentId,
        DocumentFileName: props.BusinessData.DocumentFileName,
      },
      true,
      true
    );
  };

  useEffect(() => {
    return () => {
      props.closeFileModal();
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(props.BusinessData)) {
      setValues({
        businessName: props.BusinessData?.CompanyName,
        documentType: props.BusinessData?.DocumentId,
      });

      if (props.BusinessData?.DocumentExpiryDate) {
        const [day, month, year] =
          props.BusinessData?.DocumentExpiryDate.split("/");
        setExpiryDate(year + "-" + month + "-" + day);
      }

      if (props.BusinessData?.DocumentIssueDate) {
        const [day, month, year] =
          props.BusinessData?.DocumentIssueDate.split("/");
        setIssueDate(year + "-" + month + "-" + day);
      }
    }
  }, [props.BusinessData]);

  validator.purgeFields();

  return (
    <>
      <div className={classes.FormPanel}>
        <FileViewPopup />
        <Grid container item lg={6} md={6} xs={12} spacing={3}>
          <Grid item lg={6} sm={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                id="businessName"
                name="businessName"
                label="Enter Business Name"
                color="secondary"
                margin="normal"
                variant="outlined"
                size="normal"
                value={values.businessName}
                onChange={handleChange}
                inputProps={{
                  autoComplete: "nope",
                }}
                onBlur={() => {
                  validator.showMessageFor("businessName");
                }}
                helperText={validator.message(
                  "businessName",
                  values.businessName,
                  "required"
                )}
              />
            </FormControl>
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                id="documentType"
                name="documentType"
                label="Document Type"
                required
                select
                color="secondary"
                margin="normal"
                variant="outlined"
                size="normal"
                value={values.documentType}
                onChange={handleChange}
                onBlur={() => {
                  validator.showMessageFor("documentType");
                }}
                helperText={validator.message(
                  "documentType",
                  values.documentType,
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

          {/* PaymateDocumentId */}
          <Grid item lg={6} sm={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                sx={{
                  "& input": {
                    opacity: selectedFile?.name ? 1 : 0,
                  },
                }}
                id="BusinessProofDocument"
                name="BusinessProofDocument"
                label={
                  props.BusinessData?.PaymateDocumentId
                    ? props.BusinessData?.DocumentFileName
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
                  validator.showMessageFor("BusinessProofDocument");
                }}
                helperText={
                  // TODO: Make a rule for filetype, filesize. validation
                  validator.message(
                    "BusinessProofDocument",
                    selectedFile,
                    "required|upload_file_size:10485760|upload_file_type"
                  ) || (
                    <div>
                      {props?.BusinessData?.PaymateDocumentId && (
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

          {values.documentType === "6D2A78B29B684FB0C476EBE1F38EFEB1" && (
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    disablePast
                    label="Date of Expiry"
                    inputFormat="dd/MM/yyyy"
                    // minDate={new Date() - 20} // FIXME: Allow from past 20 years till today
                    value={expiryDate}
                    onChange={handleDate("Expiry")}
                    showToolbar={false}
                    renderInput={(params) => (
                      <TextField
                        required
                        id="expiryDate"
                        name="expiryDate"
                        color="secondary"
                        margin="normal"
                        size="normal"
                        {...params}
                        onBlur={() => {
                          validator.showMessageFor("expiryDate");
                        }}
                        helperText={validator.message(
                          "expiry_date",
                          expiryDate,
                          "required"
                        )}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {/* <IconButton edge="end"> */}
                              <EventIcon />
                              {/* </IconButton> */}
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
          )}

          {values.documentType === "E50919707732129DD0707103E1E53766" && (
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    disableFuture
                    label="Date of Issue"
                    inputFormat="dd/MM/yyyy"
                    // minDate={new Date() - 20} // FIXME: Allow from past 20 years till today
                    value={issueDate}
                    onChange={handleDate("Issue")}
                    showToolbar={false}
                    renderInput={(params) => (
                      <TextField
                        required
                        id="issueDate"
                        name="issueDate"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        size="normal"
                        {...params}
                        onBlur={() => {
                          validator.showMessageFor("issueDate");
                        }}
                        helperText={validator.message(
                          "issue_date",
                          issueDate,
                          "required"
                        )}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {/* <IconButton edge="end"> */}
                              <EventIcon />
                              {/* </IconButton> */}
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </div>
      {props.KycStatus !== 7 && props.BusinessData?.Status !== "Approved" ? (
        <Stack spacing={3} sx={{ paddingBottom: "36px" }}>
          <Divider className={classes.Divider} />
          <Stack spacing={2} direction="row">
            <Button variant="outlined" color="primary" onClick={handleSubmit}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
            <Link to="/App/Dashboard">
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

BusinessProof.propTypes = {};

const mapStateToProps = (state) => ({
  DocumentNames: state.businessKYC.BusinessProof?.DocumentNames,
  BusinessData: state.businessKYC.BusinessProof,
  ClientId: state.businessKYC.ClientId,
});

export default connect(mapStateToProps, {
  saveKYCDocumentDetails,
  fetchViewImage,
  handleFileModal,
  closeFileModal,
})(BusinessProof);
