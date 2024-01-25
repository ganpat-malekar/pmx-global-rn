import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Dialog,
  Typography,
  Stack,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';

import { useSimpleReactValidator } from '@paymate/common/helpers';

import alertImage from '@paymate/common/assets/alert.svg';

import { useStyles } from '@paymate/common/style';

function RemarkPrompt({
  title,
  promptText,
  isPromptOpen,
  closePrompt,
  apiData,
  submitToApi,
  ...props
}) {
  const classes = useStyles();
  const [remark, setRemark] = useState(null);
  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
  });

  useEffect(() => {
    return () => {
      setRemark(null);
      forceUpdate();
      validator.visibleFields = [];
      validator.purgeFields();
    };
  }, []);

  useEffect(() => {
    if (!isPromptOpen) {
      setRemark(null);
      forceUpdate();
      validator.visibleFields = [];
      validator.purgeFields();
      validator.hideMessages();
    }
  }, [isPromptOpen]);

  const handleRemark = (event) => {
    setRemark(event.target.value);
  };

  const handleAction = () => {
    if (validator.allValid()) {
      apiData.Remarks = remark;
      submitToApi(apiData);
    } else {
      validator.showMessages();
    }
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

        <div style={{ flex: '0 0 82%' }}>
          <DialogTitle className={classes.ViewDialogTitle}>
            <Typography variant="h6">{title}</Typography>
          </DialogTitle>
          <DialogContent>
            {promptText && (
              <Typography variant="body2" id="alert-dialog-description">
                {`Are you sure you want to ${promptText?.toLowerCase()}`}
              </Typography>
            )}
            <div>
              <TextField
                required
                margin="normal"
                fullWidth
                color="secondary"
                id="remark"
                name="remark"
                label="Enter your remark here"
                multiline
                rows={3}
                value={remark}
                onChange={handleRemark}
                helperText={validator.message('remark', remark, 'required')}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleAction} autoFocus>
                Submit
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

RemarkPrompt.propTypes = {};

const mapStateToProps = (state) => {
  return {
    ...state.remarkPrompt,
  };
};

export default connect(mapStateToProps, {})(RemarkPrompt);
