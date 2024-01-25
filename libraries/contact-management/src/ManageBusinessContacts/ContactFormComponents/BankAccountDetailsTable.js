import React, { Component, useState, useEffect } from 'react';
import { withStyles } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formUseStyles } from '@paymate/common/style';

import {
  Typography,
  Grid,
  FormControl,
  TextField,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableFooter,
  TableRow,
  TableCell,
  Autocomplete,
  Box,
  Skeleton,
  Stack,
  Fade,
  Menu,
  IconButton,
  ButtonGroup,
} from '@mui/material';
import MUIDataTable from 'mui-datatables';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterIcon from '@mui/icons-material/FilterList';
import { FaSort } from 'react-icons/fa';
import _ from 'underscore';
import DeleteIcon from '@mui/icons-material/Delete';

function BankAccountDetailsTable(props) {
  const classes = formUseStyles();
  const resettingRef = React.useRef(true);
  const [page, setPage] = React.useState(1);
  const [sorting, setSorting] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.tableData);
  }, [props.tableData]);

  const handleDelete = (id) => {
    props.deleteBank(id);
  };

  const columns = [
    {
      name: 'accountHolderName',
      label: 'Account Holder Name',
      options: {
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
        customHeadLabelRender: ({ index, ...column }) => {
          return (
            <span>
              {column.label} <FaSort />
            </span>
          );
        },
      },
    },
    {
      name: 'bankName',
      label: 'Bank Name',
      options: {
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
        customHeadLabelRender: ({ index, ...column }) => {
          return (
            <span>
              {column.label} <FaSort />
            </span>
          );
        },
      },
    },
    {
      name: 'ibanNo',
      label: 'Iban No',
      options: {
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
        customHeadLabelRender: ({ index, ...column }) => {
          return (
            <span>
              {column.label} <FaSort />
            </span>
          );
        },
      },
    },
    {
      name: 'accountNo',
      label: 'Account No',
      options: {
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
        customHeadLabelRender: ({ index, ...column }) => {
          return (
            <span>
              {column.label} <FaSort />
            </span>
          );
        },
      },
    },
    {
      name: 'currency',
      label: 'Currency',
      options: {
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
        customHeadLabelRender: ({ index, ...column }) => {
          return (
            <span>
              {column.label} <FaSort />
            </span>
          );
        },
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
        customHeadLabelRender: ({ index, ...column }) => {
          return (
            <span>
              {column.label} <FaSort />
            </span>
          );
        },
      },
    },
    {
      name: 'Action',
      label: 'Action',
      options: {
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ButtonGroup
              size="small"
              variant="text"
              aria-label="text button group"
            >
              <IconButton
                onClick={() => {
                  handleDelete(value);
                }}
                color="secondary"
                aria-label="delete"
                size="small"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </ButtonGroup>
          );
        },
      },
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
    count: Number(props.tableData.length),
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
    <div>
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
                _.isArray(props.tableData)
                  ? [
                      ...(!_.isEmpty(props.fetchedTableData)
                        ? props.fetchedTableData
                        : []),
                      ...props.tableData,
                    ].map((item, index) => {
                      return {
                        accountHolderName: item.BeneficiaryName,
                        bankName: item.BankName,
                        ibanNo: item.HashIbanNo,
                        accountNo: item.HashAccountNo,
                        currency: item.CurrencyName,
                        status: item.Viewstatus,
                        Action: item.ContactAccountId,
                      };
                    })
                  : []
              }
              columns={columns}
              options={options}
            />
          </div>
        </>
      )}
    </div>
  );
}

BankAccountDetailsTable.propTypes = {};

const mapStateToProps = (state) => ({
  fetchedTableData: state.bankAccountDetails.tableData,
});

export default connect(mapStateToProps, {})(BankAccountDetailsTable);
