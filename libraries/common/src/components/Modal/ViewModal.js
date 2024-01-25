import React from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import _ from "underscore";

import { useStyles } from "../../Theme";

function ViewModal({
  title,
  buttonText,
  data,
  tableFooterData,
  topBarData,
  columnNames,
  isModalOpen,
  closeModal,
  // apiData,
  submitToApi,
  ...props
}) {
  const classes = useStyles();
  const handleAction = () => {
    submitToApi();
  };

  return (
    <div>
      <Dialog
        PaperProps={{ square: true }}
        className={classes.ViewPageDialog}
        open={isModalOpen ?? false}
        onClose={closeModal}
        fullWidth={true}
        maxWidth="lg"
      >
        <div className="CustomDialogContainer-root">
          <div>
            <DialogTitle className={classes.ViewDialogTitle}>
              <Typography variant="h6">{title}</Typography>
              <IconButton
                size="small"
                onClick={closeModal}
                aria-label="delete"
                variant="outlined"
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              {/* <div className={classes.TopBar}>{topBarData}</div> */}
              <TableContainer className={classes.DetailTableContainer}>
                {/* <p className={classes.DetailsTitle}>Settlement Transactions</p> */}
                <Table
                  className={classes.NormalInnerTable}
                  sx={{ minWidth: 650 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      {columnNames?.map((item, index) => {
                        return <TableCell>{item}</TableCell>;
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          {item.map((data) => {
                            return <TableCell>{data}</TableCell>;
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  {tableFooterData !== null ? (
                    <TableFooter
                      style={{
                        backgroundColor: "#f5f5f5",
                        width: "100%",
                      }}
                    >
                      <TableRow>
                        {tableFooterData?.map((item, index) => {
                          return (
                            <TableCell>
                              <b>{item}</b>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableFooter>
                  ) : (
                    <></>
                  )}
                </Table>
              </TableContainer>
            </DialogContent>

            <DialogActions>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleAction} autoFocus>
                  {buttonText}
                </Button>
                <Button
                  color="primary"
                  /*variant="outlined"*/
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </Stack>
            </DialogActions>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

ViewModal.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ViewModal);
