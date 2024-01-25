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
  Stack,
  Skeleton,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Alert,
  AlertTitle,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import moment from "moment";
import _ from "underscore";

import { formUseStyles } from "../../Theme";

import { acceptTermsAndPolicies } from "../../store/actions/DashboardActions";

function PrivacyPolicy(props) {
  const classes = formUseStyles();
  const [loader, setLoader] = useState(true);
  const [html1, setHtml1] = useState(null);
  const [html2, setHtml2] = useState(null);

  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (props.termsAndPolicies?.length > 0) {
      if (props.termsAndPolicies.length === 2) {
        const dangerousHtml1 = props.termsAndPolicies[0].Terms
          ? { __html: props.termsAndPolicies[0].Terms }
          : null;
        const dangerousHtml2 = props.termsAndPolicies[1].Terms
          ? { __html: props.termsAndPolicies[1].Terms }
          : null;
        setHtml1(dangerousHtml1);
        setHtml2(dangerousHtml2);
      }

      if (props.termsAndPolicies.length === 1) {
        const dangerousHtml1 = null;
        const dangerousHtml2 = { __html: props.termsAndPolicies[0].Terms };
        setHtml1(dangerousHtml1);
        setHtml2(dangerousHtml2);
      }

      setLoader(false);
    }
  }, [props.termsAndPolicies]);

  const acceptRequest = (type) => {
    let data = {
      UserId: props.tokenData.UserId,
      TncId: type === "tnc" ? "2" : "1007",
      ServiceType: null,
      TNCType: type === "tnc" ? "tnc" : "Privacy",
      IsPrivacyPolicyPresent: null,
      TermsFor: 0,
    };
    props.acceptTermsAndPolicies(data);
  };

  return (
    <Dialog
      className={classes.PrivacyDailog}
      open={props.isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
      scroll="paper"
      disableEscapeKeyDown
    >
      <DialogContent id="content">
        {loader && (
          <Stack sx={{ my: 5 }} direction="column" spacing={3}>
            <Skeleton variant="rectangular" width={200} height={50} />
            <Skeleton variant="rectangular" width={700} height={150} />
            <Skeleton variant="rounded" width={700} height={150} />
          </Stack>
        )}

        <Alert sx={{ mb: 4 }} severity="info">
          <AlertTitle>Attention!</AlertTitle>
          We have made some updates to our <strong>Terms & Conditions</strong>.
          Request you to review and accept them
        </Alert>

        {html1 !== null && (
          <Accordion
            sx={{ mb: "16px" }}
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>PAYMATE TERMS AND CONDITIONS</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {!_.isEmpty(html1) && <div dangerouslySetInnerHTML={html1} />}

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked1}
                    onChange={(event) => {
                      setChecked1(event.target.checked);
                    }}
                  />
                }
                label="I have read and agreed to the Term and Conditions"
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  my: "24px",
                }}
              >
                <Button
                  disabled={!checked1}
                  onClick={() => {
                    acceptRequest("tnc");
                  }}
                  variant="contained"
                  size="large"
                >
                  Accept
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        )}

        {html2 !== null && (
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>PAYMATE PRIVACY POLICY</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {!_.isEmpty(html2) && <div dangerouslySetInnerHTML={html2} />}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked2}
                    onChange={(event) => {
                      setChecked2(event.target.checked);
                    }}
                  />
                }
                label="I have read and agreed to the Privacy Policy"
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  my: "24px",
                }}
              >
                <Button
                  disabled={!checked2}
                  onClick={() => acceptRequest("privacy")}
                  variant="contained"
                  size="large"
                >
                  Accept
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        )}
      </DialogContent>
    </Dialog>
  );
}

PrivacyPolicy.propTypes = {};

const mapStateToProps = (state) => ({
  termsAndPolicies: state.dashboard.termsAndPolicies,
  showTermsAndPolicies: state.dashboard.showTermsAndPolicies,
  tokenData: state.admin.tokenData,
});

export default connect(mapStateToProps, { acceptTermsAndPolicies })(
  PrivacyPolicy
);
