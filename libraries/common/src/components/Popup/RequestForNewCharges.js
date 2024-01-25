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
  Stack,
  Box,
} from "@mui/material";

import { encryptAES } from "../../helper/cryptography";

import { formUseStyles } from "../../Theme";

import { fetchBusinessInformationForView } from "../../store/actions/BusinessManagement/ManageBusinesses/action_ManageBusiness";
import {
  closeRemarkPrompt,
  openRemarkPrompt,
} from "../../store/actions/Common/remarkPromptActions";
import { acceptChangedChargesRequest } from "../../store/actions/DashboardActions";

function RequestForNewCharges(props) {
  const classes = formUseStyles();
  const [remark, setRemark] = useState("");

  const acceptCharges = () => {
    props.acceptChangedChargesRequest({
      CompanyID: encryptAES(props.tokenData.CompanyId),
      ProgressStatus: 0,
      UpdateTableStatus: 1,
    });
  };

  const RejectCharges = () => {
    let apiData = {
      CompanyID: encryptAES(props.tokenData.CompanyId),
      ProgressStatus: 0,
      UpdateTableStatus: 2,
      Remarks: remark,
    };

    const payload = {
      title: "Reject new charges",
      isPromptOpen: true,
      closePrompt: props.closeRemarkPrompt,
      apiData: { ...apiData },
      submitToApi: props.acceptChangedChargesRequest,
    };

    props.openRemarkPrompt(payload);
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
      <DialogTitle className={classes.ViewDialogTitle}>
        <Typography variant="h6">Request to accept new charges</Typography>
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
        {props.value.receiveMoney.length > 0 && (
          <>
            <p className={classes.DetailsTitle}>Receive Money</p>
            <TableContainer>
              <Table
                className={classes.NormalInnerTable}
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Gateway Name</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Charges</TableCell>
                    <TableCell>Charge Type</TableCell>
                    <TableCell>Payment Mode</TableCell>
                    <TableCell>Issuing Bank</TableCell>
                    <TableCell>Relationship Manager Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.value.receiveMoney.map((item, index) => {
                    return (
                      <TableRow>
                        <TableCell>{item.GatewayName}</TableCell>
                        <TableCell>{item.CurrencySymbol}</TableCell>
                        <TableCell>{item.CommisionCharge}</TableCell>
                        <TableCell>{item.CommisionType}</TableCell>
                        <TableCell>{item.PaymentModeCode}</TableCell>
                        <TableCell>{item.IssuerName}</TableCell>
                        <TableCell>
                          <b>Name: </b>
                          {item.ContactName} <br />
                          <b>Mobile No: </b>
                          {item.MobileNo} <br />
                          <b>Email Address: </b>
                          <br />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {props.value.sendMoney.length > 0 && (
          <>
            <p className={classes.DetailsTitle}>Send Money</p>
            <TableContainer>
              <Table
                className={classes.NormalInnerTable}
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Gateway Name</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Charges</TableCell>
                    <TableCell>Charge Type</TableCell>
                    <TableCell>Payment Mode</TableCell>
                    <TableCell>Issuing Bank</TableCell>
                    <TableCell>Relationship Manager Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.value.sendMoney.map((item, index) => {
                    return (
                      <TableRow>
                        <TableCell>{item.GatewayName}</TableCell>
                        <TableCell>{item.CurrencySymbol}</TableCell>
                        <TableCell>{item.CommisionCharge}</TableCell>
                        <TableCell>{item.CommisionType}</TableCell>
                        <TableCell>{item.PaymentModeCode}</TableCell>
                        <TableCell>{item.IssuerName}</TableCell>
                        <TableCell>
                          <b>Name: </b>
                          {item.ContactName} <br />
                          <b>Mobile No: </b>
                          {item.MobileNo} <br />
                          <b>Email Address: </b>
                          <br />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {props.value.TaxMoney.length > 0 && (
          <>
            <p className={classes.DetailsTitle}>Tax Money</p>
            <TableContainer>
              <Table
                className={classes.NormalInnerTable}
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Gateway Name</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Charges</TableCell>
                    <TableCell>Charge Type</TableCell>
                    <TableCell>Payment Mode</TableCell>
                    <TableCell>Issuing Bank</TableCell>
                    <TableCell>Relationship Manager Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.value.TaxMoney.map((item, index) => {
                    return (
                      <TableRow>
                        <TableCell>{item.GatewayName}</TableCell>
                        <TableCell>{item.CurrencySymbol}</TableCell>
                        <TableCell>{item.CommisionCharge}</TableCell>
                        <TableCell>{item.CommisionType}</TableCell>
                        <TableCell>{item.PaymentModeCode}</TableCell>
                        <TableCell>{item.IssuerName}</TableCell>
                        <TableCell>
                          <b>Name: </b>
                          {item.ContactName} <br />
                          <b>Mobile No: </b>
                          {item.MobileNo} <br />
                          <b>Email Address: </b>
                          <br />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {props.value.settlement.length > 0 && (
          <>
            <p className={classes.DetailsTitle}>Settlement</p>
            <TableContainer>
              <Table
                className={classes.NormalInnerTable}
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Gateway Name</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Charges</TableCell>
                    <TableCell>Charge Type</TableCell>
                    <TableCell>Payment Mode</TableCell>
                    <TableCell>Issuing Bank</TableCell>
                    <TableCell>Relationship Manager Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.value.settlement.map((item, index) => {
                    return (
                      <TableRow>
                        <TableCell>{item.GatewayName}</TableCell>
                        <TableCell>{item.CurrencySymbol}</TableCell>
                        <TableCell>{item.CommisionCharge}</TableCell>
                        <TableCell>{item.CommisionType}</TableCell>
                        <TableCell>{item.PaymentModeCode}</TableCell>
                        <TableCell>{item.IssuerName}</TableCell>
                        <TableCell>
                          <b>Name: </b>
                          {item.ContactName} <br />
                          <b>Mobile No: </b>
                          {item.MobileNo} <br />
                          <b>Email Address: </b>
                          <br />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={acceptCharges} autoFocus>
            Accept
          </Button>
          <Button color="error" onClick={RejectCharges} variant="outlined">
            Reject
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

RequestForNewCharges.propTypes = {};

const mapStateToProps = (state) => ({
  tokenData: state.admin.tokenData,
  business_information: state.ManageBusiness.business_information,
  connectionRequests: state.dashboard.connectionRequests,
  showConnectionRequests: state.dashboard.showConnectionRequests,
});

export default connect(mapStateToProps, {
  fetchBusinessInformationForView,
  acceptChangedChargesRequest,
  closeRemarkPrompt,
  openRemarkPrompt,
})(RequestForNewCharges);
