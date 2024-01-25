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

import FileViewPopup from "../../FileViewPopup";
import { closeFileModal } from "../../../store/actions/Common/filePopupActions";
import validatorRules from "../../../helper/customValidatorRules";
import { getFileAsBase64 } from "../../../helper/fileReader";
import useSimpleReactValidator from "../../../helper/useSimpleReactValidator";

import { formUseStyles } from "../../../Theme";

import {
  fetchViewImage,
  saveKYCDocumentDetails,
} from "../../../store/actions/BusinessManagement/ManageBusinesses/KYC/action_CommonKYC";
import {
  getCountries,
  getEmirates,
} from "../../../store/actions/Common/Dropdowns/action_DataLists";
import { handleFileModal } from "../../../store/actions/Common/filePopupActions";
import { initialFilePopupState } from "../../../store/reducers/Common/filePopupReducer";

function AddressProof(props) {
  const classes = formUseStyles();
  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    validators: { ...validatorRules },
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const [values, setValues] = useState({
    AddressProof: "",
    Country: "",
    StreetAddress: "",
    PostalCode: "",
    Emirate: "",
  });

  useEffect(() => {
    props.getCountries();
    props.getEmirates();
  }, []);

  const handleChange = (event) => {
    let regExp = /[a-zA-Z ]/g;
    if (event.target.name === "PostalCode") {
      if (!regExp.test(event.target.value) || event.target.value === "") {
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });
      }
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    if (validator.allValid()) {
      if (selectedFile?.name) {
        const fileName = selectedFile.name;
        const fileExtension = "." + fileName.split(".")[1];

        let filtered_state = props.emiratesDropdown.filter(
          (e) => e.StateId === values.Emirate
        );
        try {
          const fileByteArray = await getFileAsBase64(selectedFile);

          var data = {
            Crid: props.Crid,
            CityName: values.Emirate,
            DocumentExpiryDate: null,
            DocumentFile: null,
            DocumentFileExtension: fileExtension,
            DocumentFileName: fileName,
            DocumentId: values.AddressProof,
            KycType: "liAddressProof",
            DocumentContent: fileByteArray,
            CountryId: values.Country,
            PostalCode: values.PostalCode,
            StateCode: filtered_state[0].StateCode,
            StreetAddress: values.StreetAddress,
            ClientId: props.ClientId,
          };
          props.saveKYCDocumentDetails(data);
        } catch (err) {
          console.log(err);
        }
      }
    } else if (
      props.AddressProofData?.PaymateDocumentId &&
      props.AddressProofData.PaymateDocumentId
    ) {
      let filtered_state = props.emiratesDropdown.filter(
        (e) => e.StateId === values.Emirate
      );

      var data = {
        Crid: props.Crid,
        CityName: values.Emirate,
        DocumentExpiryDate: null,
        DocumentFile: null,
        DocumentFileExtension: props.AddressProofData.DocumentFileExtension,
        DocumentFileName: props.AddressProofData.DocumentFileName,
        DocumentId: values.AddressProof,
        KycType: "liAddressProof",
        CountryId: values.Country,
        PostalCode: values.PostalCode,
        StateCode: filtered_state[0].StateCode,
        StreetAddress: values.StreetAddress,
        PaymateDocumentId: props.AddressProofData.PaymateDocumentId,
        DocumentDetailId: props.AddressProofData.DocumentDetailId,
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
        PaymateReferenceId: props.AddressProofData.PaymateDocumentId,
        DocumentFileName: props.AddressProofData.DocumentFileName,
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
    if (props.AddressProofData) {
      let filtered_emirates = props.emiratesDropdown.filter(
        (e) => e.StateCode === props.AddressProofData.StateCode
      );

      setValues({
        AddressProof: props.AddressProofData?.DocumentId,
        Country: props.AddressProofData?.CountryId,
        StreetAddress: props.AddressProofData?.StreetAddress,
        PostalCode: props.AddressProofData?.PostalCode,
        Emirate:
          filtered_emirates.length > 0 ? filtered_emirates[0].StateId : "",
      });
    }
  }, [props.AddressProofData, props.emiratesDropdown]);

  return (
    <>
      <div className={classes.FormPanel}>
        <FileViewPopup />
        <Grid container item lg={6} md={6} xs={12} spacing={3}>
          <Grid item lg={6} sm={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                id="AddressProof"
                name="AddressProof"
                label="Choose Address Proof"
                required
                select
                color="secondary"
                margin="normal"
                variant="outlined"
                size="normal"
                value={values.AddressProof}
                onChange={handleChange}
                onBlur={() => {
                  validator.showMessageFor("AddressProof");
                }}
                helperText={validator.message(
                  "AddressProof",
                  values.AddressProof,
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
                id="Country"
                name="Country"
                label="Choose Country"
                required
                select
                color="secondary"
                margin="normal"
                variant="outlined"
                size="normal"
                value={values.Country}
                onChange={handleChange}
                onBlur={() => {
                  validator.showMessageFor("Country");
                }}
                helperText={validator.message(
                  "Country",
                  values.Country,
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
                // integer only
                id="StreetAddress"
                name="StreetAddress"
                label="Street Address"
                color="secondary"
                margin="normal"
                variant="outlined"
                size="normal"
                value={values.StreetAddress}
                onChange={handleChange}
                inputProps={{
                  autoComplete: "nope",
                }}
                onBlur={() => {
                  validator.showMessageFor("StreetAddress");
                }}
                helperText={validator.message(
                  "StreetAddress",
                  values.StreetAddress,
                  "required"
                )}
              />
            </FormControl>
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                // integer only
                id="PostalCode"
                name="PostalCode"
                label="Postal Code"
                color="secondary"
                margin="normal"
                variant="outlined"
                size="normal"
                value={values.PostalCode}
                onChange={handleChange}
                inputProps={{
                  autoComplete: "nope",
                  maxLength: "6",
                }}
                onBlur={() => {
                  validator.showMessageFor("PostalCode");
                }}
                helperText={validator.message(
                  "PostalCode",
                  values.PostalCode,
                  "required|numeric|min:0,num"
                )}
              />
            </FormControl>
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                id="Emirate"
                name="Emirate"
                label="Select Emirate"
                required
                select
                color="secondary"
                margin="normal"
                variant="outlined"
                size="normal"
                value={values.Emirate}
                onChange={handleChange}
                onBlur={() => {
                  validator.showMessageFor("Emirate");
                }}
                helperText={validator.message(
                  "Emirate",
                  values.Emirate,
                  "required"
                )}
              >
                {!_.isEmpty(props.emiratesDropdown) ? (
                  props.emiratesDropdown
                    .filter((e) => e.CountryId === values.Country)
                    .map((state, index) => {
                      return (
                        <MenuItem key={index} value={state.StateId}>
                          {state.StateName}
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
                  props.AddressProofData?.PaymateDocumentId
                    ? props.AddressProofData?.DocumentFileName
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
                      {props?.AddressProofData?.PaymateDocumentId && (
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
      props.AddressProofData?.Status !== "Approved" ? (
        <Stack spacing={3} sx={{ paddingBottom: "36px" }}>
          <Divider className={classes.Divider} />
          <Stack spacing={2} direction="row">
            <Button
              style={{ marginRight: "1%" }}
              variant="outlined"
              color="primary"
              onClick={handleSubmit}
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

AddressProof.propTypes = {};

const mapStateToProps = (state) => ({
  DocumentNames: state.businessKYC.AddressProof?.DocumentNames,
  countriesDropdown: state.dataLists.countriesMetadata,
  emiratesDropdown: state.dataLists.emiratesMetadata,
  AddressProofData: state.businessKYC.AddressProof,
  ClientId: state.businessKYC.ClientId,
});

export default connect(mapStateToProps, {
  getCountries,
  getEmirates,
  saveKYCDocumentDetails,
  fetchViewImage,
  handleFileModal,
  closeFileModal,
})(AddressProof);
