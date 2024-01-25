import React from 'react';
import { connect } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import CloseRounded from '@mui/icons-material/CloseRounded';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { ToggleAccountNo } from '@paymate/common/components';
import { decryptAES, htmlActionExtractor } from '@paymate/common/helpers';
import _ from 'underscore';

import {
  closeRemarkPrompt,
  closeViewVendorDialogFn,
  deleteBankAccount,
  manageVendor,
  openRemarkPrompt,
} from '@paymate/common/store/actions';
import { formUseStyles, useStyles } from '@paymate/common/style';

function ViewVendorInformation(props) {
  const classes = useStyles();
  const classesFormUseStyles = formUseStyles();
  const skeleton_number = 8;

  const handleClose = () => {
    props.closeViewVendorDialogFn();
  };

  const rejectSettlementBank = (ContactAccountId) => {
    const data = {
      AccountId: ContactAccountId,
      Status: 2, //Hardcoded
    };
    props.deleteBankAccount(data);
  };

  const approveAction = () => {
    var data = {
      Crid: props.viewVendorData.Data.BasicInformation.Crid,
      ClientId: props.viewVendorData.Data.BasicInformation.ClientId,
      UploadedBy: props.viewVendorData.Data.UploadedBy,
      Status: 4, //hardcoded
      Documentstatus: 0,
      Remarks: null,
    };
    props.manageVendor(data);
  };

  const rejectAction = () => {
    var data = {
      // Remarks: "test",
      ClientId: props.viewVendorData.Data.BasicInformation.ClientId,
      Crid: props.viewVendorData.Data.BasicInformation.Crid,
      UploadedBy: props.viewVendorData.Data.UploadedBy,
      Status: 2, //hardcoded
      Documentstatus: 0,
    };

    const payload = {
      title: 'Vendor Configuration',
      isPromptOpen: true,
      closePrompt: props.closeRemarkPrompt,
      apiData: { ...data },
      submitToApi: props.manageVendor,
    };
    props.openRemarkPrompt(payload);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={props.viewVendorDialog ?? false}
        onClose={handleClose}
        className={classes.ViewPageDialog}
      >
        {!_.has(props.viewVendorData, 'Status') && (
          <div className={classes.TableLoaderStack}>
            <div className={classes.first}>
              <Skeleton
                animation="wave"
                variant="text"
                width={300}
                height={50}
              />
            </div>
            <div>
              <Stack spacing={1}>
                {[...Array(skeleton_number)].map(() => {
                  return (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      height={40}
                    />
                  );
                })}
              </Stack>
            </div>
            <div
              className={classes.last}
              align="left"
              style={{ fontWeight: 400 }}
            >
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={50}
              />
            </div>
          </div>
        )}
        {_.has(props.viewVendorData, 'Status') &&
          props.viewVendorData.Status && (
            <>
              <DialogTitle className={classes.ViewDialogTitle}>
                <Typography variant="h5">Vendor Information</Typography>
                <IconButton
                  size="small"
                  onClick={handleClose}
                  aria-label="delete"
                  variant="outlined"
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <p className={classes.DetailsTitle}>
                  Basic Information Details
                </p>
                <TableContainer className={classes.DetailTableContainer}>
                  <Table
                    className={classes.NormalTable}
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                  >
                    <TableBody>
                      <TableRow>
                        <TableCell width="20%" align="left">
                          Company Name
                        </TableCell>
                        <TableCell
                          width="25%"
                          align="left"
                          style={{ fontWeight: 400 }}
                        >
                          {
                            props.viewVendorData.Data.BasicInformation
                              .ClientAgencyName
                          }
                        </TableCell>
                        <TableCell width="10%" align="justify"></TableCell>
                        <TableCell
                          width="20%"
                          align="left"
                          style={{
                            display:
                              props?.regionCode === 'aed' ? 'block' : 'none',
                          }}
                        >
                          Nick Name
                        </TableCell>
                        <TableCell
                          width="25%"
                          align="left"
                          style={{
                            fontWeight: 400,
                            display:
                              props?.regionCode === 'aed' ? 'block' : 'none',
                          }}
                        >
                          {props.viewVendorData.Data.BasicInformation.NickName}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell width="20%" align="left">
                          Contact Person
                        </TableCell>
                        <TableCell
                          width="25%"
                          align="left"
                          style={{ fontWeight: 400 }}
                        >
                          {
                            props.viewVendorData.Data.BasicInformation
                              .ContactPerson
                          }
                        </TableCell>
                        <TableCell width="10%" align="justify"></TableCell>
                        <TableCell width="20%" align="left">
                          Contact Designation
                        </TableCell>
                        <TableCell
                          width="25%"
                          align="left"
                          style={{ fontWeight: 400 }}
                        >
                          {
                            props.viewVendorData.Data.BasicInformation
                              .ContactDesignation
                          }
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell width="20%" align="left">
                          Email Address
                        </TableCell>
                        <TableCell
                          width="25%"
                          align="left"
                          style={{ fontWeight: 400 }}
                        >
                          {
                            props.viewVendorData.Data.BasicInformation
                              .ClientEmailId
                          }
                        </TableCell>
                        <TableCell width="10%" align="justify"></TableCell>
                        <TableCell width="20%" align="left">
                          Mobile No
                        </TableCell>
                        <TableCell
                          width="25%"
                          align="left"
                          style={{ fontWeight: 400 }}
                        >
                          {props.viewVendorData.Data.BasicInformation.IsdCode}-
                          {
                            props.viewVendorData.Data.BasicInformation
                              .ClientMobileNo
                          }
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell width="20%" align="left">
                          Type of Contact
                        </TableCell>
                        <TableCell
                          width="25%"
                          align="left"
                          style={{ fontWeight: 400 }}
                        >
                          {
                            props.viewVendorData.Data.BasicInformation
                              .TypeOfContact
                          }
                        </TableCell>
                        <TableCell width="10%" align="justify"></TableCell>
                        <TableCell width="20%" align="left">
                          Reference Code
                        </TableCell>
                        <TableCell
                          width="25%"
                          align="left"
                          style={{ fontWeight: 400 }}
                        >
                          {/* check if this is the correct value */}
                          {
                            props.viewVendorData.Data.BasicInformation
                              .AgencyCode
                          }
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell width="20%" align="left">
                          Country
                        </TableCell>
                        <TableCell
                          width="25%"
                          align="left"
                          style={{ fontWeight: 400 }}
                        >
                          {
                            props.viewVendorData.Data.BasicInformation
                              .CountryName
                          }
                        </TableCell>
                        <TableCell width="10%" align="justify"></TableCell>
                        <TableCell width="20%" align="left">
                          Registration Date
                        </TableCell>
                        <TableCell
                          width="25%"
                          align="left"
                          style={{ fontWeight: 400 }}
                        >
                          {
                            props.viewVendorData.Data.BasicInformation
                              .CreatedDate
                          }
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell width="20%" align="left">
                          Terms Acceptance Date
                        </TableCell>
                        <TableCell
                          width="25%"
                          align="left"
                          style={{ fontWeight: 400 }}
                        >
                          {
                            props.viewVendorData.Data.BasicInformation
                              .TermsAcceptance
                          }
                        </TableCell>
                        <TableCell width="10%" align="justify"></TableCell>
                        <TableCell width="20%" align="left">
                          Company Website
                        </TableCell>
                        <TableCell
                          width="25%"
                          align="left"
                          style={{ fontWeight: 400 }}
                        >
                          {
                            props.viewVendorData.Data.BasicInformation
                              .CompanyWebsite
                          }
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {props.viewVendorData.Data.lstBankAccountInformation.length >
                  0 && (
                  <>
                    <p className={classes.DetailsTitle}>Bank Account Details</p>
                    <TableContainer className={classes.DetailTableContainer}>
                      <Table
                        className={classes.NormalInnerTable}
                        sx={{ minWidth: 650 }}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Account Holder Name</TableCell>
                            <TableCell>Account No</TableCell>
                            <TableCell
                              style={{
                                display:
                                  props?.regionCode === 'aed'
                                    ? 'block'
                                    : 'none',
                              }}
                            >
                              IBAN No
                            </TableCell>
                            <TableCell>Country Name</TableCell>
                            <TableCell>Currency Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Bank Name</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {props.viewVendorData.Data.lstBankAccountInformation.map(
                            (item, index) => {
                              return (
                                <TableRow>
                                  <TableCell>{item.BeneficiaryName}</TableCell>
                                  <TableCell>
                                    <ToggleAccountNo
                                      hashedAccountNo={item.HashAccountNo}
                                      accountNo={decryptAES(
                                        item.BankAccountNumber
                                      )}
                                      classes={classesFormUseStyles}
                                    />
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      display:
                                        props?.regionCode === 'aed'
                                          ? 'block'
                                          : 'none',
                                    }}
                                  >
                                    {item.HashIbanNo}
                                  </TableCell>
                                  <TableCell>
                                    {item.PayableCountryName}
                                  </TableCell>
                                  <TableCell>{item.CurrencyName}</TableCell>
                                  <TableCell>{item.Viewstatus}</TableCell>
                                  <TableCell>{item.BankName}</TableCell>
                                  {htmlActionExtractor(
                                    item.Action?.includes(
                                      'reject settlement bank details'
                                    )
                                  ) && (
                                    <TableCell>
                                      <Tooltip title="Reject Settlement Bank Details ">
                                        <IconButton
                                          size="small"
                                          onClick={() =>
                                            rejectSettlementBank(
                                              item.ContactAccountId
                                            )
                                          }
                                          aria-label="delete"
                                        >
                                          <CloseRounded />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>
                                  )}
                                </TableRow>
                              );
                            }
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </DialogContent>
              <DialogActions>
                {!props.viewOnly ? (
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={approveAction}>
                      Approve
                    </Button>

                    <Button variant="outlined" onClick={rejectAction}>
                      Reject
                    </Button>
                    <Button variant="text" onClick={handleClose}>
                      Back
                    </Button>
                  </Stack>
                ) : (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClose}
                  >
                    Back
                  </Button>
                )}
              </DialogActions>
            </>
          )}
      </Dialog>
    </React.Fragment>
  );
}

ViewVendorInformation.propTypes = {};

const mapStateToProps = (state) => ({
  viewVendorDialog: state.manageContacts.viewVendorDialog,
  viewVendorData: state.manageContacts.viewVendorData,
  viewOnly: state.manageContacts.viewOnly,
  requestType: state.manageContacts.requestType,
  regionCode: state.admin.regionCode,
});

export default connect(mapStateToProps, {
  closeViewVendorDialogFn,
  manageVendor,
  openRemarkPrompt,
  closeRemarkPrompt,
  deleteBankAccount,
})(ViewVendorInformation);
