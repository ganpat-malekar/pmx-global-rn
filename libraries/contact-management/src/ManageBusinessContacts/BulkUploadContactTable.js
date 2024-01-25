import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { formUseStyles } from '@paymate/common/style';
import {
  TableLoaderSkeleton,
  tableColumnOptions,
  decryptAES,
  encryptAES,
} from '@paymate/common/helpers';
import {
  clearTableData,
  confirmBulkContact,
  showAlert,
} from '@paymate/common/store/actions';
import {
  Grid,
  Menu,
  IconButton,
  MenuItem,
  Typography,
  Button,
} from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MUIDataTable from 'mui-datatables';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import _ from 'underscore';

function BulkUploadContactsTable(props) {
  const classes = formUseStyles();
  const history = useHistory();
  const resettingRef = React.useRef(true);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    return () => {
      props.clearTableData();
    };
  }, []);

  const handleConfirm = async () => {
    const payload = {
      CompanyId: encryptAES(props.response.Data.CompanyId),
      UploadedBy: encryptAES(props.response.Data.UploadedBy),
    };

    const success = await props.confirmBulkContact(payload);
    success && history.push(`/App/ManageContacts`);

    success &&
      props.showAlert({
        type: 'success',
        message: `${props.tableData.length} record(s) uploaded successfully`,
      });
  };

  const columns = [
    {
      name: 'SrNo',
      label: 'Sr No.',
      options: { ...tableColumnOptions, customHeadLabelRender: '' },
    },
    {
      name: 'CompanyName',
      label: 'Company Name',
      options: { ...tableColumnOptions, customHeadLabelRender: '' },
    },
    {
      name: 'MobileNumber',
      label: 'Mobile Number',
      options: { ...tableColumnOptions, customHeadLabelRender: '' },
    },
    {
      name: 'EmailAddress',
      label: 'Email Address',
      options: { ...tableColumnOptions, customHeadLabelRender: '' },
    },
    {
      name: 'ReferenceCode',
      label: 'Reference Code',
      options: { ...tableColumnOptions, customHeadLabelRender: '' },
    },
    {
      name: 'Message',
      label: 'Message',
      options: { ...tableColumnOptions, customHeadLabelRender: '' },
    },
  ];

  const options = {
    elevation: 0,
    responsive: 'standard',
    rowHover: true,
    filter: false,
    print: false,
    page: page - 1,
    search: false,
    viewColumns: false,
    // rowsSelected: selectedRows,
    selectableRows: 'none',
    // selectableRowsHeader: true,
    // onRowSelectionChange: (a, b, rowsSelected) => {
    //   setSelectedRows(rowsSelected);
    // },
    // selectToolbarPlacement: "none",
    count: _.has(props.paymentsTableData, 'TotalRecords')
      ? Number(props.paymentsTableData.TotalRecords)
      : 0,
    rowsPerPage: rowsPerPage,
    serverSide: true,
    rowsPerPageOptions: [10, 15, 20],
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
        default:
      }
    },
  };

  const changePage = (page) => {
    resettingRef.current = true;
    setPage(page + 1);
  };

  const changeRowPerPage = (rows) => {
    resettingRef.current = true;
    setPage(1);
    setRowsPerPage(rows);
  };

  return (
    <>
      <Grid item lg={6} md={6} xs={12}></Grid>
      <Grid item lg={6} md={6} xs={12}></Grid>
      <Grid item lg={6} md={6} xs={12}>
        <Typography variant="h6" component="div">
          Uploaded Contacts
        </Typography>
      </Grid>

      {props.isDataInvalid && (
        <Grid item lg={12} md={12} xs={12}>
          <div className={classes.InfoText}>
            <p> Click confirm below to confirm the contact</p>
          </div>
        </Grid>
      )}

      <Grid item lg={12} md={12} xs={12}>
        <div>
          {props.apiStatus === null ? (
            <TableLoaderSkeleton numberOfBones={10} />
          ) : (
            <>
              {/* <div className={clsx(classes.DataTables, classes.DensePaddingTable)}> */}
              <div className={classes.NewDataTable}>
                <MUIDataTable
                  data={
                    !_.isEmpty(props.tableData)
                      ? props.tableData.map((item, index) => {
                          return {
                            SrNo: index + 1,
                            CompanyName: item.CompanyName ?? '-',
                            MobileNumber: item.MobileNumber ?? '-',
                            EmailAddress: item.EmailAddress ?? '-',
                            ReferenceCode: item.ReferenceCode ?? '-',
                            Message: item.Message || '-',
                          };
                        })
                      : []
                  }
                  columns={columns}
                  options={{ ...options }}
                />
              </div>
            </>
          )}
        </div>
      </Grid>

      <Grid item xs={12}>
        {props.isDataInvalid && (
          <Button
            style={{ marginRight: '1%' }}
            variant="contained"
            color="primary"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        )}
        <Link to="/App/ManageContacts">
          <Button variant="outlined" color="error">
            Cancel
          </Button>
        </Link>
      </Grid>
    </>
  );
}

BulkUploadContactsTable.propTypes = {};

const mapStateToProps = (state) => ({
  response: state.bulkContact.bulkContactTableData,
  tableData: state.bulkContact.bulkContactTableData?.Data.lstBulkContact,
  isDataInvalid:
    state.bulkContact.bulkContactTableData?.Data.lstBulkContact.some(
      (item) => !!item.IsValid
    ),
});

export default connect(mapStateToProps, {
  clearTableData,
  confirmBulkContact,
  showAlert,
})(BulkUploadContactsTable);
