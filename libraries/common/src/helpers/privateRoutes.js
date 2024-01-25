import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import _ from 'underscore';

// import { clearLocalStorage } from "@root/store/actions/adminActions";

const PrivateRoute = ({ children, isAuthenticated }, props) =>
  // {
  //   return isAuthenticated ? <Children /> : <Navigate to="/LoggingOut" />;
  // };
  {
    const navigate = useNavigate();

    if (!isAuthenticated) {
      return navigate(`/LoggingOut`);
    }

    return children;
  };

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.admin.isAuthenticated,
});

export default connect(mapStateToProps, {})(PrivateRoute);
