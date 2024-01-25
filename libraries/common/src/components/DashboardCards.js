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

import {
  getCurrencyList,
  getProfileMenuDetails,
  getDashboardQuickLinks,
  getDashboardGraphData,
} from '@paymate/common/store/actions';

function DashboardCards(props) {
  const classes = formUseStyles();

  const [payableCurrency, setPayableCurrency] = useState('');
  const [receivableCurrency, setReceivableCurrency] = useState('');

  useEffect(() => {
    props.getCurrencyList();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(props.currencies) && props.currencies.length === 1) {
      setPayableCurrency(props.currencies[0]?.CurrencySymbol);
      setReceivableCurrency(props.currencies[0]?.CurrencySymbol);
    }
  }, [props.currencies]);

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', md: 'row', lg: 'row', sm: 'row' }}
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
                    props.balanceData[receivableCurrency]?.find(
                      (x) => x.Title === 'Total Received'
                    )?.Data
                  }
                </Typography>
              </div>
              <div id="TopBarCardDetailsCurrency">
                <FormControl variant="standard">
                  <Select
                    id="ReceivableCurrency"
                    name="ReceivableCurrency"
                    // defaultValue="AED"
                    value={receivableCurrency}
                    onChange={(e) => setReceivableCurrency(e.target.value)}
                  >
                    {!_.isEmpty(props.currencies) ? (
                      props.currencies.map((currency, index) => {
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
                    props.balanceData[payableCurrency]?.find(
                      (x) => x.Title === 'Total Paid'
                    )?.Data
                  }
                </Typography>
              </div>
              <div id="TopBarCardDetailsCurrency">
                <FormControl variant="standard">
                  <Select
                    id="PayableCurrency"
                    name="PayableCurrency"
                    // defaultValue="AED"
                    value={payableCurrency}
                    onChange={(e) => setPayableCurrency(e.target.value)}
                  >
                    {!_.isEmpty(props.currencies) ? (
                      props.currencies.map((currency, index) => {
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

DashboardCards.propTypes = {};

const mapStateToProps = (state) => ({
  currencies: state.dataLists.currencyList,
  balanceData: state.dashboard.balanceData,
});

export default connect(mapStateToProps, {
  getProfileMenuDetails,
  getDashboardQuickLinks,
  getDashboardGraphData,
  getCurrencyList,
})(DashboardCards);
