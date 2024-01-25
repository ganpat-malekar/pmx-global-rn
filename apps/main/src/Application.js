import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';

import PropTypes from 'prop-types';

import { config } from '@paymate/common/config';
import AdminPanel from './DashboardLayout';
import { Alert } from '@paymate/common/components';
import { PrivateRoute, getRegionCode } from '@paymate/common/helpers';
import { outerTheme } from '@paymate/common/style';
//import { URLAuthentication } from '@paymate/common/components';
import {
  ChangePassword,
  ForgotPassword,
  // ApproveRejectMinimumCharges,
  // MultipleBusinessProfile,
  LoggingOut,
  NewPassword,
  PageNotFound,
  ResetPassword,
  SignIn,
  VerifyOtp,
} from '@paymate/authentication';
import {
  storeRegionCode,
  fetchGeographicDetails,
} from '@paymate/common/store/actions';

function BlockBackButton(props) {
  const location = useLocation();
  useEffect(() => {
    // NOTE:Back Button will work only in local host environment
    if (window.location.host !== 'localhost:3000') {
      window.addEventListener('popstate', function (event) {
        window.history.pushState(null, document.title, window.location.href);
      });
    }
  }, []);

  useEffect(() => {
    if (window.location.host !== 'localhost:3000') {
      window.history.pushState(null, document.title, window.location.href);
    }
  }, [location]);

  return <>{props.children}</>;
}

function Application(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!_.isEmpty(props.regionCode)) {
      props.storeRegionCode(props.regionCode.toLowerCase());

      const data = {
        CurrencyCode: props.regionCode.toUpperCase(),
      };
      props.fetchGeographicDetails(data);
    }
  }, [props.regionCode]);

  return (
    <>
      <Backdrop
        sx={{ color: '#17B7E9', zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={props.isLoading ?? false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ThemeProvider theme={outerTheme}>
        <div className="App">
          <Alert />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route
              path="/Account/ChangePassword"
              element={
                <PrivateRoute>
                  <ChangePassword />
                </PrivateRoute>
              }
            />
            <Route path="/LoggingOut" element={<LoggingOut />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/VerifyOtp" element={<VerifyOtp />} />
            <Route path="/NewPassword" element={<NewPassword />} />
            <Route
              exact
              path="/ResetPassword/:ActivationCode"
              element={<ResetPassword />}
            />

            {/* <Route path="*" element={<PageNotFound />}></Route> */}

            <Route
              path="/App/*"
              element={
                <PrivateRoute>
                  <AdminPanel />
                </PrivateRoute>
              }
            />
            {/* 
                <Route
                  exact
                  path="/URLAuthentication/:guid/:prakriya/:bhugtanprakriya"
                  component={URLAuthentication}
                />
                
                <Route
                  exact
                  path="/ApproveRejectMinimumCharges/:prakriya/:email"
                  component={ApproveRejectMinimumCharges}
                />
                <Route
                  exact
                  path="/App/MultipleBusinessProfile"
                  component={MultipleBusinessProfile}
                />
                
                <PrivateRoute path="/App" component={AdminPanel} />
                 */}
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

Application.propTypes = {
  isLoading: PropTypes.bool,
  regionCode: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isLoading: state.admin.isLoading,
});

export default connect(mapStateToProps, {
  storeRegionCode,
  fetchGeographicDetails,
})(Application);
