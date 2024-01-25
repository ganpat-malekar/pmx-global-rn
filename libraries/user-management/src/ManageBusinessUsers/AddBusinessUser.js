import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Grid,
  FormControl,
  Autocomplete,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Button,
  Divider,
  Zoom,
  Tooltip,
} from '@mui/material';
import { withStyles } from '@mui/material/styles';

import _ from 'underscore';
import { pick, keys } from 'underscore';

import {
  decryptAES,
  encryptAES,
  validatorRules,
  useSimpleReactValidator,
} from '@paymate/common/helpers';

import { formUseStyles } from '@paymate/common/style';

import {
  getUserData_new,
  getCountryList_new2,
  getDepartmentsMappedRoles_new,
  submitUserData_new,
  getBusinessList,
} from '@paymate/common/store/actions';

const _initialFormFieldsModel = {
  CompanyId: '',
  ContactName: '',
  Email: '',
  MobileNo: '',
  RoleId: '',
  MappedDepartmentIds: '',
  Status: 5, // Put in config
  IsdCode: '',
  ChannelPartnerId: '',
};

const ADD_BUSINESS_USER_KNOW_MORE_TEXT = `Add user help you to add different types
 of users(Maker, Approver, Payer, or MIS) for your Business based on your
  requirements. On behalf of you, they will be able to perform the
   transactions.
`;

// NOTE: These should come from props, and these values are to be stored into reducer
//       from the geographyDetails api
const mobileNumberRegex = '^[4][0-9]{8}$';
const mobileNumberLength = 9;

function AddBusinessUser(props) {
  const classes = formUseStyles();
  const { id: UserId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [formFields, setFormFields] = useState({ ..._initialFormFieldsModel });
  const [departmentIds, setDepartmentIds] = useState([]);
  const [isCheckboxError, setIsCheckboxError] = useState(false);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    if (location.pathname === '/App/AddUsers') {
      resetForm();
    }
  }, [location]);

  useEffect(() => {
    setIsNew(true);
    if (UserId) {
      setIsNew(false);
      props.getUserData_new(decryptAES(UserId));
    }

    // Clearing states
    return () => {
      resetForm();
    };
  }, []);

  useEffect(() => {
    props.getBusinessList();
    props.getCountryList_new2();
    props.getDepartmentsMappedRoles_new();
  }, []);

  useEffect(() => {
    if (departmentIds.length > 0) {
      setIsCheckboxError(false);
    }
  }, [departmentIds]);

  useEffect(() => {
    if (!_.isEmpty(props.businessList) && !_.isEmpty(props.tokenData)) {
      const business = props.businessList.find(
        (item) => item.CompanyId === encryptAES(props.tokenData.CompanyId)
      );

      if (!_.isEmpty(business)) {
        setFormFields((prevState) => ({
          ...prevState,
          CompanyId: business,
        }));
      }
    }
  }, [props.businessList, props.tokenData]);

  // Autopopulate isd code dropdown if it has only one value
  useEffect(() => {
    if (!_.isEmpty(props.countryList) && props.countryList.length === 1) {
      setFormFields((prevState) => ({
        ...prevState,
        IsdCode: props.countryList[0].IsdCode,
      }));
    }
  }, [props.countryList]);

  // Hydrate the fields with fresj data from the api
  useEffect(() => {
    if (!isNew) {
      if (!_.isEmpty(props.fetchedFormData)) {
        const data = pick(props.fetchedFormData, keys(_initialFormFieldsModel));

        data.CompanyId = {
          label: props.fetchedFormData.BusinessName,
          id: data.CompanyId,
        };
        data.MappedDepartmentIds = props.fetchedDepartmentIds;
        data.MUserId = decryptAES(props.fetchedFormData.MUserId);
        data.ChannelPartnerId = null; // If Role is Channel Partner, then Required
        setDepartmentIds(props.fetchedDepartmentIds);
        setFormFields((prevState) => ({
          ...prevState,
          ...data,
        }));
      } else {
        console.log('No data found: ', props.fetchedFormData);
      }
    }
  }, [props.fetchedFormData]);

  // --------------------- Validators --------------------------------- //
  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    messages: {
      required: 'Please enter the :attribute',
    },
    validators: { ...validatorRules },
  });

  const resetForm = () => {
    setFormFields({ ..._initialFormFieldsModel });
    setDepartmentIds([]);
    setIsCheckboxError(false);
  };

  const handleCheckbox = (department) => (event) => {
    var data = [...departmentIds];
    if (_.contains(departmentIds, department.DepartmentId)) {
      const index = data.indexOf(department.DepartmentId);
      data.splice(index, 1);
      setDepartmentIds(data);
    } else {
      data.push(department.DepartmentId);
      setDepartmentIds(data);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === 'RoleId') {
      setDepartmentIds([]);
    }
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    if (validator.allValid()) {
      if (departmentIds.length < 1) {
        setIsCheckboxError(true);
      } else {
        setIsCheckboxError(false);
        const data = { ...formFields };

        data.CompanyId = data.CompanyId.id;
        data.RoleId = decryptAES(data.RoleId);

        // Need to send Ids in comma separated string without spaces
        data.MappedDepartmentIds = departmentIds
          .map((item) => decryptAES(item))
          .join();

        try {
          const success = await props.submitUserData_new(data);
          if (success) {
            // Reset
            resetForm();
            // And redirect ...
            navigate(`/App/ManageUsers`);
          }
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      validator.showMessages();
    }
  };

  return (
    <div>
      <div className={classes.TopBar}>
        <div>
          {isNew ? (
            <Typography variant="h5">Add User</Typography>
          ) : (
            <Typography variant="h5">Edit User</Typography>
          )}
        </div>
        <div>
          <p className={classes.NoteText}>
            <Tooltip
              TransitionComponent={Zoom}
              title={ADD_BUSINESS_USER_KNOW_MORE_TEXT}
            >
              <Link>KNOW MORE</Link>
            </Tooltip>
          </p>
        </div>
      </div>
      <div className={classes.MasterDetailsDiv}>
        <Accordion
          // className={classes.AddFormAccordian}
          className={classes.NewAddFormAccordian}
          square={false}
          id={'business-information'}
          //onChange={handleAccordian1}
          expanded={true}
        >
          <AccordionSummary
            //expandIcon={<ExpandMoreIcon />}
            aria-controls="business-information"
            id="business-information-header"
          >
            <Typography className={classes.heading}>
              User Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.FormPanel}>
              <Grid container item lg={6} md={6} xs={12} spacing={3}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <FormControl fullWidth>
                    <Autocomplete
                      disablePortal
                      size="normal"
                      disabled={props.tokenData.UserType === 'Business'}
                      id="business_name"
                      name="business_name"
                      value={formFields.CompanyId}
                      onChange={(event, value) => {
                        setFormFields({
                          ...formFields,
                          CompanyId: !_.isEmpty(value) ? value : '',
                        });
                      }}
                      options={props.businessList}
                      renderInput={(params) => (
                        <TextField
                          required={props.tokenData.UserType !== 'Business'}
                          color="secondary"
                          margin="normal"
                          size="normal"
                          {...params}
                          label="Select Business Name"
                          onBlur={() => {
                            validator.showMessageFor('business_name');
                          }}
                          helperText={validator.message(
                            'business_name',
                            formFields.CompanyId,
                            ['required']
                          )}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      color="secondary"
                      margin="normal"
                      label="Contact Name"
                      name="ContactName"
                      id="ContactName"
                      variant="outlined"
                      size="normal"
                      inputProps={{
                        autoComplete: 'nope',
                        maxLength: '250',
                      }}
                      value={formFields.ContactName}
                      onChange={handleChange}
                      onBlur={() => {
                        validator.showMessageFor('contact_name');
                      }}
                      helperText={validator.message(
                        'contact_name',
                        formFields.ContactName,
                        ['required', { max: 250 }, 'contact_name_validator']
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      color="secondary"
                      margin="normal"
                      label="Email"
                      name="Email"
                      id="Email"
                      variant="outlined"
                      size="normal"
                      inputProps={{
                        autoComplete: 'nope',
                        maxLength: '50',
                      }}
                      value={formFields.Email}
                      onChange={handleChange}
                      onBlur={() => {
                        validator.showMessageFor('email_address');
                      }}
                      helperText={validator.message(
                        'email_address',
                        formFields.Email,
                        ['required', 'email_validator', { max: 50 }]
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <FormControl style={{ flexDirection: 'row' }} fullWidth>
                    {/* ISD field */}
                    <TextField
                      color="secondary"
                      id="IsdCode"
                      name="IsdCode"
                      style={{ width: '35%' }}
                      margin="normal"
                      select
                      label="ISD"
                      variant="outlined"
                      size="normal"
                      value={formFields.IsdCode}
                      onBlur={() => {
                        validator.showMessageFor('IsdCode');
                      }}
                      onChange={handleChange}
                    >
                      {!_.isEmpty(props.countryList) ? (
                        props.countryList.map((country, index) => {
                          return (
                            <MenuItem key={index} value={country.IsdCode}>
                              {country.IsdCode}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <MenuItem disabled>No options</MenuItem>
                      )}
                    </TextField>
                    <h3 style={{ margin: '30px 5px 10px 5px' }}></h3>
                    {/* Mobile no. field */}
                    <TextField
                      color="secondary"
                      style={{ width: '65%' }}
                      id="MobileNo"
                      name="MobileNo"
                      margin="normal"
                      label="Mobile No"
                      variant="outlined"
                      size="normal"
                      value={formFields.MobileNo}
                      onChange={handleChange}
                      inputProps={{
                        maxLength: '9',
                        autoComplete: 'nope',
                      }}
                      onBlur={() => {
                        validator.showMessageFor('mobile_number');
                      }}
                      helperText={validator.message(
                        'mobile_number',
                        formFields.MobileNo,
                        `required|mobile_number_validator:${mobileNumberRegex},${mobileNumberLength}`
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      color="secondary"
                      id="RoleId"
                      margin="normal"
                      required
                      select
                      label="Select Role Name"
                      name="RoleId"
                      variant="outlined"
                      size="normal"
                      value={formFields.RoleId}
                      onChange={handleChange}
                      onBlur={() => {
                        validator.showMessageFor('role_name');
                      }}
                      helperText={validator.message(
                        'role_name',
                        formFields.RoleId,
                        ['required']
                      )}
                    >
                      {!_.isEmpty(props.roles) ? (
                        props.roles.map((role, index) => {
                          return (
                            <MenuItem key={index} value={role.RoleId}>
                              {role.RoleName}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <MenuItem disabled>No options</MenuItem>
                      )}
                    </TextField>
                  </FormControl>
                </Grid>

                <Grid item lg={6} md={6} xs={12}></Grid>
                {formFields.RoleId && (
                  <Grid item lg={6} md={6} xs={12}>
                    <FormControl component="fieldset" variant="standard">
                      <FormLabel component="legend">
                        Select Departments
                      </FormLabel>
                      <FormGroup>
                        {!_.isEmpty(props.departments) &&
                          props.departments
                            .filter((e) => e.RoleId === formFields.RoleId)
                            .map((department, index) => {
                              return (
                                <FormControlLabel
                                  key={index}
                                  control={
                                    <Checkbox
                                      checked={_.contains(
                                        departmentIds,
                                        department.DepartmentId
                                      )}
                                      onChange={handleCheckbox(department)}
                                    />
                                  }
                                  label={department.DepartmentName}
                                />
                              );
                            })}
                      </FormGroup>
                      {isCheckboxError && (
                        <FormHelperText style={{ color: 'red' }}>
                          Please select at least 1 department
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Divider className={classes.Divider} />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    style={{ marginRight: '1%' }}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                  <Link to="/App/ManageUsers">
                    <Button variant="outlined" color="primary">
                      Cancel
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

AddBusinessUser.propTypes = {};

const mapStateToProps = (state) => ({
  businessList: state.dataLists.businessList,
  countryList: state.addBusinessUser.countryList,
  roles: state.addBusinessUser.roles,
  departments: state.addBusinessUser.departments,
  fetchedFormData: state.addBusinessUser.userData,
  fetchedDepartmentIds: state.addBusinessUser.userDepartmentIds,
  tokenData: state.admin.tokenData,
});

export default connect(mapStateToProps, {
  getUserData_new,
  getBusinessList,
  getCountryList_new2,
  getDepartmentsMappedRoles_new,
  submitUserData_new,
})(AddBusinessUser);
