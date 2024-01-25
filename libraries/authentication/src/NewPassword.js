import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Link,
  Navigate,
  Redirect,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import {
  Box,
  Container,
  Grid,
  Hidden,
  TextField,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import { getColor, passwordCheckMessage } from '@paymate/common/components';
import { encodeSha256, useSimpleReactValidator } from '@paymate/common/helpers';
import SliderLogin from './Slider';

import LOGO from '@paymate/common/assets/logo.png';
import DunomoLOGO from '@paymate/common/assets/dunomologo.png';

import {
  changePassword,
  setOtpSent,
  setPasswordChanged,
} from '@paymate/common/store/actions';
import { passwordStrength } from 'check-password-strength';

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
    [theme.breakpoints.up('xs')]: {
      padding: '40px 20px',
    },
  },
}));

//This page comes after Verify OTP
function NewPassword(props) {
  const classes = useStyles();
  let location = useLocation();
  let navigate = useNavigate();

  const [email] = useState(location.state.email);
  const [values, setValues] = React.useState({
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
    },
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onSubmit = () => {
    if (validator.allValid()) {
      const encodedPassword = encodeSha256(values.confirmPassword);

      const data = {
        Password: encodedPassword,
        ConfirmPassword: encodedPassword,
        Email: email,
      };
      props.changePassword(data);
    } else {
      validator.showMessages();
    }
  };

  if (props.isAuthenticated && props.userData != null) {
    return <Navigate to={'/' + props.userData.RedirectUrl} />;
  }

  if (email === '' || email === undefined) {
    return <Navigate to="/ForgotPassword" />;
  }

  useEffect(() => {
    if (props.passwordChanged) {
      props.setPasswordChanged(false);
      return navigate('/');
    }
  }, [props.passwordChanged]);

  useEffect(() => {
    return () => {
      props.setOtpSent(false);
    };
  }, []);

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
                  Set new password
                </Typography>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <form className={classes.form}>
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
                          'required|passwordCheck'
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

                    <div align="left">
                      <Link to={'/'} className={classes.hyperlink}>
                        Back to login
                      </Link>
                    </div>

                    <div>
                      <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        disableElevation
                        className={classes.submit}
                        sx={{
                          textTransform: 'capitalize',
                          backgroundColor: '#0091FF',
                        }}
                        onClick={onSubmit}
                      >
                        Change Password
                      </Button>
                    </div>
                  </form>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
}

NewPassword.propTypes = {};

const mapStateToProps = (state) => ({
  passwordChanged: state.password.passwordChanged,
  ip: state.admin.userIpAddress,
  isAuthenticated: state.admin.isAuthenticated,
  userData: state.admin.user,
  regionCode: state.admin.regionCode,
});

export default connect(mapStateToProps, {
  changePassword,
  setPasswordChanged,
  setOtpSent,
})(NewPassword);
