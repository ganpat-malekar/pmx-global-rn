import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Container, Grid, TextField, Hidden } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import PropTypes from 'prop-types';

import {
  LoginContinuePopup,
  passwordCheckMessage,
} from '@paymate/common/components';
import SliderLogin from './Slider';

import {
  useSimpleReactValidator,
  encodeSha256,
  validatorRules,
} from '@paymate/common/helpers';

import { config } from '@paymate/common/config';
import {
  signIn,
  getMultipleAccounts,
  //setOtpSent,
} from '@paymate/common/store/actions';
import { passwordStrength } from 'check-password-strength';

import LOGO from '@paymate/common/assets/logo.png';
import DunomoLOGO from '@paymate/common/assets/dunomologo.png';

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

function SignIn(props) {
  const navigate = useNavigate();

  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const [data, setData] = useState({});

  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    messages: {
      email: 'This is not an email.',
      password: 'Password does not match the requirements.',
      regex: 'Please enter a valid username.',
      required: 'Please enter your :attribute',
    },
    validators: {
      ...validatorRules,
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
    },
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = () => {
    if (validator.allValid()) {
      // hash the password
      const encodedPassword = encodeSha256(values.password);

      const data = {
        UserName: values.username,
        Password: encodedPassword,
      };

      setData(data);

      props.signIn(data);
    } else {
      validator.showMessages();
    }
  };
  // handle redirect
  // Do we want the backend to control our display paths? or keep it
  // separate i.e., path received from backend will be of no use.
  useEffect(() => {
    if (props.isAuthenticated && props.userData != null) {
      if (!props.userData.IsExpired) {
        if (props.userData.RedirectUrl === 'DashBoards/AdminDashBoard') {
          navigate(`/App/Dashboard`);
        } else if (
          props.userData.RedirectUrl === 'DashBoards/BusinessDashBoard'
        ) {
          navigate(`/App/BusinessDashboard`);
        } else {
          props.getMultipleAccounts({
            UserId: props.userData.UserId,
          });
        }
      } else {
        navigate(`/Account/ChangePassword`);
      }
    }
  }, [props.isAuthenticated, props.userData]);

  // NOTE: multiple accounts is not a part of APAC
  // useEffect(() => {
  //   if (props.isAuthenticated && props.userData != null) {
  //     if (props.multipleAccountsData?.Data?.length > 1) {
  //       navigate('/App/MultipleBusinessProfile');
  //     } else {
  //       navigate('/App/Dashboard');
  //     }
  //   }
  // }, [props.multipleAccountsData]);

  validator.purgeFields();

  return (
    <section className={classes.Bg}>
      <Container className={classes.Container} component="main" maxWidth="xs">
        <CssBaseline />
        <LoginContinuePopup data={{ ...data }} />
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
                  Login with your PayMate Account
                </Typography>

                <form className={classes.form}>
                  <TextField
                    required
                    color="secondary"
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="username"
                    value={values.username}
                    type="email"
                    label="Username"
                    name="username"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange('username')}
                    size="normal"
                    onBlur={() => {
                      validator.showMessageFor('email');
                    }}
                    helperText={validator.message(
                      'email',
                      values.username,
                      'required|email_validator'
                    )}
                  />

                  <br />
                  <br />
                  <TextField
                    required
                    color="secondary"
                    variant="standard"
                    margin="normal"
                    fullWidth
                    name="password"
                    value={values.password}
                    label="Password"
                    type={values.showPassword ? 'text' : 'password'}
                    id="password"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange('password')}
                    size="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onBlur={() => {
                      validator.showMessageFor('password');
                    }}
                    // helperText={validator.message(
                    //   'password',
                    //   values.password,
                    //   'required'
                    // )}
                    helperText={
                      validator.message(
                        'password',
                        values.password,
                        'required|passwordCheck'
                      ) || passwordCheckMessage(values.password)
                    }
                  />

                  <div align="left">
                    <Link to={`/ForgotPassword`} className={classes.hyperlink}>
                      Forgot password?
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
                        backgroundColor: '#0091FF',
                      }}
                      onClick={onSubmit}
                    >
                      Sign in
                    </Button>
                  </div>
                </form>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  ip: state.admin.userIpAddress,
  isAuthenticated: state.admin.isAuthenticated,
  userData: state.admin.user,
  multipleAccountsData: state.admin.multipleAccountsData,
  tokenData: state.admin.tokenData,
  regionCode: state.admin.regionCode,
});

export default connect(mapStateToProps, {
  signIn,
  getMultipleAccounts,
  //setOtpSent,
})(SignIn);
