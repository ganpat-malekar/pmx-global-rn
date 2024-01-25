import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  Dialog,
  Typography,
  Stack,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useStyles } from "../../Theme";
import alertImage from "../../Assets/images/alert.svg";

export default function ViewSamplePopup({
  title,
  promptText,
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
    <div>
      <Dialog
        PaperProps={{ square: true }}
        className={classes.NewDeleteDialog}
        open={isPromptOpen ?? false}
        onClose={closePrompt}
        fullWidth={true}
        maxWidth="lg"
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
                {`Are you sure you want to ${promptText?.toLowerCase()}`}
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
    </div>
  );
}

ViewSamplePopup.propTypes = {};
