import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  Typography,
  FormControl,
  TextField,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableRow,
  ListItemIcon,
  Autocomplete,
  Box,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Select,
} from '@mui/material';

import _ from 'underscore';

import cardPayment from '@paymate/common/assets/cardPayment.svg';
import cashBack from '@paymate/common/assets/cashBack.svg';

import { formUseStyles } from '@paymate/common/style';

import { getCurrencyList } from '@paymate/common/store/actions';

function BusinessDashboardCards(props) {
  const classes = formUseStyles();
  const [collectionCurrency, setCollectionCurrency] = useState('');
  const [paymentCurrency, setPaymentCurrency] = useState('');
  const [accountBalanceCurrency, setAccountBalanceCurrency] = useState('');

  useEffect(() => {
    props.getCurrencyList();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(props.currencyList) && props.currencyList.length === 1) {
      setCollectionCurrency(props.currencyList[0]?.CurrencySymbol);
      setPaymentCurrency(props.currencyList[0]?.CurrencySymbol);
      setAccountBalanceCurrency(props.currencyList[0]?.CurrencySymbol);
    }
  }, [props.currencyList]);

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', md: 'row', lg: 'row' }}
        spacing={{ xs: 2, md: 4, lg: 4 }}
        className={classes.TopBarDashboardCards}
      >
        <Card id="TopBarDashboardCardCollections">
          <CardContent>
            <Stack direction="row" spacing={2}>
              <div>
                <CardMedia
                  component="img"
                  height="50"
                  image={cashBack}
                  alt="Icon"
                />
              </div>
              <div>
                <Typography id="TopBarCardDetailsText"> Collection </Typography>
                <Typography id="TopBarCardDetailsValue">
                  {
                    props.balanceData?.find((x) => x.Title === 'Total Received')
                      ?.Data
                  }
                </Typography>
              </div>
              <div id="TopBarCardDetailsCurrency">
                <FormControl variant="standard">
                  <Select
                    id="collectionCurrency"
                    name="collectionCurrency"
                    // defaultValue="AED"
                    value={collectionCurrency}
                    onChange={(e) => setCollectionCurrency(e.target.value)}
                  >
                    {!_.isEmpty(props.currencyList) ? (
                      props.currencyList.map((currency, index) => {
                        return (
                          <MenuItem key={index} value={currency.CurrencySymbol}>
                            {currency.CurrencySymbol}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem disabled>No options</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
            </Stack>
          </CardContent>
        </Card>
        <Card id="TopBarDashboardCardPayments">
          <CardContent>
            <Stack direction="row" spacing={2}>
              <div>
                <CardMedia
                  component="img"
                  height="50"
                  image={cardPayment}
                  alt="Icon"
                />
              </div>
              <div>
                <Typography id="TopBarCardDetailsText"> Payments </Typography>
                <Typography id="TopBarCardDetailsValue">
                  {
                    props.balanceData?.find((x) => x.Title === 'Total Paid')
                      ?.Data
                  }
                </Typography>
              </div>
              <div id="TopBarCardDetailsCurrency">
                <FormControl variant="standard">
                  <Select
                    id="paymentCurrency"
                    name="paymentCurrency"
                    // defaultValue="AED"
                    value={paymentCurrency}
                    onChange={(e) => setPaymentCurrency(e.target.value)}
                  >
                    {!_.isEmpty(props.currencyList) ? (
                      props.currencyList.map((currency, index) => {
                        return (
                          <MenuItem key={index} value={currency.CurrencySymbol}>
                            {currency.CurrencySymbol}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem disabled>No options</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
            </Stack>
          </CardContent>
        </Card>
        <Card id="TopBarDashboardCardBalance">
          <CardContent>
            <Stack direction="row" spacing={2}>
              <div>
                <CardMedia
                  component="img"
                  height="50"
                  image={cardPayment}
                  alt="Icon"
                />
              </div>
              <div>
                <Typography id="TopBarCardDetailsText">
                  {' '}
                  Account Balance{' '}
                </Typography>
                <Typography id="TopBarCardDetailsValue">
                  {
                    props.balanceData?.find(
                      (x) => x.Title === 'Your account balance'
                    )?.Data
                  }
                </Typography>
              </div>
              <div id="TopBarCardDetailsCurrency">
                <FormControl variant="standard">
                  <Select
                    id="accountBalanceCurrency"
                    name="accountBalanceCurrency"
                    // defaultValue="AED"
                    value={accountBalanceCurrency}
                    onChange={(e) => setAccountBalanceCurrency(e.target.value)}
                  >
                    {!_.isEmpty(props.currencyList) ? (
                      props.currencyList.map((currency, index) => {
                        return (
                          <MenuItem key={index} value={currency.CurrencySymbol}>
                            {currency.CurrencySymbol}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem disabled>No options</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

BusinessDashboardCards.propTypes = {};

const mapStateToProps = (state) => ({
  tokenData: state.admin.tokenData,
  currencyList: state.dataLists.currencyList,
  balanceData:
    state.dashboard.businessDashboardResponse.Data
      ?.lstRecivedMadebalanceDetails,
});

export default connect(mapStateToProps, { getCurrencyList })(
  BusinessDashboardCards
);
