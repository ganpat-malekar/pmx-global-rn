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
  Typography,
  Box,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TableHead,
  TableRow,
} from "@mui/material";

import { formUseStyles } from "../../Theme";

import { handleSampleFile } from "../../store/actions/UIActions";

function ViewSampleFilesPopup({ isOpen, tableData, ...props }) {
  const classes = formUseStyles();

  const handleClosePopup = () => {
    props.handleSampleFile("");
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={props.viewSamplePopup === "bulk_upload_contacts"}
      onClose={handleClosePopup}
      className={classes.ViewPageDialog}
    >
      <>
        <DialogTitle className={classes.ViewDialogTitle}>
          <Typography variant="h5">Sample Upload Template</Typography>
          <IconButton
            size="small"
            onClick={handleClosePopup}
            aria-label="delete"
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 3 }}>
            <Typography>Sample format for contact upload</Typography>

            <Box sx={{ py: 3 }}>
              <TableContainer>
                <Table
                  size="small"
                  border="1"
                  sx={{ border: "1px solid #e0e0e0" }}
                  aria-label="simple table"
                >
                  <TableHead sx={{ border: "1px solid #e0e0e0" }}>
                    <TableRow>
                      {bulk_upload_contacts_data.table_data_headers.map(
                        (row) => (
                          <TableCell align="left">{row}</TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: "#f1f1f1" }}>
                    <TableRow>
                      {bulk_upload_contacts_data.table_data.map((row) => (
                        <TableCell>{row}</TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 500 }}>Note:</Typography>
              <ol>
                <li>
                  <Typography variant="subtitle2">
                    ContactType, CompanyName, ContactName and EmailAddress are
                    mandatory fields
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">
                    ContactType will only accept the following values{" "}
                    <b>Buyer, Supplier, Both</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">
                    ReferenceCode is unique and optional field
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">
                    CompanyName should not exceed <b>100 characters</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">
                    ReferenceCode should not exceed <b>30 characters</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">
                    ContactName should not exceed <b>50 characters</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">
                    EmailAddress should not exceed <b>150 characters</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">
                    MobileNumber should not exceed <b>9 characters</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">
                    CurrencyCode should not exceed <b>3 characters</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">
                    IBAN should not exceed <b>50 characters</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">
                    To add multiple IBAN for same Contact, add multiple Contacts
                    with different ReferenceCode
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">
                    Add up to 6 email addresses separated by comma. These email
                    addresses will be notified when you send a collection
                    request and when the payment is settled to this Contact.
                  </Typography>
                </li>
              </ol>
            </Box>
          </Box>
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

ViewSampleFilesPopup.propTypes = {};

const mapStateToProps = (state) => ({
  viewSamplePopup: state.ui.viewSamplePopup,
});

export default connect(mapStateToProps, { handleSampleFile })(
  ViewSampleFilesPopup
);

const bulk_upload_contacts_data = {
  table_data_headers: [
    "ContactType",
    "CompanyName",
    "ReferenceCode",
    "ContactName",
    "Designation",
    "EmailAddress",
    "ISDCode",
    "MobileNumber",
    "CurrencyCode",
    "IBAN",
    "BranchAddress",
    "Notification Emails",
  ],
  table_data: [
    "Both",
    "Watson Locks",
    "V001",
    "John Watson",
    "Founder",
    "surelock@example.com",
    971,
    546367898,
    "AED",
    "AE010052345671234567898",
    "United Arab Emirates",
    "notification@example.com, notification1@example.com",
  ],
};
