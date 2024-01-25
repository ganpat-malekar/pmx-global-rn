import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { Box, Container, Grid, Hidden, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

import _ from 'underscore';

import { encodeSha256, useSimpleReactValidator } from '@paymate/common/helpers';
import { passwordStrength } from 'check-password-strength';
import SliderLogin from './Slider';

import { decryptAES, encryptAES } from '@paymate/common/helpers';

import DunomoLOGO from '@paymate/common/assets/dunomologo.png';
import LOGO from '@paymate/common/assets/logo.png';

import {
  getDetailsForSignUp,
  getUserBasicInfoResetPassword,
  savePassword,
  showAlert,
} from '@paymate/common/store/actions';

import { getColor, passwordCheckMessage } from '@paymate/common/components';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: '8px',
    backgroundColor: '#f50057',
  },
  form: {
    width: '100%',
    margin: '15px 0 0 0',
  },
  submit: {
    margin: '8px 0px 5px 0px !important',
  },
  Bg: {
    backgroundColor: '#E4F2FF',
    display: 'flex',
    width: '100%',
    height: '100vh',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '20px !important',
    color: '#0C386A !important',
    fontWeight: '500 !important',
    lineHeight: '36px',
  },
  hyperlink: {
    fontSize: '14px',
    color: '#0091FF',
    fontWeight: 500,
    lineHeight: '36px',
  },
  Container: {
    maxWidth: '1000px !important',
  },
  LoginCard: {
    //padding: "45px 45px 5px 45px",
    backgroundColor: '#ffffff',
    boxShadow: '0 0 4px 0 #797979',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    boxShadow: '0 15px 25px 0 #CEE7FF',
  },
  LandingPageFormMain: {
    padding: '40px 0px 0px 9px',
    [theme.breakpoints.up('xs')]: {
      padding: '40px 20px',
    },
  },
}));

const _initialFormFieldsModel = {
  ContactPerson: '',
  ClientEmailId: '',
  ClientAgencyName: '',
  RoleName: '',
};

//Redirect on this page from activation link
function ResetPassword(props) {
  const classes = useStyles();
  const { ActivationCode } = useParams();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({ ..._initialFormFieldsModel });
  const [values, setValues] = React.useState({
    password: '',
    confirmPassword: '',
  });
  const [activationCode, setActivationCode] = React.useState({
    email: '',
    userId: '',
    timeStamp: '',
  });
  const [shouldRenderPage, setShouldRenderPage] = useState(false);

  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    messages: {
      required: 'Please enter your :attribute',
    },
    validators: {
      passwordCheck: {
        message: 'Your password is weak',
        rule: (val, params, validator) => {
          if (
            passwordStrength(val).value === 'Weak' ||
            passwordStrength(val).value === 'Too weak'
          ) {
            return false;
          } else {
            return true;
          }
        },
      },
      passwordMatch: {
        message: 'Your password does not match',
        rule: (val, params, validator) => {
          if (val !== params[0]) {
            return false;
          } else {
            return true;
          }
        },
      },
    },
  });

  const failure = () => {
    props.showAlert({
      type: 'danger',
      message: 'Activation code is incorrect',
    });
    navigate('/');
  };

  useEffect(() => {
    if (ActivationCode) {
      try {
        const decryptedCode = decryptAES(ActivationCode);
        const [email, userId, timeStamp] = decryptedCode.split('^');
        if (decryptedCode.includes('^') && email && userId) {
          setActivationCode(() => ({
            email,
            userId,
            timeStamp,
          }));
          const payload = { Email: email, UserId: userId };
          props.getUserBasicInfoResetPassword(payload);
        } else {
          failure();
        }
      } catch (error) {
        failure();
      }
    }
  }, [ActivationCode]);

  useEffect(() => {
    if (!_.isEmpty(props.basicUserInfoResponse)) {
      if (!_.isEmpty(props.basicUserInfoResponse?.PartialUserData)) {
        const { Email, Status } = props.basicUserInfoResponse.PartialUserData;
        if (Email) {
          // User is a Business user
          // 0 is for Deactive
          // 1 is for Active
          if ([0, 1].includes(Status)) {
            const message =
              Status === 0
                ? 'User does not exists'
                : 'Password already created!';
            props.showAlert({ type: 'danger', message });
            navigate('/');
          } else {
            const { ContactName, BusinessName, RoleName } =
              props.basicUserInfoResponse.PartialUserData;
            setFormFields({
              ContactPerson: ContactName,
              ClientEmailId: Email,
              ClientAgencyName: BusinessName,
              RoleName,
            });
            setShouldRenderPage(true);
          }
        } else {
          // User is a Vendor user
          const payload = {
            ClientId: encryptAES(activationCode.userId),
          };
          const redirectOnError = () => navigate('/');
          props.getDetailsForSignUp(payload, redirectOnError);
        }
      }
    }
  }, [props.basicUserInfoResponse]);

  useEffect(() => {
    if (!_.isEmpty(props.signupDetailsResponse)) {
      if (
        !_.isEmpty(props.signupDetailsResponse?.Data?.[0]?.BasicInformation)
      ) {
        const { ClientEmailId, ContactPerson, ClientAgencyName, RoleType } =
          props.signupDetailsResponse.Data[0].BasicInformation;

        if (
          activationCode.email.toLowerCase() === ClientEmailId.toLowerCase()
        ) {
          setFormFields({
            ContactPerson,
            ClientEmailId,
            ClientAgencyName,
            RoleName: 'Contact User', // This is hardcoded for vendor users only
          });
          setShouldRenderPage(true);
        } else {
          props.showAlert({
            type: 'danger',
            message: 'This URL is invalid to set your password.',
          });
          navigate('/');
        }
      } else {
        props.showAlert({
          type: 'danger',
          message: 'This URL is invalid to set your password.',
        });
        navigate('/');
      }
    }
  }, [props.signupDetailsResponse]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (validator.allValid()) {
      const encodedPassword = encodeSha256(values.confirmPassword);

      const data = {
        Password: encodedPassword,
        UserId: encryptAES(activationCode.userId),
        ConfirmPassword: encodedPassword,
        Email: activationCode.email,
        AuthenticationType: 0,
      };
      const success = await props.savePassword(data);
      success && navigate('/');
    } else {
      validator.showMessages();
    }
  };

  if (props.isAuthenticated && props.userData != null) {
    // FIXME: Getting wrong url in props.userData.RedirectUrl
    // return <Navigate to={"/" + props.userData.RedirectUrl} />;
    return <Navigate to={'/App/Dashboard'} />;
  }

  useEffect(() => {
    if (props.passwordChanged) {
      props.setPasswordChanged(false);
      return navigate('/');
    }
  }, [props.passwordChanged]);

  return (
    shouldRenderPage && (
      <section className={classes.Bg}>
        <Container className={classes.Container} component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.LoginCard}>
            <Grid container spacing={0}>
              <Grid item xl={7} lg={7} md={7} sm={7} xs={0}>
                <Hidden smDown>
                  <SliderLogin />
                </Hidden>
              </Grid>
              <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                <Box
                  className={classes.LandingPageFormMain}
                  sx={{
                    height: {
                      xs: '100%',
                      sm: '562px',
                      md: '562px',
                      lg: '562px',
                    },
                    overflow: 'scroll',
                  }}
                >
                  {props.regionCode === 'aud' ? (
                    <img alt="logo mobile" src={DunomoLOGO} />
                  ) : (
                    <img alt="logo mobile" src={LOGO} />
                  )}
                  <br />
                  <br />
                  <Typography
                    className={classes.title}
                    component="h1"
                    variant="h5"
                  >
                    Sign Up
                  </Typography>
                  <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                      variant="standard"
                      margin="normal"
                      fullWidth
                      id="name"
                      value={formFields.ContactPerson}
                      label="Contact Name"
                      InputLabelProps={{ shrink: true }}
                      size="normal"
                    />
                    <br />
                    <br />

                    <TextField
                      variant="standard"
                      margin="normal"
                      fullWidth
                      id="email"
                      value={formFields.ClientEmailId}
                      label="Email Address"
                      InputLabelProps={{ shrink: true }}
                      size="normal"
                    />
                    <br />
                    <br />

                    <TextField
                      variant="standard"
                      margin="normal"
                      fullWidth
                      id="role"
                      value={formFields.RoleName}
                      label="Role Name"
                      InputLabelProps={{ shrink: true }}
                      size="normal"
                    />
                    <br />
                    <br />

                    <TextField
                      variant="standard"
                      margin="normal"
                      fullWidth
                      id="business"
                      value={formFields.ClientAgencyName}
                      label="Business Name"
                      InputLabelProps={{ shrink: true }}
                      size="normal"
                    />
                    <br />
                    <br />

                    <TextField
                      color={getColor(values.password)}
                      required
                      variant="standard"
                      margin="normal"
                      fullWidth
                      id="password"
                      value={values.password}
                      type="password"
                      label="New Password"
                      name="password"
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange('password')}
                      size="normal"
                      onBlur={() => {
                        validator.showMessageFor('password');
                      }}
                      helperText={
                        validator.message(
                          'password',
                          values.password,
                          'required|passwordCheck'
                        ) || passwordCheckMessage(values.password)
                      }
                    />
                    <br />
                    <br />

                    <TextField
                      required
                      variant="standard"
                      margin="normal"
                      fullWidth
                      id="confirmPassword"
                      value={values.confirmPassword}
                      type="password"
                      label="Confirm Password"
                      name="confirmPassword"
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange('confirmPassword')}
                      size="normal"
                      onBlur={() => {
                        validator.showMessageFor('confirmation_password');
                      }}
                      helperText={validator.message(
                        'confirmation_password',
                        values.confirmPassword,
                        `required|passwordMatch:${values.password}`
                      )}
                    />

                    <br />
                    <br />

                    <div>
                      <Stack direction="row" spacing={2}>
                        <Button
                          size="large"
                          type="submit"
                          variant="contained"
                          color="primary"
                          disableElevation
                          sx={{
                            backgroundColor: '#0091FF',
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          size="medium"
                          type="submit"
                          variant="outlined"
                          color="error"
                          disableElevation
                          onClick={() => navigate('/')}
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </div>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Container>
      </section>
    )
  );
}

ResetPassword.propTypes = {};

const mapStateToProps = (state) => ({
  ip: state.admin.userIpAddress,
  isAuthenticated: state.admin.isAuthenticated,
  userData: state.admin.user,
  basicUserInfoResponse: state.resetPassword.basicUserInfoResponse,
  signupDetailsResponse: state.resetPassword.signupDetailsResponse,
  regionCode: state.admin.regionCode,
});

export default connect(mapStateToProps, {
  getUserBasicInfoResetPassword,
  getDetailsForSignUp,
  showAlert,
  savePassword,
})(ResetPassword);
