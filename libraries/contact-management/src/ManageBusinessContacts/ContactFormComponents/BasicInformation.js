'use strict';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

import {
  Autocomplete,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { keys, pick } from 'lodash';
import _ from 'underscore';

import {
  encryptAES,
  validatorRules,
  checkIsInputAllowed,
  useSimpleReactValidator,
} from '@paymate/common/helpers';
import { formUseStyles } from '@paymate/common/style';

import {
  fetchAndStoreVendorInformation,
  resubmitKycToInternalApi,
  storeCompanyDetails,
  submitKycToExternalApi,
  submitKycToInternalApi,
  submitVendorBasicInformation,
  sendVendorAppovalMailToApprover,
  getBusinessList,
  getCountries,
  getTypesList,
  showAlert,
  CONTACT_TYPE,
  storeBusinessInformation,
  flushBusinessInformation,
  flushVendorInformation,
} from '@paymate/common/store/actions';

// Data to send
const _initialFormFieldsModel = {
  CompanyId: '',
  ClientId: null,
  CountryId: '',
  TypeOfContactId: '',
  // UserId: "", // Fetched from the Token passed in the header
  ClientAgencyName: '',
  NickName: '',
  AgencyCode: '', // Labeled as Reference Code
  ContactPerson: '',
  ClientEmailId: '',
  ClientMobileNo: '',
  ContactDesignation: '',
  CompanyWebsite: '',
  CompanyDescription: '',
  IsdCode: '', // auto Dropdown
  CountryName: '', // for aml calls
  NotificationEmails: '',
  CompanyRegistrationNo: '',
};

function BasicInformation(props) {
  const classes = formUseStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [formFields, setFormFields] = useState({
    ..._initialFormFieldsModel,
  });

  const [inputEmail, setInputEmail] = useState('');
  const [emailArray, setEmailArray] = useState([]);
  const [emailAlreadyExists, setEmailAlreadyExistsMessage] = useState('');
  const [maximumEmailErrorMessage, setMaximumEmailErrorMessage] = useState('');

  useEffect(() => {
    props.getBusinessList();
    props.getTypesList({ objTypeName: CONTACT_TYPE });
    props.getCountries();
    return () => {
      console.log('destroyed');
      props.flushBusinessInformation();
      props.flushVendorInformation();
      setFormFields({
        ..._initialFormFieldsModel,
      });
    };
  }, []);

  useEffect(() => {
    if (props.isNew) {
      setFormFields({
        ..._initialFormFieldsModel,
      });
    }
  }, [props.isNew]);

  // call api for setting Business Name field incase of Business login or edit case. But not during add contact
  useEffect(() => {
    if (!_.isEmpty(props.tokenData)) {
      console.log('1');
      if (props.tokenData.UserType === 'Business') {
        console.log('2');
        props.storeBusinessInformation({
          CompanyId: encryptAES(props.tokenData.CompanyId),
        });
      } else {
        console.log('3');
        console.log(props.fetchedFormData);
        if (!props.isNew && !_.isEmpty(props.fetchedFormData)) {
          console.log(props.isNew);
          console.log('4');
          props.storeBusinessInformation({
            CompanyId: encryptAES(props.fetchedFormData.CompanyId),
          });
        }
      }
    }
  }, [props.tokenData, props.fetchedFormData, props.isNew]);

  // Auto populate Business Name field incase of Business login or edit case. But not during add contact
  // useEffect(() => {
  //   if (
  //     !_.isEmpty(props.BusinessInfo) &&
  //     !_.isEmpty(props.tokenData) &&
  //     !_.isEmpty(props.fetchedFormData)
  //   ) {
  //     console.log("5");
  //     if (props.tokenData.UserType === "Business") {
  //       console.log("6");
  //       const CompanyId = {
  //         ...props.BusinessInfo,
  //         id: props.BusinessInfo.CompanyId,
  //         label: props.BusinessInfo.CompanyName,
  //       };
  //       setFormFields((prevState) => ({
  //         ...prevState,
  //         CompanyId,
  //       }));
  //       props.setIsKYCTabVisible(CompanyId.IsSupplierKYC);
  //     } else {
  //       console.log("7");
  //       if (!_.isEmpty(props.fetchedFormData)) {
  //         console.log("8");
  //         const CompanyId = {
  //           ...props.BusinessInfo,
  //           label: props.BusinessInfo.CompanyName,
  //           id: props.BusinessInfo.CompanyId,
  //         };
  //         setFormFields((prevState) => ({
  //           ...prevState,
  //           CompanyId,
  //         }));
  //         props.setIsKYCTabVisible(CompanyId.IsSupplierKYC);
  //       }
  //     }
  //   }
  // }, [props.BusinessInfo, props.tokenData, props.fetchedFormData]);

  useEffect(() => {
    if (!_.isEmpty(props.BusinessInfo)) {
      console.log('9');
      const CompanyId = {
        ...props.BusinessInfo,
        id: props.BusinessInfo.CompanyId,
        label: props.BusinessInfo.CompanyName,
      };
      setFormFields((prevState) => ({
        ...prevState,
        CompanyId,
      }));
      // props.setIsKYCTabVisible(CompanyId.IsSupplierKYC);
    }
  }, [props.BusinessInfo]);

  // Hydrate the fields with fresh data from the api
  useEffect(() => {
    if (!props.isNew) {
      if (!_.isEmpty(props.fetchedFormData)) {
        const data = pick(props.fetchedFormData, keys(_initialFormFieldsModel));

        setFormFields((prevState) => ({
          ...prevState,
          ...data,
          CompanyId: '',
        }));
        if (props.regionCode === 'AED') {
          if (!_.isEmpty(props.fetchedFormData.NotificationEmails)) {
            setEmailArray(props.fetchedFormData.NotificationEmails.split(','));
          }
        }
      } else {
        console.log('No data found: ', props.fetchedFormData);
      }
    }
  }, [props.fetchedFormData, props.regionCode]);

  // Auto populate
  useEffect(() => {
    if (props.isNew) {
      if (!_.isEmpty(props.countries) && props.countries?.length === 1) {
        setFormFields((prevState) => ({
          ...prevState,
          CountryId: props.countries[0].CountryId,
          IsdCode: props.countries[0].IsdCode,
          CountryName: props.countries[0].CountryName,
        }));
      }
    }
  }, [props.countries, props.isNew]);

  // --------------------- Validators --------------------------------- //
  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    messages: {
      regex: 'Please enter a valid :attribute',
    },
    validators: {
      ...validatorRules,
    },
  });

  // ---------------- Handle Functions ------------------- //
  const handleChange = (event, property, rule) => {
    const inputValue = event.target.value;
    if (checkIsInputAllowed(rule, inputValue)) {
      setFormFields({ ...formFields, [property]: inputValue });
    }
  };

  const handleSelection = (prop) => (event) => {
    setFormFields({
      ...formFields,
      ...prop,
    });
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setInputEmail(e.target.value);
    setEmailAlreadyExistsMessage('');
    setMaximumEmailErrorMessage('');

    if (validator.check(inputEmail, 'email') && inputEmail !== '') {
      if (email.includes(',') || e.key === 'Enter') {
        if (emailArray.length > 5) {
          setMaximumEmailErrorMessage(
            'Maximum of 6 Notification email addresses can be entered.'
          );
        } else {
          if (emailArray.includes(email.replace(',', ''))) {
            setEmailAlreadyExistsMessage('Email already added');
          } else {
            addEmail(email.replace(',', ''));
          }
        }
      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleEmailChange(e);
    }
  };

  const addEmail = (email) => {
    setInputEmail('');
    setEmailArray((prevState) => [...prevState, email]);
  };

  const handleEditEmail = (email, indexOfEmail) => {
    setInputEmail(email);
    handleDeleteChip(indexOfEmail);
  };

  const handleDeleteChip = (indexOfEmail) => {
    setEmailArray((prevState) =>
      prevState.filter((item, index) => index !== indexOfEmail)
    );
  };

  const handleSubmit = async () => {
    if (validator.allValid()) {
      const data = pick(formFields, keys(_initialFormFieldsModel));

      if (emailArray.length >= 1) {
        data.NotificationEmails = emailArray.join(',');
      }

      data.CompanyId = data.CompanyId.id;
      data.UserId = props.userId;
      delete data.IsdCode;

      const ClientId = await props.submitVendorBasicInformation(data);
      setFormFields((prevState) => ({ ...prevState, ClientId }));

      if (ClientId) {
        // Redirect is Type of contact is a Buyer
        if (formFields.TypeOfContactId === '8E1C1356E87F42B7044328ABB519C450') {
          const success = await props.sendVendorAppovalMailToApprover({
            ClientId,
          });
          success && navigate(`/App/ManageContacts`);
        } else {
          // !location.pathname.includes("/App/EditContact") &&
          //   history.push(`/App/EditContact/${ClientId}`);
          props.fetchAndStoreVendorInformation(ClientId);
          props.setIsBankAccTabDisabled(false);
          props.setAccordian1(false);
          props.setAccordian2(true);
          props.setAccordian3(false);
        }
      }
    } else {
      validator.showMessages();
    }
  };

  //validator.purgeFields();
  return (
    <div className={classes.FormPanel}>
      <Grid container item lg={6} md={6} xs={12} spacing={3}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <Autocomplete
              disablePortal
              disabled={props.tokenData.UserType !== 'Admin' || !props.isNew}
              size="normal"
              id="business_name"
              name="business_name"
              value={formFields.CompanyId}
              onChange={(event, value) => {
                // setFormFields({ ...formFields, CompanyId: value });
                if (!_.isEmpty(value)) {
                  props.storeBusinessInformation({
                    CompanyId: encryptAES(value.id),
                  });
                } else {
                  setFormFields({
                    ...formFields,
                    CompanyId: '',
                  });
                }
              }}
              options={props.businessList}
              renderInput={(params) => (
                <TextField
                  color="secondary"
                  margin="normal"
                  size="normal"
                  {...params}
                  label="Enter Business Name"
                  onBlur={() => {
                    validator.showMessageFor('business_name');
                  }}
                  helperText={validator.message(
                    'business_name',
                    formFields.CompanyId,
                    ['required']
                  )}
                  // InputProps={{
                  //   endAdornment:
                  //     props.tokenData.UserType === "Business" ? (
                  //       !_.isEmpty(formFields.CompanyId) ? (
                  //         <CircularProgress size={18} />
                  //       ) : (
                  //         false
                  //       )
                  //     ) : (
                  //       false
                  //     ),
                  // }}
                />
              )}
            />
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              select
              label="Type of Contact"
              id="contact_type"
              name="contact_type"
              required
              variant="outlined"
              size="normal"
              value={formFields.TypeOfContactId}
              onBlur={() => {
                validator.showMessageFor('contact_type');
              }}
              helperText={validator.message(
                'contact_type',
                formFields.TypeOfContactId,
                'required'
              )}
            >
              {!_.isEmpty(props.contactTypes) ? (
                props.contactTypes
                  .filter(
                    (contact) => contact.CodeName.toLowerCase() !== 'tenant'
                  )
                  .map((contact, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={contact.DetailId}
                        onClick={handleSelection({
                          TypeOfContactId: contact.DetailId,
                        })}
                      >
                        {contact.CodeName}
                      </MenuItem>
                    );
                  })
              ) : (
                <MenuItem disabled>No options</MenuItem>
              )}
            </TextField>
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              required
              label="Company Name"
              name="company_name"
              id="company_name"
              disabled={!props.isNew}
              variant="outlined"
              size="normal"
              inputProps={{
                autoComplete: 'nope',
                maxLength: '100',
              }}
              value={formFields.ClientAgencyName}
              onChange={(event) => handleChange(event, 'ClientAgencyName')}
              onBlur={() => {
                validator.showMessageFor('company_name');
              }}
              helperText={validator.message(
                'company_name',
                formFields.ClientAgencyName,
                ['required', { max: 100 }, 'company_name_validator']
              )}
            />
          </FormControl>
        </Grid>

        {props.regionCode === 'AED' && (
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <FormControl fullWidth>
              &&{' '}
              <TextField
                color="secondary"
                margin="normal"
                label="Company Nick Name"
                name="company_nick_name"
                id="company_nick_name"
                variant="outlined"
                size="normal"
                inputProps={{
                  autoComplete: 'nope',
                  maxLength: '20',
                }}
                value={formFields.NickName}
                onChange={(event) => handleChange(event, 'NickName')}
                onBlur={() => {
                  validator.showMessageFor('company_nick_name');
                }}
                helperText={validator.message(
                  'company_nick_name',
                  formFields.NickName,
                  [
                    { max: 20 },
                    {
                      regex: "^[A-Za-z.'  ]*[A-Za-z.][A-Za-z.'  ]*$",
                    },
                  ]
                )}
              />
            </FormControl>
          </Grid>
        )}

        {props.regionCode !== 'AED' && (
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                color="secondary"
                margin="normal"
                label="Company Registration Number"
                name="company_registration_number"
                id="company_registration_number"
                variant="outlined"
                size="normal"
                inputProps={{
                  autoComplete: 'nope',
                  maxLength: '20',
                }}
                value={formFields.CompanyRegistrationNo}
                onChange={(event) =>
                  handleChange(event, 'CompanyRegistrationNo')
                }
                onBlur={() => {
                  validator.showMessageFor('company_registration_number');
                }}
                helperText={validator.message(
                  'company_registration_number',
                  formFields.CompanyRegistrationNo,
                  [{ max: 20 }, 'company_registration_number_validator']
                )}
              />
            </FormControl>
          </Grid>
        )}

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              label="Reference Code"
              name="reference_code"
              id="reference_code"
              variant="outlined"
              size="normal"
              inputProps={{
                autoComplete: 'nope',
                maxLength: '30',
              }}
              value={formFields.AgencyCode}
              onChange={(event) => handleChange(event, 'AgencyCode')}
              onBlur={() => {
                validator.showMessageFor('reference_code');
              }}
              helperText={validator.message(
                'reference_code',
                formFields.AgencyCode,
                [
                  { max: 30 },
                  {
                    regex: '^[a-zA-Z0-9]+$',
                  },
                ]
              )}
            />
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              required
              select
              label="Select Country Name"
              id="select_country_name"
              name="select_country_name"
              variant="outlined"
              size="normal"
              value={formFields.CountryId}
              onBlur={() => {
                validator.showMessageFor('select_country_name');
              }}
              helperText={validator.message(
                'select_country_name',
                formFields.CountryId,
                'required'
              )}
            >
              {!_.isEmpty(props.countries) ? (
                props.countries.map((country, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={country.CountryId}
                      onClick={handleSelection({
                        CountryId: country.CountryId,
                        IsdCode: country.IsdCode,
                        CountryName: country.CountryName,
                      })}
                    >
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

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              required
              label="Contact Name"
              name="contact_name"
              id="contact_name"
              variant="outlined"
              size="normal"
              inputProps={{
                autoComplete: 'nope',
                maxLength: '50',
              }}
              value={formFields.ContactPerson}
              onChange={(event) => handleChange(event, 'ContactPerson')}
              onBlur={() => {
                validator.showMessageFor('contact_name');
              }}
              helperText={validator.message(
                'contact_name',
                formFields.ContactPerson,
                [
                  'required',
                  { max: 50 },
                  'contact_name_validator',
                  // {
                  //   regex: "^[A-Za-z'  ]*[A-Za-z][A-Za-z'  ]*$",
                  // },
                ]
              )}
            />
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              label="Contact Designation"
              name="contact_designation"
              id="contact_designation"
              variant="outlined"
              size="normal"
              inputProps={{
                autoComplete: 'nope',
                maxLength: '150',
              }}
              value={formFields.ContactDesignation}
              onChange={(event) => handleChange(event, 'ContactDesignation')}
              onBlur={() => {
                validator.showMessageFor('contact_designation');
              }}
              helperText={validator.message(
                'contact_designation',
                formFields.ContactDesignation,
                [{ max: 150 }, 'contact_designation_validator']
              )}
            />
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              required
              label="Email Address"
              name="email"
              id="email"
              variant="outlined"
              size="normal"
              inputProps={{
                autoComplete: 'nope',
                maxLength: '100',
              }}
              value={formFields.ClientEmailId}
              onChange={(event) => handleChange(event, 'ClientEmailId')}
              onBlur={() => {
                validator.showMessageFor('email');
              }}
              helperText={validator.message('email', formFields.ClientEmailId, [
                'required',
                'email_validator',
                { max: 150 },
              ])}
            />
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl style={{ flexDirection: 'row' }} fullWidth>
            {/* ISD field */}
            <TextField
              color="secondary"
              id="company_mobile_code"
              name="company_mobile_code"
              style={{ width: '35%' }}
              margin="normal"
              label="ISD Code"
              variant="outlined"
              size="normal"
              value={formFields.IsdCode}
            />
            <h3 style={{ margin: '30px 5px 10px 5px' }}></h3>
            {/* Mobile no. field */}
            <TextField
              color="secondary"
              style={{ width: '65%' }}
              id="company_mobile_no"
              name="company_mobile_no"
              margin="normal"
              variant="outlined"
              label="Mobile No"
              size="normal"
              inputProps={{
                maxLength: '9',
                autoComplete: 'nope',
              }}
              value={formFields.ClientMobileNo}
              onChange={(event) => {
                handleChange(event, 'ClientMobileNo', 'integer');
              }}
              onBlur={() => {
                validator.showMessageFor('mobile_no');
              }}
              helperText={validator.message(
                'mobile_no',
                formFields.ClientMobileNo,
                [
                  `mobile_number_validator:${props.geographicDetails?.MobileNoRegex},${props.geographicDetails?.MobileNoLen}`,
                ]
              )}
            />
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              label="Company Website"
              name="company_website"
              id="company_website"
              variant="outlined"
              size="normal"
              inputProps={{
                autoComplete: 'nope',
                maxLength: '250',
              }}
              value={formFields.CompanyWebsite}
              onChange={(event) => {
                handleChange(event, 'CompanyWebsite');
              }}
              onBlur={() => {
                validator.showMessageFor('company_website');
              }}
              helperText={validator.message(
                'company_website',
                formFields.CompanyWebsite,
                [
                  { max: 250 },
                  {
                    regex:
                      '^[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$',
                  },
                ]
              )}
            />
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              label="Company Description"
              name="company_description"
              id="company_description"
              variant="outlined"
              size="normal"
              inputProps={{
                autoComplete: 'nope',
                maxLength: '500',
              }}
              value={formFields.CompanyDescription}
              onChange={(event) => {
                handleChange(event, 'CompanyDescription');
              }}
              onBlur={() => {
                validator.showMessageFor('company_description');
              }}
              helperText={validator.message(
                'company_description',
                formFields.CompanyDescription,
                [
                  { max: 500 },
                  {
                    regex: "^[A-Za-z'  ]*[A-Za-z][A-Za-z'  ]*$",
                  },
                ]
              )}
            />
          </FormControl>
        </Grid>

        {props.regionCode === 'AED' && (
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                id="NotificationEmails"
                name="NotificationEmails"
                label="Notification Emails"
                color="secondary"
                margin="normal"
                variant="outlined"
                size="normal"
                value={inputEmail}
                onChange={handleEmailChange}
                onKeyUp={handleKeyUp}
                onBlur={() => {
                  validator.showMessageFor('NotificationEmails');
                }}
                helperText={
                  'Add up to 6 email addresses separated by comma. These email addresses will be notified when you send a collection request and when the payment is settled to this Contact.' ||
                  validator.message(
                    'NotificationEmails',
                    inputEmail,
                    'email'
                  ) ||
                  emailAlreadyExists ||
                  maximumEmailErrorMessage
                }
              />
            </FormControl>
          </Grid>
        )}

        {emailArray.length > 0 && (
          <Grid item lg={12} md={12} xs={12} zeroMinWidth>
            {emailArray.map((email, index) => {
              return (
                <Chip
                  key={index}
                  label={<Typography>{email}</Typography>}
                  onClick={() => handleEditEmail(email, index)}
                  onDelete={() => handleDeleteChip(index)}
                  id="TopBarChipDetails"
                  className={classes.Chip}
                />
              );
            })}
          </Grid>
        )}

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
            Next
          </Button>
          <Link to="/App/ManageContacts">
            <Button variant="outlined" color="error">
              Cancel
            </Button>
          </Link>
          {/* <Button variant="outlined" color="error">
            Cancel
          </Button> */}
        </Grid>
      </Grid>
    </div>
  );
}

BasicInformation.propTypes = {};

const mapStateToProps = (state) => ({
  userId: state.admin.tokenData.UserId,
  contactTypes: state.dataLists.typesList.ContactType,
  countries: state.dataLists.countriesMetadata,
  fetchedFormData: state.addContact.VendorInfo.BasicInformation,
  Crid: state.basicInfo.Crid,
  TaskId: state.basicInfo.TaskId,
  CaseId: state.basicInfo.CaseId,
  businessList: state.dataLists.businessList,
  tokenData: state.admin.tokenData,
  BusinessInfo: state.addBusiness.BusinessInfo,
  regionCode: state.admin.regionCode,
  geographicDetails: state.admin.geographicDetails?.DetailedSummary,
});

export default connect(mapStateToProps, {
  submitVendorBasicInformation,
  fetchAndStoreVendorInformation,
  storeCompanyDetails,
  submitKycToInternalApi,
  submitKycToExternalApi,
  resubmitKycToInternalApi,
  getCountries,
  getBusinessList,
  getTypesList,
  showAlert,
  sendVendorAppovalMailToApprover,
  storeBusinessInformation,
  flushBusinessInformation,
  flushVendorInformation,
})(BasicInformation);
