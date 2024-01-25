import React, { Component, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { connect } from "react-redux";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Button, Dialog, DialogContent } from "@mui/material";

import moment from "moment";
import _ from "underscore";

import { formUseStyles } from "../../Theme";

import { hideSessionPopUp } from "../../store/actions/UIActions";
import {
  signIn,
  signOut,
  extendSession,
} from "../../store/actions/adminActions";

function SessionContinuePopup(props) {
  const classes = formUseStyles();

  const refreshUser = () => {
    props.hideSessionPopUp();
    props.extendSession();
  };

  return (
    <Dialog
      className={classes.DeleteBPSPDialog}
      open={props.displaySessionTimeOutPopUp ?? false}
      onClose={() => {
        props.hideSessionPopUp();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
    >
      <DialogContent>
        <div>
          <h4>
            <ErrorOutlineIcon /> Session Time-out Warning
          </h4>
          <p>
            Your session will expire in{" "}
            <Countdown
              date={
                Date.now() + moment(props.logoutTimer).diff(moment().format())
              }
              renderer={({ hours, minutes, seconds }) => (
                <span>
                  {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                </span>
              )}
            />
            . If you want to extend the session, please click on CONTINUE.
          </p>
        </div>
        <div align="right">
          <Button
            style={{ marginRight: "1%" }}
            variant="contained"
            color="primary"
            onClick={refreshUser}
          >
            Continue
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              props.hideSessionPopUp();
              props.signOut();
            }}
            autoFocus
          >
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

SessionContinuePopup.propTypes = {};

const mapStateToProps = (state) => ({
  displaySessionTimeOutPopUp: state.ui.displaySessionTimeOutPopUp,
});

export default connect(mapStateToProps, {
  hideSessionPopUp,
  signIn,
  signOut,
  extendSession,
})(SessionContinuePopup);
