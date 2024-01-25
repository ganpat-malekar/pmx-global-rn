import React, { Component, useState, useEffect } from 'react';
import { FaSort } from 'react-icons/fa';
import { connect } from 'react-redux';

import { Skeleton, Stack, Typography, Paper } from '@mui/material';

import MUIDataTable from 'mui-datatables';

import _ from 'underscore';

import { tableColumnOptions } from '@paymate/common/helpers';

import { formUseStyles } from '@paymate/common/style';

function DashboardTable(props) {
  const classes = formUseStyles();
  const resettingRef = React.useRef(true);
  const [page, setPage] = React.useState(1);
  const [sorting, setSorting] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = [
    {
      name: 'CompanyName',
      label: 'Business',
      options: { ...tableColumnOptions },
    },
    {
      name: 'Currency',
      label: 'Currency',
      options: { ...tableColumnOptions },
    },
    {
      name: 'TransactionCount',
      label: 'Count',
      options: { ...tableColumnOptions },
    },
    {
      name: 'TotalAmt',
      label: 'Payable Amount',
      options: { ...tableColumnOptions },
    },
  ];

  const options = {
    elevation: 0,
    responsive: 'standard',
    rowHover: true,
    filter: false,
    print: false,
    search: false,
    viewColumns: false,
    serverSide: true,
    selectableRows: 'none',
    count: Number(
      _.isEmpty(props.businessTableData)
        ? props.tableData?.length
        : props.businessTableData?.length
    ),
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [10, 15, 20],
    downloadOptions: {
      filename: 'BusinessConfiguration',
    },
    onTableChange: (action, tableState) => {
      if (tableState.activeColumn === 0) {
      }
      switch (action) {
        case 'changePage':
          changePage(tableState.page, tableState.sortOrder);
          break;
        case 'changeRowsPerPage':
          changeRowPerPage(tableState.rowsPerPage);
          break;
        case 'sort':
          changeSorting(
            tableState.sortOrder.name,
            tableState.sortOrder.direction
          );
          break;
        default:
      }
    },
  };

  const changePage = (page) => {
    resettingRef.current = true;
    setPage(page);
  };

  const changeRowPerPage = (rows) => {
    resettingRef.current = true;
    setPage(1);
    setRowsPerPage(rows);
  };

  const changeSorting = (columnName, sortOrder) => {
    setPage(1);
    resettingRef.current = true;
    setSorting(columnName + ' ' + sortOrder);
  };

  return (
    <Paper variant="outlined" className={classes.DashboardCharts}>
      <Typography variant="h6"> {props.tableName} </Typography>
      {props.apiStatus === null ? (
        <div className={classes.TableLoaderStack}>
          <div>
            <Stack spacing={1}>
              <Skeleton animation="wave" variant="rectangular" height={40} />
              <Skeleton animation="wave" variant="rectangular" height={40} />
              <Skeleton animation="wave" variant="rectangular" height={40} />
              <Skeleton animation="wave" variant="rectangular" height={40} />
              <Skeleton animation="wave" variant="rectangular" height={40} />
            </Stack>
          </div>
          <div className={classes.last} align="right">
            <Skeleton animation="wave" variant="text" width={400} height={50} />
          </div>
        </div>
      ) : (
        <>
          <div className={classes.NewDataTable}>
            <MUIDataTable
              data={
                _.isEmpty(props.businessTableData)
                  ? _.isArray(props.tableData)
                    ? props.tableData.map((item, index) => {
                        return {
                          CompanyName: item.CompanyName,
                          Currency: item.Currency,
                          TransactionCount: item.TransactionCount,
                          TotalAmt: item.ToalAmt,
                        };
                      })
                    : []
                  : props.businessTableData
              }
              columns={_.isEmpty(props.columns) ? columns : props.columns}
              options={options}
            />
          </div>
        </>
      )}
    </Paper>
  );
}

DashboardTable.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(DashboardTable);
