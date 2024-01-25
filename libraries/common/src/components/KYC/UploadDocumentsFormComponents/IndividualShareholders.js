import React, { Component, useState, useEffect } from "react";
import { FaSort } from "react-icons/fa";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Grid,
  Menu,
  IconButton,
  MenuItem,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";

import MUIDataTable from "mui-datatables";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import _ from "underscore";

import TableLoaderSkeleton from "../../TableLoaderSkeleton";

import { menuPropsTopCorner } from "../../../helper/extraProps";
import tableColumnOptions from "../../../helper/tableColumnOptions";

import { formUseStyles } from "../../../Theme";
import { decryptAES } from "../../../helper/cryptography";
import { closeFileModal } from "../../../store/actions/Common/filePopupActions";

import {
  fetchViewImage,
  deleteKYCDocument,
} from "../../../store/actions/BusinessManagement/ManageBusinesses/KYC/action_CommonKYC";
import {
  openConfirmPrompt,
  closeConfirmPrompt,
} from "../../../store/actions/Common/confirmPromptActions";
import { handleFileModal } from "../../../store/actions/Common/filePopupActions";
import { initialFilePopupState } from "../../../store/reducers/Common/filePopupReducer";

function IndividualShareholders(props) {
  const classes = formUseStyles();
  const resettingRef = React.useRef(true);
  const [page, setPage] = React.useState(1);
  const [sorting, setSorting] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleDelete = async (popupState, DocumentDetailId, rowIndex) => {
    let shouldCallApi = !!DocumentDetailId;

    if (shouldCallApi) {
      const payload = {
        DocumentDetailId: decryptAES(DocumentDetailId),
        Status: 0,
      };

      const success = await props.deleteKYCDocument(payload);

      success && props.deleteIndividualShareholderRecord(rowIndex);
    } else {
      props.deleteIndividualShareholderRecord(rowIndex);
    }

    popupState.close();
  };

  const viewFile = (value, popupState) => {
    props.fetchViewImage(
      { PaymateReferenceId: value[0], DocumentFileName: value[1] },
      true,
      true
    );
    popupState.close();
  };

  useEffect(() => {
    return () => {
      props.closeFileModal();
    };
  }, []);

  const columns = [
    {
      name: "Name",
      label: "Name",
      options: { ...tableColumnOptions },
    },
    {
      name: "IDProof",
      label: "ID Proof",
      options: {
        ...tableColumnOptions,
        customBodyRender: (value, tableMeta, updateValue) => {
          // let temp = props.IndividualDocumentNames.filter(
          //   (e) => e.Text === value
          // );
          // console.log(temp);
          //return temp[0].Text;
          return value;
        },
      },
    },
    {
      name: "Document",
      label: "Document",
      options: { ...tableColumnOptions },
    },
    {
      name: "NameOnDocument",
      label: "Name on Document",
      options: { ...tableColumnOptions },
    },
    {
      name: "Nationality",
      label: "Nationality",
      options: { ...tableColumnOptions },
    },
    {
      name: "Country",
      label: "Country",
      options: {
        ...tableColumnOptions,
        customBodyRender: (value, tableMeta, updateValue) => {
          let temp = props.countriesDropdown.filter(
            (e) => e.CountryId === value
          );
          return temp[0].CountryName;
        },
      },
    },
    {
      name: "DOB",
      label: "Date of Birth",
      options: { ...tableColumnOptions },
    },
    {
      name: "DOI",
      label: "Date of Issue",
      options: { ...tableColumnOptions },
    },
    {
      name: "DOE",
      label: "Expiry Date",
      options: { ...tableColumnOptions },
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <IconButton size="small" {...bindTrigger(popupState)}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                    <Menu
                      className={classes.NewMenuDropDown}
                      PaperProps={menuPropsTopCorner}
                      {...bindMenu(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      {/**View File */}
                      <MenuItem
                        style={{
                          display: value[0] ? "flex" : "none",
                        }}
                        onClick={() => {
                          viewFile(value, popupState);
                        }}
                      >
                        <Typography textAlign="center">View File</Typography>
                      </MenuItem>
                      {/**Delete Record */}
                      <MenuItem
                        style={{
                          display: "flex",
                        }}
                        onClick={() =>
                          handleDelete(popupState, value[0], value[2])
                        }
                      >
                        <Typography textAlign="center">Delete</Typography>
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
          );
        },
        customHeadLabelRender: ({ index, ...column }) => {
          return <span>{column.label}</span>;
        },
      },
    },
  ];

  const options = {
    elevation: 0,
    responsive: "standard",
    rowHover: true,
    filter: false,
    print: false,
    page: page - 1,
    search: false,
    viewColumns: false,
    selectableRows: "none",
    count: _.has(props.x, "TotalRecords") ? Number(props.x.TotalRecords) : 0,
    rowsPerPage: rowsPerPage,
    serverSide: true,
    rowsPerPageOptions: [10, 15, 20],
    onTableChange: (action, tableState) => {
      if (tableState.activeColumn === 0) {
      }
      switch (action) {
        case "changePage":
          changePage(tableState.page, tableState.sortOrder);
          break;
        case "changeRowsPerPage":
          changeRowPerPage(tableState.rowsPerPage.target.value);
          break;
        case "sort":
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
    setPage(page + 1);
  };

  const changeRowPerPage = (rows) => {
    resettingRef.current = true;
    setPage(1);
    setRowsPerPage(rows);
  };

  const changeSorting = (columnName, sortOrder) => {
    setPage(1);
    resettingRef.current = true;
    setSorting(columnName + " " + sortOrder);
  };

  return (
    <div className={classes.FormPanel}>
      <Grid container item lg={12} md={12} xs={12} spacing={3}>
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
                      !_.isEmpty(props.IndividualShareholders)
                        ? props.IndividualShareholders.map((item, index) => {
                            return {
                              Name: item.ShareholderName,
                              IDProof: item.DocumentName,
                              Document: item.DocumentFileName,
                              NameOnDocument: item.DocumentHolderName,
                              Nationality: item.Nationality,
                              Country: item.CountryId,
                              DOB: item.DocumentHolderBirthDate,
                              DOI: item.DocumentIssueDate,
                              DOE: item.DocumentExpiryDate,
                              Actions: [
                                item.PaymateDocumentId,
                                item.DocumentFileName,
                                index,
                              ],
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
        </Grid>
      </Grid>
    </div>
  );
}

IndividualShareholders.propTypes = {};

const mapStateToProps = (state) => ({
  IndividualDocumentNames: state.businessKYC.IndividualShareholder?.lstIDProof,
  countriesDropdown: state.dataLists.countriesMetadata,
});

export default connect(mapStateToProps, {
  openConfirmPrompt,
  closeConfirmPrompt,
  fetchViewImage,
  handleFileModal,
  deleteKYCDocument,
  closeFileModal,
})(IndividualShareholders);
