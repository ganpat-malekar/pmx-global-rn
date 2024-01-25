import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Dialog,
  Typography,
  Stack,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Button from '@mui/material/Button';

import alertImage from '@paymate/common/assets/alert.svg';

import { useStyles } from '@paymate/common/style';

function ConfirmPrompt({
  title,
  promptText,
  fullPromptText,
  isPromptOpen,
  closePrompt,
  apiData,
  submitToApi,
  ...props
}) {
  const classes = useStyles();

  const handleAction = () => {
    submitToApi(apiData);
  };
  return (
    <Dialog
      PaperProps={{ square: true }}
      className={classes.NewDeleteDialog}
      open={isPromptOpen ?? false}
      onClose={closePrompt}
      fullWidth={true}
      maxWidth="sm"
    >
      <div className="CustomDialogContainer-root">
        <div>
          <img alt="alert" src={alertImage} />
        </div>

        <div>
          <DialogTitle className={classes.ViewDialogTitle}>
            <Typography variant="h6">{title}</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" id="alert-dialog-description">
              {fullPromptText ||
                `Are you sure you want to ${
                  promptText?.toLowerCase() || 'do this?'
                }`}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleAction} autoFocus>
                Confirm
              </Button>
              <Button
                color="primary"
                /*variant="outlined"*/ onClick={closePrompt}
              >
                Cancel
              </Button>
            </Stack>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
}

ConfirmPrompt.propTypes = {};

const mapStateToProps = (state) => {
  return {
    ...state.confirmPrompt,
  };
};

export default connect(mapStateToProps, {})(ConfirmPrompt);
