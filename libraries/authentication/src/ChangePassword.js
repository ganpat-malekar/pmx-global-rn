import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, useHistory, useParams, useNavigate } from 'react-router-dom';

import InfoIcon from '@mui/icons-material/Info';
import {
  Container,
  Stack,
  TextField,
  Box,
  Typography,
  Grid,
  Tooltip,
  InputAdornment,
  IconButton,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { passwordStrength } from 'check-password-strength';
import PropTypes from 'prop-types';
import _ from 'underscore';
import SliderLogin from './Slider';

import { useSimpleReactValidator, encodeSha256 } from '@paymate/common/helpers';

import { passwordCheckMessage, getColor } from '@paymate/common/components';

import LOGO from '@paymate/common/assets/logo.png';
import DunomoLOGO from '@paymate/common/assets/dunomologo.png';

import {
  changePassword,
  setPasswordChanged,
  extendPasswordExpiry,
  getCurrentPassword,
} from '@paymate/common/store/actions';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: '8px',
    backgroundColor: '#f50057',
  },
  form: {
    width: '100%',
    margin: '15px 0 15px 0',
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
    [theme.breakpoints.down('sm')]: {
      padding: '40px 20px',
    },
  },
}));

// NOTE: This page is used when the password for a user has expired
// and it asks us to update the password or continue on the same one
function ChangePassword(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });

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
      samePassword: {
        message:
          'The Current Password and the New Password cannot be the same.',
        rule: (val, params, validator) => {
          if (val === params[0]) {
            return false;
          } else {
            return true;
          }
        },
      },
      verifyPassword: {
        message: 'Sorry! Please enter the correct password',
        rule: (val, params, validator) => {
          if (encodeSha256(val) !== params[0]) {
            return false;
          } else {
            return true;
          }
        },
      },
    },
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onSkip = () => {
    props.extendPasswordExpiry();
  };

  useEffect(() => {
    props.getCurrentPassword();
  }, []);

  useEffect(() => {
    if (props.passwordChanged) {
      props.setPasswordChanged(false);
      return navigate('/');
    }
  }, [props.passwordChanged]);

  const onSubmit = () => {
    if (validator.allValid()) {
      const encodedCurrentPassword = encodeSha256(values.currentPassword);
      const encodedNewPassword = encodeSha256(values.confirmPassword);

      const data = {
        CurrentPassword: encodedCurrentPassword,
        NewPassword: encodedNewPassword,
        ConfirmPassword: encodedNewPassword,
      };
      props.changePassword(data);
    } else {
      validator.showMessages();
    }
  };

  return (
    <section className={classes.Bg}>
      <Container className={classes.Container} component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.LoginCard}>
          <Grid container spacing={2}>
            <Grid item xl={7} lg={7} md={7} sm={7} xs={0}>
              <Hidden smDown>
                <SliderLogin />
              </Hidden>
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
              <Box className={classes.LandingPageFormMain}>
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
                  Change Password
                </Typography>

                <form className={classes.form}>
                  <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="currentPassword"
                    value={values.currentPassword}
                    type="password"
                    label="Current Password"
                    name="currentPassword"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange('currentPassword')}
                    size="normal"
                    onBlur={() => {
                      validator.showMessageFor('current_password');
                    }}
                    helperText={validator.message(
                      'current_password',
                      values.currentPassword,
                      `required|verifyPassword:${props?.currentPassword}`
                    )}
                  />
                  <br />
                  <br />

                  <TextField
                    color={getColor(values.password)}
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
                        `required|passwordCheck|samePassword:${values.currentPassword}`
                      ) || passwordCheckMessage(values.password)
                    }
                  />

                  <br />
                  <br />

                  <TextField
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
                  <Stack direction="row" spacing={8}>
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      disableElevation
                      className={classes.submit}
                      sx={{
                        backgroundColor: '#0091FF',
                      }}
                      onClick={onSubmit}
                    >
                      Save
                    </Button>
                    <Button
                      size="large"
                      color="info"
                      disableElevation
                      className={classes.submit}
                      onClick={onSkip}
                    >
                      Skip
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
}

ChangePassword.propTypes = {};

const mapStateToProps = (state) => ({
  passwordChanged: state.password.passwordChanged,
  ip: state.admin.userIpAddress,
  userData: state.admin.user,
  currentPassword: state.changePassword?.currentPassword,
  regionCode: state.admin.regionCode,
});

export default connect(mapStateToProps, {
  changePassword,
  setPasswordChanged,
  extendPasswordExpiry,
  getCurrentPassword,
})(ChangePassword);
