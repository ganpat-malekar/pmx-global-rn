import { useEffect } from 'react';
import { connect } from 'react-redux';

import { Box, Grid, Typography } from '@mui/material';

import {
  getCurrencyList,
  getAdminDashboardSettlementTransactions,
  getDashboardGraphData,
  getDashboardQuickLinks,
  getProfileMenuDetails,
} from '@paymate/common/store/actions';

import {
  DashboardCards,
  DashboardCharts,
  DashboardTable,
  QuickLinks,
} from '@paymate/common/components';

import { formUseStyles } from '@paymate/common/style';

function AdminDashboard(props) {
  const classes = formUseStyles();

  const userIdentity = props.userData.RoleIds.split(',');

  useEffect(() => {
    props.getProfileMenuDetails();
    props.getDashboardQuickLinks();
    props.getCurrencyList();
    props.getDashboardGraphData({
      CurrencyType: 'AED',
      Type: 'Business',
    });
    props.getDashboardGraphData({
      CurrencyType: 'AED',
      Type: 'vendor',
    });
    props.getDashboardGraphData({
      CurrencyType: 'USD',
      Type: 'vendor',
    });
    if (
      userIdentity.includes('3') ||
      userIdentity.includes('5') ||
      userIdentity.includes('6')
    ) {
      props.getAdminDashboardSettlementTransactions();
    }
  }, []);

  return (
    <Grid
      container
      justifyContent="flex-end"
      alignItems="stretch"
      spacing={4}
      className={classes.Dashboard}
      id="heightFlex"
    >
      <Grid item xs={12} md={12} lg={9}>
        <Box id="MainBox">
          <Grid spacing={4} container>
            <Grid item xs={12}>
              <div>
                <Typography variant="h5">Welcome to PayMate</Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DashboardCards></DashboardCards>
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <DashboardCharts
                graphName={'Business Activation'}
                data={props.businessActivationGraphData}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <DashboardCharts
                graphName={'Vendor Activation'}
                data={props.vendorActivationGraphData}
              />
            </Grid>
            {(userIdentity.includes('1') || userIdentity.includes('2')) && (
              <>
                <Grid item xs={12} md={12} lg={6}>
                  <DashboardCharts
                    graphName={'Receivables'}
                    data={props.receivablesGraphData}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                  <DashboardCharts
                    graphName={'Payables'}
                    data={props.payablesGraphData}
                  />
                </Grid>
              </>
            )}
            {(userIdentity.includes('3') ||
              userIdentity.includes('5') ||
              userIdentity.includes('6')) && (
              <>
                <Grid item xs={12}>
                  <DashboardTable
                    tableName={'Pending Collection Settlement'}
                    tableData={props.tableDataPendingCollectionSettlement}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DashboardTable
                    tableName={'Pending Payment Settlement'}
                    tableData={props.tableDataPendingPaymentSettlement}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} md={12} lg={3}>
        <QuickLinks></QuickLinks>
      </Grid>
    </Grid>
  );
}

AdminDashboard.propTypes = {};

const mapStateToProps = (state) => ({
  businessActivationGraphData: state.dashboard.businessActivationGraphData,
  vendorActivationGraphData: state.dashboard.vendorActivationGraphData,
  payablesGraphData: state.dashboard.payablesGraphData,
  receivablesGraphData: state.dashboard.receivablesGraphData,
  userData: state.admin.user,
  tableDataPendingCollectionSettlement:
    state.dashboard.tableDataPendingCollectionSettlement,
  tableDataPendingPaymentSettlement:
    state.dashboard.tableDataPendingPaymentSettlement,
});

export default connect(mapStateToProps, {
  getProfileMenuDetails,
  getDashboardQuickLinks,
  getDashboardGraphData,
  getCurrencyList,
  getAdminDashboardSettlementTransactions,
})(AdminDashboard);
