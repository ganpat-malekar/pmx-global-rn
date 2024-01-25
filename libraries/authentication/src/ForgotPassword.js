import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { Box, Container, Grid, Hidden, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { config } from '@paymate/common/config';

import PropTypes from 'prop-types';

import DunomoLOGO from '@paymate/common/assets/dunomologo.png';
import LOGO from '@paymate/common/assets/logo.png';

import SliderLogin from './Slider';

import {
  useSimpleReactValidator,
  validatorRules,
} from '@paymate/common/helpers';

import { getOtp, setOtpSent, showAlert } from '@paymate/common/store/actions';

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

function ForgotPassword(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    username: '',
  });

  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    messages: {
      email: 'This is not an email.',
      required: 'Please enter your :attribute',
    },
    validators: { ...validatorRules },
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // apply validator
    if (validator.allValid()) {
      props.getOtp(values.username);
    } else {
      validator.showMessages();
    }
  };

  if (props.isAuthenticated && props.userData != null) {
    return <Navigate to={'/' + props.userData.RedirectUrl} />;
  }

  if (props.otpSent) {
    console.log(props.otpSent);
    return navigate('/VerifyOtp', {
      state: {
        email: values.username,
      },
    });
  }

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
                  Forgot password
                </Typography>

                <form className={classes.form}>
                  <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="username"
                    value={values.username}
                    type="email"
                    label="Email"
                    name="username"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange('username')}
                    size="normal"
                    onBlur={() => {
                      validator.showMessageFor('Email address');
                    }}
                    helperText={validator.message(
                      'Email address',
                      values.username,
                      'required|email_validator'
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
                        backgroundColor: '#0091FF',
                      }}
                      onClick={onSubmit}
                    >
                      Get an otp on email id
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

ForgotPassword.propTypes = {
  getOtp: PropTypes.func.isRequired,
  setOtpSent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  otpSent: state.password.otpSent,
  ip: state.admin.userIpAddress,
  isAuthenticated: state.admin.isAuthenticated,
  userData: state.admin.user,
  regionCode: state.admin.regionCode,
});

export default connect(mapStateToProps, { getOtp, setOtpSent, showAlert })(
  ForgotPassword
);
