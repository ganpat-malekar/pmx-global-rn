import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import MUIDataTable from "mui-datatables";

import _ from "underscore";

import TableLoaderSkeleton from "../TableLoaderSkeleton";

import tableColumnOptions from "../../helper/tableColumnOptions";

import { formUseStyles } from "../../Theme";

import { handleRiskHistoryModal } from "../../store/actions/Common/riskHistoryPopupActions";

function RiskHistoryPopup({ isOpen, tableData, ...props }) {
  const classes = formUseStyles();
  const [page, setPage] = React.useState(1);
  const [sorting, setSorting] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const resettingRef = React.useRef(true);

  const handleClosePopup = () => {
    props.handleRiskHistoryModal({ isOpen: false, tableData: [] });
  };

  const columns = [
    {
      name: "RiskName",
      label: "Risk Name",
      options: { ...tableColumnOptions },
    },
    {
      name: "Remarks",
      label: "Remarks",
      options: { ...tableColumnOptions },
    },
    {
      name: "ContactName",
      label: "Added By",
      options: { ...tableColumnOptions },
    },
    {
      name: "CreatedOn",
      label: "Created On",
      options: { ...tableColumnOptions },
    },
  ];

  const options = {
    elevation: 0,
    responsive: "standard",
    rowHover: true,
    filter: false,
    print: false,
    search: false,
    viewColumns: false,
    selectableRows: "none",
    count: Number(tableData?.length),
    rowsPerPage: rowsPerPage,
    serverSide: false,
    rowsPerPageOptions: [10, 15, 20],
    downloadOptions: {
      filename: "RiskCompliance",
    },
    onTableChange: (action, tableState) => {
      if (tableState.activeColumn === 0) {
      }
      switch (action) {
        case "changePage":
          changePage(tableState.page, tableState.sortOrder);
          break;
        case "changeRowsPerPage":
          changeRowPerPage(tableState.rowsPerPage);
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
    setSorting(columnName + " " + sortOrder);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={isOpen ?? false}
      onClose={handleClosePopup}
      className={classes.ViewPageDialog}
    >
      <>
        <DialogTitle className={classes.ViewDialogTitle}>
          <Typography variant="h5">Risk Compliance History</Typography>
          <IconButton
            size="small"
            onClick={handleClosePopup}
            aria-label="delete"
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className={classes.DensePaddingTable}>
            {tableData === null ? (
              <TableLoaderSkeleton />
            ) : (
              <MUIDataTable
                data={
                  !_.isEmpty(tableData)
                    ? tableData?.map(
                        (
                          { RiskName, Remarks, ContactName, CreatedOn },
                          index
                        ) => {
                          return {
                            RiskName,
                            Remarks,
                            ContactName,
                            CreatedOn,
                          };
                        }
                      )
                    : []
                }
                columns={columns}
                options={options}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={1}>
            <Button variant="text" color="primary" onClick={handleClosePopup}>
              Back
            </Button>
          </Stack>
        </DialogActions>
      </>
    </Dialog>
  );
}

RiskHistoryPopup.propTypes = {};

const mapStateToProps = (state) => ({
  ...state.riskHistoryPopup,
});

export default connect(mapStateToProps, { handleRiskHistoryModal })(
  RiskHistoryPopup
);
