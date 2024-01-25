import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Divider,
  Stack,
} from '@mui/material';

import { pick } from 'lodash';
import readXlsxFile from 'read-excel-file';
import _ from 'underscore';

// import SampleFile from '@paymate/common/assets/SampleFiles/BulkContact.xlsx';

import BulkUploadContactsTable from './BulkUploadContactTable';

import {
  decryptAES,
  encryptAES,
  getDetailsFromIBAN,
  useSimpleReactValidator,
} from '@paymate/common/helpers';
import { formUseStyles } from '@paymate/common/style';
import {
  sendBulkContactFileForValidation,
  getBusinessList,
  handleSampleFile,
} from '@paymate/common/store/actions';

const excelColumnNames = {
  ContactType: 'ContactType',
  CompanyName: 'CompanyName',
  ReferenceCode: 'ReferenceCode',
  ContactName: 'ContactName',
  Designation: 'Designation',
  EmailAddress: 'EmailAddress',
  ISDCode: 'ISDCode',
  MobileNumber: 'MobileNumber',
  CurrencyCode: 'CurrencyCode',
  IBAN: 'IBAN',
  BranchAddress: 'BranchAddress',
};

const _initialFormFieldsModel = {
  BusinssName: '',
  CompanyId: '',
  // Contacts: [],
  lstBulkContact: [],
  UploadedBy: '',
};

function BulkUploadContacts(props) {
  const classes = formUseStyles();
  const [accordian1, setAccordian1] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
  });
  const [formFields, setFormFields] = useState({ ..._initialFormFieldsModel });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    props.getBusinessList();
  }, []);

  useEffect(() => {
    if (props.tokenData.UserType === 'Business') {
      const business = props.businessList.find(
        (i) => i.CompanyId === encryptAES(props.tokenData.CompanyId)
      );
      setFormFields((prevState) => ({
        ...prevState,
        CompanyId: business?.id,
        BusinssName: business?.label,
      }));
    }
  }, [props.businessList.length]);

  // Converting the file to byte array and handling file removal.
  useEffect(async () => {
    if (selectedFile?.name) {
      try {
        const rows = await readXlsxFile(selectedFile, { excelColumnNames });

        // Converting array of array to array of objects
        const columnNames = rows.shift(); // Returns the first element, modifies the array and removes the first element
        const objRows = rows.map((row) => {
          const obj = {};
          row.forEach((cell, index) => {
            obj[columnNames[index]] = cell;
          });

          return obj;
        });

        const objRowsWithExtraFields = objRows.map((row) => {
          const obj = { ...row };
          const {
            AccountNo,
            HashedAccountNo,
            HashedIBAN,
            EncryptedAccountNo,
            EncryptedIBAN,
          } = getDetailsFromIBAN(row.IBAN);
          obj.AccountNo = AccountNo;
          obj.HashedAccountNo = HashedAccountNo;
          obj.HashedIBAN = HashedIBAN;
          obj.EncryptedAccountNo = EncryptedAccountNo;
          obj.EncryptedIBAN = EncryptedIBAN;
          obj.Status = '';
          obj.Message = '';
          obj.CreatedBy = props.tokenData.UserId;
          obj.IsValid = true;
          obj.IncorporationDate = null;
          obj.CompanyId = null;

          return obj;
        });

        setFormFields((prevState) => ({
          ...prevState,
          // Contacts: objRows,
          lstBulkContact: objRowsWithExtraFields,
        }));
      } catch (err) {
        console.log(err);
      }
    } else {
      setFormFields((prevState) => ({
        ...prevState,
        // Contacts: [],
        lstBulkContact: [],
      }));
    }
  }, [selectedFile]);

  const handleChange = (event) => {
    setFormFields((prevState) => {
      const obj = {
        ...prevState,
        [event.target.name]: event.target.value,
      };

      if (event.target.name === 'CompanyId') {
        const selectedItem = props.businessList.find(
          (item) => item.id === event.target.value
        );
        if (!_.isEmpty(selectedItem)) {
          obj.BusinssName = selectedItem.label;
        } else {
          obj.BusinssName = '';
        }
      }

      return obj;
    });
  };

  const handleSubmit = () => {
    if (validator.allValid()) {
      const payload = pick(formFields, [
        'CompanyId',
        // "Contacts",
        'lstBulkContact',
        'UploadedBy',
      ]);
      payload.UploadedBy = props.tokenData.UserId;

      props.sendBulkContactFileForValidation(payload);
    } else {
      validator.showMessages();
    }
  };

  validator.purgeFields();

  return (
    <div>
      <div className={classes.TopBar}>
        <div>
          <Typography variant="h5">Bulk Upload Contacts</Typography>
        </div>
      </div>
      <div className={classes.MasterDetailsDiv}>
        <Accordion
          id={'business-information'}
          expanded={accordian1}
          className={classes.NewAddFormAccordian}
        >
          <AccordionSummary
            aria-controls="business-information"
            id="business-information-header"
          >
            <Typography className={classes.heading}>Upload Form</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.FormPanel}>
              <Grid container item lg={6} md={6} xs={12} spacing={3}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Autocomplete
                    disablePortal
                    disabled={props.tokenData.UserType !== 'Admin'}
                    size="normal"
                    id="CompanyId"
                    name="CompanyId"
                    value={formFields.BusinssName}
                    onChange={(event, newValue) => {
                      const e = {
                        target: {
                          name: 'CompanyId',
                          value: newValue ? newValue.id : '', // handling if "cross" button is pressed
                        },
                      };

                      handleChange(e);
                    }}
                    options={props.businessList}
                    renderInput={(params) => (
                      <TextField
                        color="secondary"
                        required
                        margin="normal"
                        size="normal"
                        {...params}
                        label="Enter Business Name"
                        onBlur={() => {
                          validator.showMessageFor('BusinessName');
                        }}
                        helperText={validator.message(
                          'BusinessName',
                          formFields.CompanyId,
                          'required'
                        )}
                      />
                    )}
                  />
                </Grid>

                {/* <Grid item lg={6} md={6} xs={12}></Grid> */}

                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      sx={{
                        '& input': {
                          opacity: selectedFile?.name ? 1 : 0,
                        },
                      }}
                      id="ContactFile"
                      name="ContactFile"
                      label="Upload a file"
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
                        validator.showMessageFor('ContactFile');
                      }}
                      helperText={
                        // TODO: Make a rule for filetype, filesize. validation
                        validator.message(
                          'ContactFile',
                          selectedFile,
                          'required'
                        )
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <FileUploadIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        multiple: false, // In case of true, we might need chips to display individual files and a removal logic
                        accept: '.xlsx,.xls,.csv', // Will fail if file is dragged n dropped
                      }}
                    />

                    <Stack
                      spacing={1}
                      direction="column"
                      className={classes.UploadFile}
                    >
                      <Stack
                        divider={<Divider orientation="vertical" flexItem />}
                        direction="row"
                        spacing={1}
                      >
                        <a
                          style={{ lineHeight: 0 }}
                          // href={`${SampleFile}`}
                          download="BulkContact.xlsx"
                        >
                          <Button
                            disableFocusRipple
                            disableTouchRipple
                            disableRipple
                            size="small"
                          >
                            download template
                          </Button>
                        </a>
                        <Button
                          disableFocusRipple
                          disableTouchRipple
                          disableRipple
                          size="small"
                          onClick={() =>
                            props.handleSampleFile('bulk_upload_contacts')
                          }
                        >
                          View Sample
                        </Button>
                      </Stack>
                      <Typography>
                        Upload file type .xls, .xlsx, .csv / Upload file size
                        max 10MB
                      </Typography>
                    </Stack>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Divider className={classes.Divider} />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    style={{ marginRight: '10px' }}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Continue
                  </Button>
                  <Link to="/App/ManageContacts">
                    <Button variant="outlined" color="error">
                      Cancel
                    </Button>
                  </Link>
                </Grid>

                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              {props.isValidationResponse && <BulkUploadContactsTable />}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

BulkUploadContacts.propTypes = {};

const mapStateToProps = (state) => ({
  tokenData: state.admin.tokenData,
  businessList: state.dataLists.businessList,
  isValidationResponse:
    state.bulkContact.bulkContactTableData?.StatusCode === '000',
});

export default connect(mapStateToProps, {
  sendBulkContactFileForValidation,
  getBusinessList,
  handleSampleFile,
})(BulkUploadContacts);
