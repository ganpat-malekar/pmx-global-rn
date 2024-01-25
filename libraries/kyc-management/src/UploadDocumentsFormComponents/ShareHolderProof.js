import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {
  Box,
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

import CompanyShareholders from "./CompanyShareholders";
import IndividualShareholdersTable from "./IndividualShareholders";

import FileViewPopup from "../../FileViewPopup";

import { decryptAES, encryptAES } from "../../../helper/cryptography";
import validatorRules from "../../../helper/customValidatorRules";
import { getFileAsBase64 } from "../../../helper/fileReader";
import useSimpleReactValidator from "../../../helper/useSimpleReactValidator";

import EventIcon from "@mui/icons-material/Event";
import { formUseStyles } from "../../../Theme";

import {
  fetchViewImage,
  saveShareHolderData,
} from "../../../store/actions/BusinessManagement/ManageBusinesses/KYC/action_CommonKYC";
import {
  getCountries,
  getEmirates,
} from "../../../store/actions/Common/Dropdowns/action_DataLists";
import { showAlert } from "../../../store/actions/UIActions";

function ShareHolderProof(props) {
  const classes = formUseStyles();
  const history = useHistory();
  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    validators: { ...validatorRules },
  });

  const [validator1, forceUpdate1] = useSimpleReactValidator({
    autoForceUpdate: true,
    validators: { ...validatorRules },
  });

  const [files, setFiles] = useState({
    commonFile: null,
    individualProof: null,
    companyProof: null,
  });

  const [dates, setDates] = useState({
    dateOfBirth: null,
    dateOfIssue: null,
    dateOfIssueCompany: null,
    dateOfExpiry: null,
    dateOfExpiryCompany: null,
    dateOfIncorporation: null,
  });

  const [values, setValues] = useState({
    NumOfShareholders: "",
    ShareHolderType: "",
  });

  const [individualValues, setIndividualValues] = useState({
    ShareholderName: "",
    IdProof: "",
    NameOnDocument: "",
    Nationality: "",
    Country: "",
  });

  const [individualShareholders, setIndividualShareholders] = useState([]);

  const [companyShareholders, setCompanyShareholders] = useState([]);

  const [companyValues, setCompanyValues] = useState({
    CompanyName: "",
    CompanyDocumentType: "",
    CompanyCountry: "",
  });

  const handleChange = (event) => {
    if (event.target.name === "ShareHolderType") {
      setIndividualValues({
        ShareholderName: "",
        IdProof: "",
        NameOnDocument: "",
        Nationality: "",
        Country: "",
      });

      setCompanyValues({
        CompanyName: "",
        CompanyDocumentType: "",
        CompanyCountry: "",
      });

      setDates({
        dateOfBirth: null,
        dateOfIssue: null,
        dateOfIssueCompany: null,
        dateOfExpiry: null,
        dateOfExpiryCompany: null,
        dateOfIncorporation: null,
      });
      validator.hideMessages();
    }

    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeIndividual = (event) => {
    setIndividualValues({
      ...individualValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeCompany = (event) => {
    setCompanyValues({
      ...companyValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleFiles = (file, type) => {
    setFiles({
      ...files,
      [type]: file?.name ? file : null,
    });
  };

  const viewFile = () => {
    props.fetchViewImage(
      {
        PaymateReferenceId: props.OtherShareHolderData.PaymateDocumentId,
        DocumentFileName: props.OtherShareHolderData.DocumentFileName,
      },
      true,
      true
    );
  };

  useEffect(() => {
    props.getCountries();
    props.getEmirates();
  }, []);

  const handleDateSelection = (date, property) => {
    setDates({
      ...dates,
      [property]: date,
    });
  };

  const handleSubmitIndividual = async () => {
    if (validator.allValid()) {
      if (files.individualProof?.name) {
        const fileName = files.individualProof.name;
        const fileExtension = "." + fileName.split(".")[1];
        try {
          const fileByteArray = await getFileAsBase64(files.individualProof);

          let data = {
            Crid: props.Crid,
            DocumentExpiryDate: moment(dates.dateOfExpiry).format("DD/MM/YYYY"),
            DocumentFile: null,
            DocumentFileExtension: fileExtension,
            DocumentFileName: fileName,
            DocumentId: "",
            KycType: "liShareHolderProof",
            DocumentContent: fileByteArray,
            CountryId: individualValues.Country,
            CompanyName: "", //?
            CountryName: props.countriesDropdown.filter(
              (e) => e.CountryId === individualValues.Country
            )[0].CountryName,
            DocumentIssueDate: moment(dates.dateOfIssue).format("DD/MM/YYYY"),
            DocumentName: props.IndividualDocumentNames.filter(
              (e) => e.Value === individualValues.IdProof
            )[0].Text,
            DocumentId: individualValues.IdProof,
            DocumentHolderBirthDate: moment(dates.dateOfBirth).format(
              "DD/MM/YYYY"
            ),
            Nationality: individualValues.Nationality,
            ShareholderName: individualValues.ShareholderName,
            DocumentHolderName: individualValues.NameOnDocument,
            EntityType: 1,
          };
          let temp = [...individualShareholders];
          temp.push(data);
          setIndividualShareholders(temp);

          setIndividualValues({
            ShareholderName: "",
            IdProof: "",
            NameOnDocument: "",
            Nationality: "",
            Country: "",
          });

          setFiles({
            ...files,
            individualProof: null,
          });

          setDates({
            ...dates,
            dateOfBirth: null,
            dateOfIssue: null,
            dateOfExpiry: null,
          });

          validator.hideMessages();
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      validator.showMessages();
      forceUpdate();
    }
  };

  const handleSubmitCompany = async () => {
    if (validator.allValid()) {
      if (files.companyProof?.name) {
        const fileName = files.companyProof.name;
        const fileExtension = "." + fileName.split(".")[1];
        try {
          const fileByteArray = await getFileAsBase64(files.companyProof);

          let data = {
            Crid: props.Crid,
            DocumentExpiryDate:
              dates.dateOfExpiryCompany !== null
                ? moment(dates.dateOfExpiryCompany).format("DD/MM/YYYY")
                : null,
            DocumentFile: null,
            DocumentFileExtension: fileExtension,
            DocumentFileName: fileName,
            DocumentId: "",
            KycType: "liShareHolderProof",
            DocumentContent: fileByteArray,
            CountryId: companyValues.CompanyCountry,
            CompanyName: companyValues.CompanyName,
            CountryName: props.countriesDropdown.filter(
              (e) => e.CountryId === companyValues.CompanyCountry
            )[0].CountryName,
            DocumentIssueDate:
              dates.dateOfIssueCompany !== null
                ? moment(dates.dateOfIssueCompany).format("DD/MM/YYYY")
                : null,
            DateOfIncorporation:
              dates.dateOfIncorporation !== null
                ? moment(dates.dateOfIncorporation).format("DD/MM/YYYY")
                : null,
            DocumentName: props.CompanyDocumentNames.filter(
              (e) => e.Value === companyValues.CompanyDocumentType
            )[0].Text,
            DocumentId: companyValues.CompanyDocumentType,
            EntityType: 2,
          };

          let temp = [...companyShareholders];
          temp.push(data);
          setCompanyShareholders(temp);

          setCompanyValues({
            CompanyName: "",
            CompanyDocumentType: "",
            CompanyCountry: "",
          });

          setFiles({
            ...files,
            companyProof: null,
          });

          setDates({
            ...dates,
            dateOfIncorporation: null,
            dateOfIssueCompany: null,
            dateOfExpiryCompany: null,
          });

          validator.hideMessages();
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      validator.showMessages();
      forceUpdate();
    }
  };

  const handleSubmit = async () => {
    const sum = individualShareholders.length + companyShareholders.length;

    if (+values.NumOfShareholders === sum) {
      if (validator1.allValid()) {
        if (files.commonFile?.name) {
          const fileName = files.commonFile.name;
          const fileExtension = "." + fileName.split(".")[1];
          try {
            const fileByteArray = await getFileAsBase64(files.commonFile);

            let data = [
              {
                Crid: props.Crid,
                NumberOfShareholders: encryptAES(values.NumOfShareholders),
                DocumentFile: null,
                DocumentFileExtension: fileExtension,
                DocumentFileName: fileName,
                DocumentId: props.OtherShareHolderData?.DocumentId,
                KycType: "liShareHolderProof",
                DocumentContent: fileByteArray,
                ClientId: props.ClientId,
              },
              ...individualShareholders,
              ...companyShareholders,
            ];
            props.saveShareHolderData(data);
            props.redirect(true);
          } catch (err) {
            console.log(err);
          }
        }
      } else if (
        props.OtherShareHolderData?.PaymateDocumentId &&
        props.OtherShareHolderData.PaymateDocumentId
      ) {
        let data = [
          {
            Crid: props.Crid,
            NumberOfShareholders: encryptAES(values.NumOfShareholders),
            DocumentFile: null,
            DocumentFileExtension:
              props.OtherShareHolderData.DocumentFileExtension,
            DocumentFileName: props.OtherShareHolderData.DocumentFileName,
            DocumentId: props.OtherShareHolderData.DocumentId,
            KycType: "liShareHolderProof",
            PaymateDocumentId: props.OtherShareHolderData.PaymateDocumentId,
            DocumentDetailId: props.OtherShareHolderData.DocumentDetailId,
            ClientId: props.ClientId,
          },
          ...individualShareholders,
          ...companyShareholders,
        ];
        props.saveShareHolderData(data);
        props.redirect(true);
      } else {
        validator1.showMessages();
        forceUpdate1();
      }
    } else {
      props.showAlert({
        type: "danger",
        message: `Please add ${values.NumOfShareholders} shareholders`,
      });
    }
  };

  const deleteIndividualShareholderRecord = (rowIndex) => {
    const filtered = individualShareholders.filter(
      (item, index) => index !== rowIndex
    );
    setIndividualShareholders(filtered);
    props.showAlert({
      type: "success",
      message: "Share holder deleted successfully",
    });
  };

  const deleteCompanyShareholderRecord = (rowIndex) => {
    const filtered = companyShareholders.filter(
      (item, index) => index !== rowIndex
    );
    setCompanyShareholders(filtered);
    props.showAlert({
      type: "success",
      message: "Share holder deleted successfully",
    });
  };

  useEffect(() => {
    if (props.CompanyShareholdersData) {
      setCompanyShareholders(props.CompanyShareholdersData);
    }
  }, [props.CompanyShareholdersData]);

  useEffect(() => {
    if (props.IndividualShareholderData) {
      setIndividualShareholders(props.IndividualShareholderData);
    }
  }, [props.IndividualShareholderData]);

  useEffect(() => {
    if (props.OtherShareHolderData) {
      //setIndividualShareholders(props.OtherShareHolderData);
      setValues({
        ...values,
        NumOfShareholders: props.OtherShareHolderData.NumberOfShareholders
          ? decryptAES(props.OtherShareHolderData.NumberOfShareholders)
          : "",
      });
    }
  }, [props.OtherShareHolderData]);

  validator.purgeFields();
  validator1.purgeFields();

  return (
    <>
      <div className={classes.FormPanel}>
        <FileViewPopup />
        <Grid container item lg={6} md={6} xs={12} spacing={3}>
          <Grid item lg={6} sm={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                id="NumOfShareholders"
                name="NumOfShareholders"
                label="Number of Shareholders"
                required
                select
                color="secondary"
                margin="normal"
                variant="outlined"
                size="normal"
                value={values.NumOfShareholders}
                onChange={handleChange}
                onBlur={() => {
                  validator1.showMessageFor("NumOfShareholders");
                }}
                helperText={validator1.message(
                  "NumOfShareholders",
                  values.NumOfShareholders,
                  "required"
                )}
              >
                {Array(10)
                  .fill()
                  .map((value, index) => {
                    // put into config
                    return (
                      <MenuItem key={index} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    );
                  })}
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
                    opacity: files.commonFile?.name ? 1 : 0,
                  },
                }}
                id="InvoiceFile"
                name="InvoiceFile"
                label={
                  props.OtherShareHolderData?.PaymateDocumentId
                    ? props.OtherShareHolderData?.DocumentFileName
                    : "Upload Valid Proof"
                }
                type="file"
                color="secondary"
                margin="normal"
                variant="outlined"
                size="normal"
                //value={files.commonFile?.name ? files.commonFile.name : ""}
                onChange={(e) => {
                  const file = Array.from(e.target.files)[0];
                  handleFiles(file, "commonFile");
                }}
                onBlur={() => {
                  validator1.showMessageFor("InvoiceFile");
                }}
                helperText={
                  // TODO: Make a rule for filetype, filesize. validation
                  validator1.message(
                    "InvoiceFile",
                    files.commonFile,
                    "required|upload_file_size:10485760|upload_file_type"
                  ) || (
                    <div>
                      {props?.OtherShareHolderData?.PaymateDocumentId && (
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

        {values.NumOfShareholders >
          companyShareholders.length + individualShareholders.length &&
        props.KycStatus !== 7 &&
        props.OtherShareHolderData?.Status !== "Approved" ? (
          <Box>
            <Grid container item lg={6} md={6} xs={12} spacing={3}>
              <Grid item lg={12} md={12} xs={12}>
                <Divider sx={{ mt: 4, mb: 1 }} />
              </Grid>

              <Grid item lg={12} md={12} xs={12}>
                <Typography sx={{ color: "#47B6E7" }}>
                  Fill Up Shareholder Details
                </Typography>
              </Grid>

              <Grid item lg={6} sm={6} md={6} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="ShareHolderType"
                    name="ShareHolderType"
                    label="Shareholder Type"
                    required
                    select
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    size="normal"
                    value={values.ShareHolderType}
                    onChange={handleChange}
                    onBlur={() => {
                      validator.showMessageFor("ShareHolderType");
                    }}
                    helperText={validator.message(
                      "Share_Holder_Type",
                      values.ShareHolderType,
                      "required"
                    )}
                  >
                    <MenuItem value="1">Individual</MenuItem>
                    <MenuItem value="2">Organization</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} xs={12}></Grid>

              {values.ShareHolderType === "1" && (
                <>
                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        // integer only
                        id="ShareholderName"
                        name="ShareholderName"
                        label="Shareholder Name"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        size="normal"
                        value={individualValues.ShareholderName}
                        onChange={handleChangeIndividual}
                        inputProps={{
                          autoComplete: "nope",
                          maxlength: "16",
                        }}
                        // onBlur={() => {
                        //   validator.showMessageFor("Share_holder_Name");
                        // }}
                        helperText={validator.message(
                          "Share_holder_Name",
                          individualValues.ShareholderName,
                          ["required", "contact_name_validator"]
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        id="IdProof"
                        name="IdProof"
                        label="Choose an ID Proof"
                        select
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        size="normal"
                        value={individualValues.IdProof}
                        onChange={handleChangeIndividual}
                        // onBlur={() => {
                        //   validator.showMessageFor("Id_Proof");
                        // }}
                        helperText={validator.message(
                          "Id_Proof",
                          individualValues.IdProof,
                          "required"
                        )}
                      >
                        {!_.isEmpty(props.IndividualDocumentNames) ? (
                          props.IndividualDocumentNames.map(
                            (document, index) => {
                              return (
                                <MenuItem key={index} value={document.Value}>
                                  {document.Text}
                                </MenuItem>
                              );
                            }
                          )
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
                            opacity: files.individualProof?.name ? 1 : 0,
                          },
                        }}
                        id="individualProof"
                        name="individualProof"
                        label="Upload a valid proof"
                        type="file"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        size="normal"
                        // value={""}
                        onChange={(e) => {
                          const file = Array.from(e.target.files)[0];
                          handleFiles(file, "individualProof");
                        }}
                        // onBlur={() => {
                        //   validator.showMessageFor("individualProof");
                        // }}
                        helperText={
                          // TODO: Make a rule for filetype, filesize. validation
                          validator.message(
                            "Proof",
                            files.individualProof,
                            "required|upload_file_size:10485760|upload_file_type"
                          ) ||
                          "Upload a PDF, JPG, JPEG, GIF, PNG of invoice for upto 10MB size."
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <FileUploadIcon />{" "}
                              {/* FIXME: Import correct icon */}
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

                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          disableFuture
                          label="Date of Birth"
                          inputFormat="dd/MM/yyyy"
                          value={dates.dateOfBirth}
                          showToolbar={false}
                          onChange={(date) =>
                            handleDateSelection(date, "dateOfBirth")
                          }
                          renderInput={(params) => (
                            <TextField
                              required
                              id="dateOfBirth"
                              name="dateOfBirth"
                              color="secondary"
                              margin="normal"
                              size="normal"
                              {...params}
                              helperText={validator.message(
                                "Date_Of_Birth",
                                dates.dateOfBirth,
                                "required"
                              )}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <EventIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>

                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        // integer only
                        id="NameOnDocument"
                        name="NameOnDocument"
                        label="Name on Document"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        size="normal"
                        value={individualValues.NameOnDocument}
                        onChange={handleChangeIndividual}
                        inputProps={{
                          autoComplete: "nope",
                          maxlength: "16",
                        }}
                        // onBlur={() => {
                        //   validator.showMessageFor("Name_On_Document");
                        // }}
                        helperText={validator.message(
                          "Name_On_Document",
                          individualValues.NameOnDocument,
                          ["required", "contact_name_validator"]
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        // integer only
                        id="Nationality"
                        name="Nationality"
                        label="Nationality"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        size="normal"
                        value={individualValues.Nationality}
                        onChange={handleChangeIndividual}
                        inputProps={{
                          autoComplete: "nope",
                          maxlength: "16",
                        }}
                        // onBlur={() => {
                        //   validator.showMessageFor("Nationality");
                        // }}
                        helperText={validator.message(
                          "Nationality",
                          individualValues.Nationality,
                          ["required", "contact_name_validator"]
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        id="Country"
                        name="Country"
                        label="Country"
                        required
                        select
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        size="normal"
                        value={individualValues.Country}
                        onChange={handleChangeIndividual}
                        // onBlur={() => {
                        //   validator.showMessageFor("Country");
                        // }}
                        helperText={validator.message(
                          "Country",
                          individualValues.Country,
                          "required"
                        )}
                      >
                        {!_.isEmpty(props.countriesDropdown) ? (
                          props.countriesDropdown.map((country, index) => {
                            return (
                              <MenuItem key={index} value={country.CountryId}>
                                {country.CountryName}
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
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          disableFuture
                          label="Date of Issue"
                          inputFormat="dd/MM/yyyy"
                          showToolbar={false}
                          // minDate={new Date() - 20} // FIXME: Allow from past 20 years till today
                          value={dates.dateOfIssue}
                          onChange={(date) =>
                            handleDateSelection(date, "dateOfIssue")
                          }
                          renderInput={(params) => (
                            <TextField
                              required
                              id="dateOfIssue"
                              name="dateOfIssue"
                              color="secondary"
                              margin="normal"
                              size="normal"
                              {...params}
                              helperText={validator.message(
                                "Date_Of_Issue",
                                dates.dateOfIssue,
                                "required"
                              )}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <EventIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>

                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          disablePast
                          label="Date of Expiry"
                          inputFormat="dd/MM/yyyy"
                          showToolbar={false}
                          // minDate={new Date() - 20} // FIXME: Allow from past 20 years till today
                          value={dates.dateOfExpiry}
                          onChange={(date) =>
                            handleDateSelection(date, "dateOfExpiry")
                          }
                          renderInput={(params) => (
                            <TextField
                              required
                              id="dateOfExpiry"
                              name="dateOfExpiry"
                              color="secondary"
                              margin="normal"
                              size="normal"
                              {...params}
                              helperText={validator.message(
                                "Date_Of_Expiry",
                                dates.dateOfExpiry,
                                "required"
                              )}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <EventIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <Button
                      style={{ marginRight: "1%" }}
                      variant="contained"
                      color="primary"
                      onClick={handleSubmitIndividual}
                    >
                      Add Shareholder
                    </Button>
                  </Grid>
                </>
              )}

              {values.ShareHolderType === "2" && (
                <>
                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        // integer only
                        id="CompanyName"
                        name="CompanyName"
                        label="Name of Company"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        size="normal"
                        value={companyValues.CompanyName}
                        onChange={handleChangeCompany}
                        inputProps={{
                          autoComplete: "nope",
                          maxlength: "16",
                        }}
                        // onBlur={() => {
                        //   validator.showMessageFor("CompanyName");
                        // }}
                        helperText={validator.message(
                          "CompanyName",
                          companyValues.CompanyName,
                          ["required", "business_name_validator"]
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        id="CompanyDocumentType"
                        name="CompanyDocumentType"
                        label="Choose a document type"
                        required
                        select
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        size="normal"
                        value={companyValues.CompanyDocumentType}
                        onChange={handleChangeCompany}
                        // onBlur={() => {
                        //   validator.showMessageFor("CompanyDocumentType");
                        // }}
                        helperText={validator.message(
                          "CompanyDocumentType",
                          companyValues.CompanyDocumentType,
                          "required"
                        )}
                      >
                        {!_.isEmpty(props.CompanyDocumentNames) ? (
                          props.CompanyDocumentNames.map((document, index) => {
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
                        id="CompanyCountry"
                        name="CompanyCountry"
                        label="Country"
                        required
                        select
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        size="normal"
                        value={companyValues.CompanyCountry}
                        onChange={handleChangeCompany}
                        // onBlur={() => {
                        //   validator.showMessageFor("CompanyCountry");
                        // }}
                        helperText={validator.message(
                          "CompanyCountry",
                          companyValues.CompanyCountry,
                          "required"
                        )}
                      >
                        {!_.isEmpty(props.countriesDropdown) ? (
                          props.countriesDropdown.map((country, index) => {
                            return (
                              <MenuItem key={index} value={country.CountryId}>
                                {country.CountryName}
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
                            opacity: files.companyProof?.name ? 1 : 0,
                          },
                        }}
                        id="CompanyDocumentProof"
                        name="CompanyDocumentProof"
                        label="Upload a valid proof"
                        type="file"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        size="normal"
                        // value={""}
                        onChange={(e) => {
                          const file = Array.from(e.target.files)[0];
                          handleFiles(file, "companyProof");
                        }}
                        // onBlur={() => {
                        //   validator.showMessageFor("CompanyDocumentProof");
                        // }}
                        helperText={
                          // TODO: Make a rule for filetype, filesize. validation
                          validator.message(
                            "CompanyDocumentProof",
                            files.companyProof,
                            "required|upload_file_size:10485760|upload_file_type"
                          ) ||
                          "Upload a PDF, JPG, JPEG, GIF, PNG of invoice for upto 10MB size."
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <FileUploadIcon />{" "}
                              {/* FIXME: Import correct icon */}
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

                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          disableFuture
                          label="Date of Incorporation"
                          inputFormat="dd/MM/yyyy"
                          showToolbar={false}
                          // minDate={new Date() - 20} // FIXME: Allow from past 20 years till today
                          value={dates.dateOfIncorporation}
                          onChange={(date) =>
                            handleDateSelection(date, "dateOfIncorporation")
                          }
                          renderInput={(params) => (
                            <TextField
                              required
                              id="dateOfIncorporation"
                              name="dateOfIncorporation"
                              color="secondary"
                              margin="normal"
                              size="normal"
                              {...params}
                              helperText={validator.message(
                                "Date_Of_Incorporation",
                                dates.dateOfIncorporation,
                                "required"
                              )}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <EventIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>

                  {companyValues.CompanyDocumentType ===
                    "D11A3B7D6164A522F5B7F30E7C2D16A4" && (
                    <Grid item lg={6} sm={6} md={6} xs={12}>
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            disablePast
                            label="Date of Expiry"
                            inputFormat="dd/MM/yyyy"
                            showToolbar={false}
                            // minDate={new Date() - 20} // FIXME: Allow from past 20 years till today
                            value={dates.dateOfExpiryCompany}
                            onChange={(date) =>
                              handleDateSelection(date, "dateOfExpiryCompany")
                            }
                            renderInput={(params) => (
                              <TextField
                                required
                                id="dateOfExpiryCompany"
                                name="dateOfExpiryCompany"
                                color="secondary"
                                margin="normal"
                                size="normal"
                                {...params}
                                helperText={validator.message(
                                  "Date_Of_Incorporation",
                                  dates.dateOfExpiryCompany,
                                  "required"
                                )}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <EventIcon />
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

                  {companyValues.CompanyDocumentType ===
                    "11CE793E3826F54C13ECA78F2A21BB69" && (
                    <Grid item lg={6} sm={6} md={6} xs={12}>
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            disableFuture
                            label="Date of Issue"
                            inputFormat="dd/MM/yyyy"
                            showToolbar={false}
                            // minDate={new Date() - 20} // FIXME: Allow from past 20 years till today
                            value={dates.dateOfIssueCompany}
                            onChange={(date) =>
                              handleDateSelection(date, "dateOfIssueCompany")
                            }
                            renderInput={(params) => (
                              <TextField
                                required
                                id="dateOfIssueCompany"
                                name="dateOfIssueCompany"
                                color="secondary"
                                margin="normal"
                                size="normal"
                                {...params}
                                helperText={validator.message(
                                  "Date_Of_Incorporation",
                                  dates.dateOfIssueCompany,
                                  "required"
                                )}
                              />
                            )}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <EventIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
                  )}

                  <Grid item lg={12} md={12} xs={12}>
                    <Button
                      style={{ marginRight: "1%" }}
                      variant="contained"
                      color="primary"
                      onClick={handleSubmitCompany}
                    >
                      Add Shareholder
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        ) : (
          <></>
        )}
      </div>

      <Box>
        <Divider sx={{ mt: 2, mb: 4 }} />
        <Typography sx={{ color: "#47B6E7" }}>
          List of Individual Shareholders and Details
        </Typography>
        <IndividualShareholdersTable
          IndividualShareholders={individualShareholders}
          deleteIndividualShareholderRecord={deleteIndividualShareholderRecord}
        />
        <Typography sx={{ color: "#47B6E7" }}>
          List of Company Shareholders and Details
        </Typography>
        <CompanyShareholders
          CompanyShareholders={companyShareholders}
          deleteCompanyShareholderRecord={deleteCompanyShareholderRecord}
        />
      </Box>

      {props.KycStatus !== 7 &&
      props.OtherShareHolderData?.Status !== "Approved" ? (
        <Stack spacing={3} sx={{ paddingBottom: "36px" }}>
          <Divider className={classes.Divider} />
          <Stack spacing={2} direction="row">
            <Button
              style={{ marginRight: "1%" }}
              variant="outlined"
              color="primary"
              onClick={() => {
                props.changeTab("e", 3);
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
              Submit
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

ShareHolderProof.propTypes = {};

const mapStateToProps = (state) => ({
  test: state.businessKYC,
  CompanyDocumentNames: state.businessKYC.CompanyShareholder?.DocumentTypes,
  IndividualDocumentNames: state.businessKYC.IndividualShareholder?.lstIDProof,
  countriesDropdown: state.dataLists.countriesMetadata,
  CompanyShareholdersData: state.businessKYC.CompanyShareHoldersData,
  IndividualShareholderData: state.businessKYC.IndividualShareHoldersData,
  OtherShareHolderData: state.businessKYC.ShareHolder,
  ClientId: state.businessKYC.ClientId,
});

export default connect(mapStateToProps, {
  getCountries,
  getEmirates,
  saveShareHolderData,
  fetchViewImage,
  showAlert,
})(ShareHolderProof);
