import { useEffect } from 'react';
import { connect } from 'react-redux';

import AdminDashboard from './AdminDashboard';
import BusinessDashboard from './BusinessDashboard';

import { formUseStyles } from '@paymate/common/style';

function Dashboard(props) {
  const classes = formUseStyles();

  return props.tokenData.UserType === 'Admin' ? (
    <AdminDashboard />
  ) : (
    <BusinessDashboard />
  );
}

Dashboard.propTypes = {};

const mapStateToProps = (state) => ({
  tokenData: state.admin.tokenData,
});

export default connect(mapStateToProps, {})(Dashboard);
