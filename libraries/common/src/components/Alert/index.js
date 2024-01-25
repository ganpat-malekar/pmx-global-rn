import React from 'react';
import { connect } from 'react-redux';

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { hideAlert } from '@paymate/common/store/actions';

const AlertSnack = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Alert(props) {
  if (props.showAlert) {
    setTimeout(function () {
      props.hideAlert();
    }, 5000);
  }

  return (
    <Snackbar
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      message="I love snacks"
      open={props.showAlert ?? false}
    >
      <AlertSnack
        severity={
          props.alertType === 'success'
            ? 'success'
            : props.alertType === 'danger'
            ? 'error'
            : props.alertType === 'warning'
            ? 'warning'
            : props.alertType === 'info'
            ? 'info'
            : 'info'
        }
        sx={{ width: '100%' }}
      >
        {props.alertMessage}
      </AlertSnack>
    </Snackbar>
  );
}

Alert.propTypes = {};

const mapStateToProps = (state) => ({
  showAlert: state.ui.showAlert,
  alertMessage: state.ui.alertMessage,
  alertType: state.ui.alertType,
});

export default connect(mapStateToProps, { hideAlert })(Alert);
