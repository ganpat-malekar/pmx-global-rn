import { useEffect, useState } from 'react';
import { FaSort } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';

import _ from 'underscore';

import { formUseStyles } from '@paymate/common/style';
import {
  DashboardCharts,
  DashboardTable,
  QuickLinks,
  BusinessDashboardCards,
} from '@paymate/common/components';

import { tableColumnOptions, encryptAES } from '@paymate/common/helpers';

import {
  getProfileMenuDetails,
  getBusinessDashboardDetails,
  getBusinessChartData,
  getCurrencyByCountry,
} from '@paymate/common/store/actions';

function BusinessDashboard(props) {
  const classes = formUseStyles();
  const userIdentity = props.userData.RoleIds.split(',');
  const [collectionTableData, setCollectionPaymentData] = useState([]);
  const [paymentTableData, setPaymentTableData] = useState([]);
  const navigate = useNavigate();

  // API calls
  useEffect(() => {
    props.getProfileMenuDetails();
    props.getCurrencyByCountry({
      CountryId: encryptAES(props.tokenData.CountryId),
    });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(props.currencyList)) {
      props.getBusinessDashboardDetails({
        ObjReceivedMade: {
          Type: 0,
          Data: null,
          Caption: null,
          CurrencyType: props.currencyList[0].CurrencySymbol,
          Filter: null,
        },
        ObjCurrency: {
          CountryId: encryptAES(props.tokenData.CountryId),
          PaymentType: 1,
          CRID: 0,
          ClientId: 0,
          CompanyId: null,
        },
      });

      props.getBusinessChartData({
        Type: 1,
        Data: null,
        Caption: null,
        CurrencyType: props.currencyList[0].CurrencySymbol,
        Filter: null,
      });

      props.getBusinessChartData({
        Type: 2,
        Data: null,
        Caption: null,
        CurrencyType: props.currencyList[0].CurrencySymbol,
        Filter: null,
      });
    }
  }, [props.currencyList]);

  useEffect(() => {
    if (!_.isEmpty(props.businessDashboardResponse)) {
      if (!_.isEmpty(props.businessDashboardResponse?.Data)) {
        const { ListMade, ListReceived } =
          props.businessDashboardResponse.Data?.objTransactionDetails;

        const paymentTable = !_.isEmpty(ListMade) ? ListMade : [];
        const collectionTable = !_.isEmpty(ListReceived) ? ListReceived : [];

        setCollectionPaymentData(collectionTable);
        setPaymentTableData(paymentTable);
      }
    }
  }, [props.businessDashboardResponse]);

  const collectionColumns = [
    {
      name: 'Date',
      label: 'Date',
      options: { ...tableColumnOptions },
    },
    {
      name: 'ClientName',
      label: 'From',
      options: { ...tableColumnOptions },
    },
    {
      name: 'Amount',
      label: 'Amount',
      options: { ...tableColumnOptions },
    },
    {
      name: 'Action',
      label: 'Action',
      options: {
        sort: true,
        customHeadLabelRender: ({ index, ...column }) => {
          return (
            <span>
              {column.label} <FaSort />
            </span>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div
              style={{
                textAlign: 'center',
                display: 'block',
              }}
            >
              {' '}
              {value.includes("'Request Again'") ? (
                <Button
                  style={{
                    display: value?.includes("'Request Again'")
                      ? 'flex'
                      : 'none',
                  }}
                  onClick={() => {
                    navigate('/App/CollectPayment');
                  }}
                >
                  <Typography textAlign="center">Request Again</Typography>
                </Button>
              ) : (
                '-'
              )}
            </div>
          );
        },
      },
    },
  ];

  const paymentColumns = [
    {
      name: 'Date',
      label: 'Date',
      options: { ...tableColumnOptions },
    },
    {
      name: 'ClientName',
      label: 'To',
      options: { ...tableColumnOptions },
    },
    {
      name: 'Amount',
      label: 'Amount',
      options: { ...tableColumnOptions },
    },
    {
      name: 'Action',
      label: 'Action',
      options: {
        sort: true,
        customHeadLabelRender: ({ index, ...column }) => {
          return (
            <span>
              {column.label} <FaSort />
            </span>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div
              style={{
                textAlign: 'center',
                display: 'block',
              }}
            >
              {value.includes("'Pay Again'") ? (
                <Button
                  style={{
                    display: value?.includes("'Pay Again'") ? 'flex' : 'none',
                  }}
                  onClick={() => {
                    navigate('/App/MakeAPayment');
                  }}
                >
                  <Typography textAlign="center">Pay Again</Typography>
                </Button>
              ) : (
                '-'
              )}
            </div>
          );
        },
      },
    },
  ];

  return (
    <Box>
      <Grid
        container
        justifyContent="flex-end"
        alignItems="stretch"
        spacing={4}
        className={classes.Dashboard}
      >
        <Grid item xs={12} md={12} lg={9}>
          <Box id="MainBox">
            <Grid spacing={4} container>
              <Grid item xs={12}>
                <div>
                  <Typography variant="h5">
                    Welcome,{' '}
                    <b>
                      {
                        props.businessDashboardResponse?.Data
                          ?.BusinessDashboardnotification?.DisplayName
                      }
                    </b>
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12}>
                <BusinessDashboardCards />
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <DashboardCharts
                  graphName={'Collection'}
                  data={props.collectionChartResponse.Data}
                  type={1}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <DashboardCharts
                  graphName={'Payments'}
                  data={props.paymentChartResponse.Data}
                  type={2}
                />
              </Grid>

              <Grid item xs={12}>
                <DashboardTable
                  tableName={'Collection'}
                  businessTableData={collectionTableData}
                  columns={collectionColumns}
                />
              </Grid>
              <Grid item xs={12}>
                <DashboardTable
                  tableName={'Payments'}
                  businessTableData={paymentTableData}
                  columns={paymentColumns}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={3}>
          <QuickLinks></QuickLinks>
        </Grid>
      </Grid>
    </Box>
  );
}

BusinessDashboard.propTypes = {};

const mapStateToProps = (state) => ({
  userData: state.admin.user,
  tokenData: state.admin.tokenData,
  currencyList: state.dataLists.currencyList,
  businessDashboardResponse: state.dashboard.businessDashboardResponse,
  collectionChartResponse: state.dashboard.collectionChartResponse,
  paymentChartResponse: state.dashboard.paymentChartResponse,
});

export default connect(mapStateToProps, {
  getProfileMenuDetails,
  getCurrencyByCountry,
  getBusinessDashboardDetails,
  getBusinessChartData,
})(BusinessDashboard);
