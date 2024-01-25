import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Typography,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

import { formUseStyles } from "../../Theme";

import { acceptConnectionRequests } from "../../store/actions/DashboardActions";

function RequestToConnect(props) {
  const classes = formUseStyles();

  const acceptRequest = (clientId) => () => {
    props.acceptConnectionRequests({
      clientId: clientId,
    });
  };

  return (
    <Dialog
      className={classes.ViewPageDialog}
      open={props.isOpen}
      // onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
      disableEscapeKeyDown
    >
      <div className="CustomDialogContainer-root">
        <div>
          <DialogTitle className={classes.ViewDialogTitle}>
            <Typography variant="h6">Request to connect</Typography>
            {/* <IconButton
              size="small"
              onClick={props.handleClose}
              aria-label="delete"
              variant="outlined"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton> */}
          </DialogTitle>
          <DialogContent>
            <TableContainer className={classes.NewDataTableDialog}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Business Name</TableCell>
                    <TableCell>Contact Person</TableCell>
                    <TableCell>Mobile No</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.connectionRequests?.Data.map((item, index) => {
                    return (
                      <TableRow>
                        <TableCell>{item.BusinessName}</TableCell>
                        <TableCell>{item.ContactPerson}</TableCell>
                        <TableCell>{item.MobileNo}</TableCell>
                        <TableCell>{item.strStatus}</TableCell>
                        <TableCell>
                          <Button
                            onClick={acceptRequest(item.ClientId)}
                            variant="text"
                            color="primary"
                          >
                            Accept
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          {/* <DialogActions>
            <Button>Disagree</Button>
            <Button autoFocus>Agree</Button>
          </DialogActions> */}
        </div>
      </div>
    </Dialog>
  );
}

RequestToConnect.propTypes = {};

const mapStateToProps = (state) => ({
  connectionRequests: state.dashboard.connectionRequests,
});

export default connect(mapStateToProps, { acceptConnectionRequests })(
  RequestToConnect
);
