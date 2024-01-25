import { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  useStyles,
  closeRemarkPrompt,
  openRemarkPrompt,
  fetchBusinessDetails,
  RemarkPrompt,
  updateMinimumCharge,
} from "common";

function ApproveRejectMinimumCharges(props) {
  const classes = useStyles();
  const params = props.match.params;
  const [buttons, setButtons] = useState(true);

  useEffect(() => {
    props.fetchBusinessDetails({
      CompanyID: params.prakriya,
    });
  }, [params]);

  const handleOpenRemarkPrompt = (Action, Status) => () => {
    const apiData = {
      CompanyID: params.prakriya,
      UserEmail: params.email,
      Status, // fixed, 1: Approve, 2: Reject
    };
    const payload = {
      title: Action,
      isPromptOpen: true,
      closePrompt: props.closeRemarkPrompt,
      apiData: { ...apiData },
      submitToApi: (x) => props.updateMinimumCharge(x, setButtons),
    };
    props.openRemarkPrompt(payload);
  };

  return (
    <div style={{ padding: "24px" }}>
      <RemarkPrompt />
      <div
        className={classes.ViewDialogTitle}
        style={{ marginBottom: "24px", marginTop: "24px" }}
      >
        <Typography variant="h5">Business Information </Typography>
      </div>
      <div>
        {/* Business Information Section */}
        <p className={classes.DetailsTitle}>Business Information</p>
        <TableContainer className={classes.DetailTableContainer}>
          <Table
            className={classes.NormalTable}
            sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableBody>
              <TableRow>
                <TableCell width="20%" align="left">
                  Business Name
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      ?.CompanyName
                  }
                </TableCell>
                <TableCell width="10%" align="justify"></TableCell>
                <TableCell width="20%" align="left">
                  XpressId
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {props.businessDetailsList?.["Business Info"]?.[0]?.XpressId}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="20%" align="left">
                  Contact Name
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      ?.ContactName
                  }
                </TableCell>
                <TableCell width="10%" align="justify"></TableCell>
                <TableCell width="20%" align="left">
                  Designation
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      ?.ContactDesignation
                  }
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="20%" align="left">
                  Email Address
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      ?.CompanyEmailId
                  }
                </TableCell>
                <TableCell width="10%" align="justify"></TableCell>
                <TableCell width="20%" align="left">
                  Mobile Number
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {props.businessDetailsList?.["Business Info"]?.[0].IsdCode +
                    "-" +
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .CompanyMobileNo}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="20%" align="left">
                  Business Category
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      ?.CompanyCategory
                  }
                </TableCell>
                <TableCell width="10%" align="justify"></TableCell>
                <TableCell width="20%" align="left">
                  Business Sub-Category
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      ?.CompanySubCategory
                  }
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="20%" align="left">
                  Business Type
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .CompanyNature
                  }
                </TableCell>
                <TableCell width="10%" align="justify"></TableCell>
                <TableCell width="20%" align="left">
                  Date of Incorporation
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .DateOfIncorporation
                  }
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="20%" align="left">
                  Registration Date
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .CompanyRegistrationDate
                  }
                </TableCell>
                <TableCell width="10%" align="justify"></TableCell>
                <TableCell width="20%" align="left">
                  Term Acceptance Date
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .TermAcceptancedate
                  }
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="20%" align="left">
                  Country
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {props.businessDetailsList?.["Business Info"]?.[0].Country}
                </TableCell>
                <TableCell width="10%" align="justify"></TableCell>
                <TableCell width="20%" align="left">
                  Domain(s)
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {props.businessDetailsList?.["Business Info"]?.[0].DomainName}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Business Subscription Section */}
        <p className={classes.DetailsTitle}>Business Subscription Details</p>
        <TableContainer className={classes.DetailTableContainer}>
          <Table
            className={classes.NormalTable}
            sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableBody>
              <TableRow>
                <TableCell width="20%" align="left">
                  Subscription Name
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .Configuration.SubscriptionBusinessInfo.SubscriptionName
                  }
                </TableCell>
                <TableCell width="10%" align="justify"></TableCell>
                <TableCell width="20%" align="left">
                  Subscription Period
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .Configuration.SubscriptionBusinessInfo.SubscriptionPeriod
                  }
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="20%" align="left">
                  Subscription Charges
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {props.businessDetailsList?.[
                    "Business Info"
                  ]?.[0].Configuration.SubscriptionBusinessInfo.SubscriptionCharges.toFixed(
                    1
                  )}
                </TableCell>
                <TableCell width="10%" align="justify"></TableCell>
                <TableCell width="20%" align="left">
                  Setup Fees
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {props.businessDetailsList?.[
                    "Business Info"
                  ]?.[0].Configuration.SubscriptionBusinessInfo.SetupFees.toFixed(
                    1
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="20%" align="left">
                  Transaction Limit
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .Configuration.SubscriptionBusinessInfo.TransactionLimit
                  }
                </TableCell>
                <TableCell width="10%" align="justify"></TableCell>
                <TableCell width="20%" align="left">
                  Transaction Count
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .Configuration.SubscriptionBusinessInfo.TransactionCount
                  }
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="20%" align="left">
                  Total Volume
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .Configuration.SubscriptionBusinessInfo.TotalVolume
                  }
                </TableCell>
                <TableCell width="10%" align="justify"></TableCell>
                <TableCell width="20%" align="left">
                  Status
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .Configuration.SubscriptionBusinessInfo.StatusCode
                  }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Vendor Subscription Section */}
        <p className={classes.DetailsTitle}>Vendor Subscription Details</p>
        <TableContainer className={classes.DetailTableContainer}>
          <Table
            className={classes.NormalTable}
            sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableBody>
              <TableRow>
                <TableCell width="20%" align="left">
                  Subscription Name
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .Configuration.SubscriptionVendorInfo.SubscriptionName
                  }
                </TableCell>
                <TableCell width="10%" align="justify"></TableCell>
                <TableCell width="20%" align="left">
                  Subscription For
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .Configuration.SubscriptionVendorInfo.SubscriptionCategory
                  }
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="20%" align="left">
                  Subscription Charges
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {props.businessDetailsList?.[
                    "Business Info"
                  ]?.[0].Configuration.SubscriptionVendorInfo.SubscriptionCharges.toFixed(
                    1
                  )}
                </TableCell>
                <TableCell width="10%" align="justify"></TableCell>
                <TableCell width="20%" align="left">
                  Max Contacts
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .Configuration.SubscriptionVendorInfo.NoOfQuantity
                  }
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="20%" align="left">
                  Status
                </TableCell>
                <TableCell width="25%" align="left" style={{ fontWeight: 400 }}>
                  {
                    props.businessDetailsList?.["Business Info"]?.[0]
                      .Configuration.SubscriptionVendorInfo.StatusCode
                  }
                </TableCell>
                <TableCell width="10%" align="justify"></TableCell>
                <TableCell width="20%" align="left"></TableCell>
                <TableCell
                  width="25%"
                  align="left"
                  style={{ fontWeight: 400 }}
                ></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Transaction Charges Section */}
        <p className={classes.DetailsTitle}>Transaction Charges Details</p>
        <TableContainer className={classes.DetailTableContainer}>
          {/* Send Money */}
          {props.businessDetailsList?.["Business Info"]?.[0].Configuration
            .TransactionCharges.SendMoney.length > 0 ? (
            <>
              <p className={classes.DetailsTitle2}>Send Money</p>
              <Table
                className={classes.NormalInnerTable}
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Gateway Name</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Assigned Rates</TableCell>
                    <TableCell>Minimum Charges</TableCell>
                    <TableCell>Commission Type</TableCell>
                    <TableCell>Payment Mode</TableCell>
                    <TableCell>Issuing Bank</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.businessDetailsList?.[
                    "Business Info"
                  ]?.[0].Configuration.TransactionCharges.SendMoney.map(
                    (item, index) => {
                      return (
                        <TableRow>
                          <TableCell>{item.GatewayName}</TableCell>
                          <TableCell>{item.CurrencySymbol}</TableCell>
                          <TableCell>{item.AcqurerRate}</TableCell>
                          {/* FIXME: check if the above is the correct node */}
                          <TableCell>{item.MinimumCharge}</TableCell>
                          <TableCell>{item.CommisionType}</TableCell>
                          <TableCell>{item.PaymentModeCode}</TableCell>
                          <TableCell>{item.IssuerName}</TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </>
          ) : (
            <></>
          )}
          {/* Receive Money */}
          {props.businessDetailsList?.["Business Info"]?.[0].Configuration
            .TransactionCharges.ReceiveMoney.length > 0 ? (
            <>
              <p className={classes.DetailsTitle2}>Receive Money</p>
              <Table
                className={classes.NormalInnerTable}
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Gateway Name</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Assigned Rates</TableCell>
                    <TableCell>Minimum Charges</TableCell>
                    <TableCell>Commission Type</TableCell>
                    <TableCell>Payment Mode</TableCell>
                    <TableCell>Issuing Bank</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.businessDetailsList?.[
                    "Business Info"
                  ]?.[0].Configuration.TransactionCharges.ReceiveMoney.map(
                    (item, index) => {
                      return (
                        <TableRow>
                          <TableCell>{item.GatewayName}</TableCell>
                          <TableCell>{item.CurrencySymbol}</TableCell>
                          <TableCell>{item.AcqurerRate}</TableCell>
                          {/* FIXME: check if the above is the correct node */}
                          <TableCell>{item.MinimumCharge}</TableCell>
                          <TableCell>{item.CommisionType}</TableCell>
                          <TableCell>{item.PaymentModeCode}</TableCell>
                          <TableCell>{item.IssuerName}</TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </>
          ) : (
            <></>
          )}

          {/* Tax Money */}
          {props.businessDetailsList?.["Business Info"]?.[0].Configuration
            .TransactionCharges.TaxMoney.length > 0 ? (
            <>
              <p className={classes.DetailsTitle2}>Tax Payment Money</p>
              <Table
                className={classes.NormalInnerTable}
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Gateway Name</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Assigned Rates</TableCell>
                    <TableCell>Minimum Charges</TableCell>
                    <TableCell>Commission Type</TableCell>
                    <TableCell>Payment Mode</TableCell>
                    <TableCell>Issuing Bank</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.businessDetailsList?.[
                    "Business Info"
                  ]?.[0].Configuration.TransactionCharges.TaxMoney.map(
                    (item, index) => {
                      return (
                        <TableRow>
                          <TableCell>{item.GatewayName}</TableCell>
                          <TableCell>{item.CurrencySymbol}</TableCell>
                          <TableCell>{item.AcqurerRate}</TableCell>
                          {/* FIXME: check if the above is the correct node */}
                          <TableCell>{item.MinimumCharge}</TableCell>
                          <TableCell>{item.CommisionType}</TableCell>
                          <TableCell>{item.PaymentModeCode}</TableCell>
                          <TableCell>{item.IssuerName}</TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </>
          ) : (
            <></>
          )}
        </TableContainer>
      </div>
      <div style={{ marginBottom: "24px" }}>
        {buttons && (
          <Stack direction="row" spacing={2}>
            <Button
              onClick={handleOpenRemarkPrompt("Approve Charges", 1)}
              variant="contained"
            >
              Approve
            </Button>
            <Button
              onClick={handleOpenRemarkPrompt("Reject Charges", 2)}
              variant="outlined"
              color="error"
            >
              Reject
            </Button>
          </Stack>
        )}
      </div>
    </div>
  );
}

ApproveRejectMinimumCharges.propTypes = {};

const mapStateToProps = (state) => ({
  businessDetailsList: state.approveRejectMinimumCharges.businessDetailsList,
});

export default connect(mapStateToProps, {
  openRemarkPrompt,
  closeRemarkPrompt,
  fetchBusinessDetails,
  updateMinimumCharge,
})(ApproveRejectMinimumCharges);
