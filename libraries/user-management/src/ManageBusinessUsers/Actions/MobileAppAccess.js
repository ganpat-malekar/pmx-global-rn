import { useState } from 'react';
import { connect } from 'react-redux';

import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import alertImage from '@paymate/common/assets/alert.svg';

import { useStyles } from '@paymate/common/style';

import { manageMobileUserPermission } from '@paymate/common/store/actions';

function MobileAppAccess({ isPromptOpen, closePrompt, UserId, ...props }) {
  const classes = useStyles();
  const [allowAccess, setAllowAccess] = useState(false);

  const handleCheckbox = () => (event) => {
    setAllowAccess(event.target.checked);
  };

  const handleSubmit = () => {
    // console.log(UserId, allowAccess);
    props.manageMobileUserPermission({
      UserId: UserId,
      AllowAccess: allowAccess,
    });
  };

  return (
    <div>
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
              <Typography variant="h6">Mobile App Permission</Typography>
            </DialogTitle>
            <DialogContent>
              <div>
                <Grid
                  item
                  container
                  lg={12}
                  md={12}
                  xs={12}
                  style={{ marginBottom: '1rem' }}
                >
                  <FormControlLabel
                    label="Allow Access"
                    control={
                      <Checkbox
                        color="secondary"
                        onClick={handleCheckbox('allowAccess')}
                      />
                    }
                  />
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleSubmit} autoFocus>
                  Submit
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={closePrompt}
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

MobileAppAccess.propTypes = {};

const mapStateToProps = (state) => {
  return {
    ...state.mobileAccessPrompt,
  };
};

export default connect(mapStateToProps, {
  manageMobileUserPermission,
})(MobileAppAccess);
