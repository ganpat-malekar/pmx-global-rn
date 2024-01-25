import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearLoggedInUser } from '@paymate/common/store/actions';

function LoggingOut(props) {
  const navigate = useNavigate();

  useEffect(() => {
    props.clearLoggedInUser();
    navigate('/');
    // setTimeout(() => {
    //   props.history.push("/");
    // }, 3000);
  }, []);
  return <></>;
}

LoggingOut.propTypes = {};

const mapStateToProps = (state) => ({
  ip: state.admin.userIpAddress,
  isAuthenticated: state.admin.isAuthenticated,
  userData: state.admin.user,
});

export default connect(mapStateToProps, {
  clearLoggedInUser,
})(LoggingOut);
