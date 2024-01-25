import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  Stack,
} from '@mui/material';
import { withStyles, styled } from '@mui/material/styles';

import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import _ from 'underscore';

import { formUseStyles } from '@paymate/common/style';

import { getBusinessChartData } from '@paymate/common/store/actions';

const COLORS = [
  '#63D99A',
  '#F4C17C',
  '#F49D7C',
  '#F6E277',
  '#72A6F2',
  '#A772F2',
];

function DashboardCharts(props) {
  const classes = formUseStyles();

  const values = props.data?.map((item) => +item.Data);
  const sum = values?.reduce((acc, value) => acc + value, 0);

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className={classes.Legend}>
        {payload.map((entry, index) => {
          if (entry.payload.Title) {
            return (
              <li key={`item-${index}`}>
                <div
                  className="LegendSquareIcon"
                  style={{ backgroundColor: entry.color }}
                />
                <span>{entry.payload.Title}</span>
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    );
  };

  return (
    <Paper variant="outlined" className={classes.DashboardCharts}>
      <Stack
        direction="row"
        spacing={{ xs: 2, md: 4, lg: 4 }}
        justifyContent="space-between"
        className={classes.TopBarDashboardCards}
      >
        <Typography variant="h6"> {props.graphName} </Typography>
        {props.tokenData.UserType === 'Business' && (
          <div id="TopBarCardDetailsCurrency">
            <FormControl variant="standard">
              <Select
                id="paymentCurrency"
                name="paymentCurrency"
                defaultValue={
                  props.regionCode === 'aud'
                    ? 'AUD'
                    : props.regionCode === 'myr'
                    ? 'MYR'
                    : 'SGD'
                }
                onChange={(e) =>
                  props.getBusinessChartData({
                    Type: props.type,
                    Data: null,
                    Caption: null,
                    CurrencyType: e.target.value,
                    Filter: null,
                  })
                }
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
        )}
      </Stack>

      <div style={{ width: '100%', height: 400 }}>
        {!_.isEmpty(props.data) ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={props.data.map((item) => ({ ...item, Data: +item.Data }))}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={120}
                // paddingAngle={0}
                nameKey="Title"
                dataKey="Data"
              >
                {!_.isEmpty(props.data) &&
                  props.data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
              </Pie>
              {sum !== 0 && <Tooltip />}
              {sum === 0 && (
                // render 100% fallback Pie
                <Pie
                  data={[{ name: 'No Data', value: 1 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={120}
                  fill="#eeeeee"
                />
              )}
              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No Data</p>
        )}
      </div>
    </Paper>
  );
}

DashboardCharts.propTypes = {};

const mapStateToProps = (state) => ({
  tokenData: state.admin.tokenData,
  currencyList: state.dataLists.currencyList,
  regionCode: state.admin.regionCode,
});

export default connect(mapStateToProps, { getBusinessChartData })(
  DashboardCharts
);
