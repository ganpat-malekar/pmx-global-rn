import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import LOGO from '@paymate/common/assets/logo.png';
import DunomoLOGO from '@paymate/common/assets/dunomologo.png';

import { useSimpleReactValidator } from '@paymate/common/helpers';
import {
  getOtp,
  setOtpSent,
  setOtpVerified,
  validateOtp,
} from '@paymate/common/store/actions';
import React, { useEffect, useRef, useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import OtpInput from 'react-otp-input';
import { connect } from 'react-redux';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import SliderLogin from './Slider';

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
  timer: {
    marginTop: '5px !important',
    marginLeft: '5px !important',
  },
  errorMsg: {
    color: 'red !important',
  },
}));

//Enter the OTP received on email after forgot password screen.
function VerifyOtp(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const timerRef = useRef(null);
  let location = useLocation();
  let navigate = useNavigate();

  const [isLinkActive, setIsLinkActive] = useState(false);
  const [values, setValues] = React.useState({
    otp: '',
  });
  const [timeStamp, setTimeStamp] = useState(Date.now());
  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    messages: {
      required: 'Please enter a valid OTP',
    },
  });

  useEffect(() => {
    if (location?.state?.email) {
      setEmail(location?.state?.email);
    } else {
      navigate(`/ForgotPassword`);
    }
  }, [location?.state?.email]);

  const handleChange = (otp) => {
    setValues({
      otp: otp,
    });
  };

  const redirectToForget = () => {
    props.setOtpSent(false);
    navigate(`/ForgotPassword`);
  };

  const resendOtp = () => {
    props.setOtpSent(true);
    setTimeStamp(Date.now());
    props.getOtp(email);
  };

  const onSubmit = (event) => {
    if (validator.allValid()) {
      const data = {
        Email: email,
        EmailOtp: values.otp,
      };
      props.validateOtp(data);
    } else {
      validator.showMessages();
    }
  };

  if (props.isAuthenticated && props.userData != null) {
    return <Navigate to={`/` + props.userData.RedirectUrl} />;
  }

  if (props.otpVerified) {
    props.setOtpVerified(false);
    return navigate(`/NewPassword`, {
      state: {
        email: email,
      },
    });
  }

  return (
    <section className={classes.Bg}>
      <Container className={classes.Container} component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.LoginCard}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <SliderLogin />
            </Grid>
            <Grid item xs={5}>
              <Box sx={{ padding: '40px 0px 0px 9px' }}>
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
                  Verify OTP
                </Typography>

                <Typography
                  onClick={redirectToForget}
                  className={classes.hyperlink}
                  sx={{
                    px: 0,
                    cursor: 'pointer',
                    '&:hover': { color: '#075065' },
                  }}
                >
                  Change email address
                </Typography>

                <form className={classes.form}>
                  <div className="input-otp-main">
                    <OtpInput
                      isInputNum={true}
                      isDisabled={!props.otpSent}
                      value={values.otp}
                      onChange={handleChange}
                      numInputs={6}
                      shouldAutoFocus={true}
                      className="input-otp"
                      inputStyle="otp-input"
                      focusStyle="otp-input-focus"
                      isInputSecure={true}
                    />
                    <FormHelperText>
                      {validator.message(
                        'otp',
                        values.otp,
                        'required|size:6,string'
                      )}
                    </FormHelperText>
                  </div>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'left',
                      alignItems: 'center',
                      my: 2,
                    }}
                  >
                    {!props.otpSent ? (
                      <Button
                        sx={{ padding: 0 }}
                        variant="text"
                        onClick={resendOtp}
                      >
                        Resend OTP
                      </Button>
                    ) : (
                      <Typography className={classes.timer}>
                        <Countdown
                          date={timeStamp + 50000}
                          ref={timerRef}
                          renderer={({ minutes, seconds }) =>
                            `${minutes}:${zeroPad(seconds)}`
                          }
                          onComplete={() => {
                            props.setOtpSent(false);
                            setValues({ otp: '' });
                          }}
                        />
                      </Typography>
                    )}
                  </Box>

                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    disableElevation
                    sx={{
                      backgroundColor: '#0091FF',
                    }}
                    disabled={!props.otpSent}
                    onClick={onSubmit}
                  >
                    Verify
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
}

VerifyOtp.propTypes = {};

const mapStateToProps = (state) => ({
  otpSent: state.password.otpSent,
  otpVerified: state.password.otpVerified,
  ip: state.admin.userIpAddress,
  isAuthenticated: state.admin.isAuthenticated,
  userData: state.admin.user,
  regionCode: state.admin.regionCode,
});

export default connect(mapStateToProps, {
  getOtp,
  setOtpSent,
  validateOtp,
  setOtpVerified,
})(VerifyOtp);
