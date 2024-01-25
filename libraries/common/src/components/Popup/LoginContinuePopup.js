import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button, Dialog, DialogContent, Countdown } from '@mui/material';

import { formUseStyles } from '@paymate/common/style';

import { hideLoginPopup } from '../../store/actions/UIActions';
import { continueSignIn } from '../../store/actions/adminActions';

function LoginContinuePopup(props) {
  const classes = formUseStyles();
  const [redir, setRedir] = useState(false);

  const handleContinue = () => {
    props.hideLoginPopup();
    props.continueSignIn(props.data);
  };

  const handleCancel = () => {
    props.hideLoginPopup();
    setRedir(true);
  };

  if (redir) {
    setRedir(false);
    return <Navigate to="/" />;
  }

  return (
    <Dialog
      className={classes.DeleteBPSPDialog}
      open={props.displayPopup ?? false}
      onClose={() => {
        props.hideLoginPopup();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      // disableBackdropClick={true}
      disableEscapeKeyDown={true}
    >
      <DialogContent>
        <div>
          <h4>
            <ErrorOutlineIcon /> Login warning
          </h4>
          <p>
            {/* Your session will expire in{" "} */}
            {/* <Countdown
                date={
                  Date.now() + moment(props.logoutTimer).diff(moment().format())
                }
              /> */}
            {props.message + ' Do you want to continue?'}
          </p>
        </div>
        <div align="right">
          <Button
            style={{ marginRight: '1%' }}
            variant="contained"
            color="primary"
            onClick={handleContinue}
          >
            Continue
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCancel}
            autoFocus
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

LoginContinuePopup.propTypes = {};

const mapStateToProps = (state) => ({
  ip: state.admin.userIpAddress,
  displayPopup: state.ui.displayLoginContinuePopup,
  message: state.ui.loginContinuePopupMessage,
});

export default connect(mapStateToProps, {
  hideLoginPopup,
  continueSignIn,
})(LoginContinuePopup);
