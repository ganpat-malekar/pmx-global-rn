import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import EventIcon from '@mui/icons-material/Event';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import {
  Dialog,
  Typography,
  Stack,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Grid,
  FormControl,
} from '@mui/material';
import Button from '@mui/material/Button';

import moment from 'moment';
import _ from 'underscore';

import { useSimpleReactValidator } from '@paymate/common/helpers';
import { useStyles } from '@paymate/common/style';
import { encryptAES } from '@paymate/common/helpers';

import {
  closeBookAppointmentModal,
  getUserList,
} from '@paymate/common/store/actions';

import bookAppointmentImage from '@paymate/common/assets/bookappointment.svg';

function BookAppointmentModal(props) {
  const { isPromptOpen, apiData, submitToApi } = props.bookAppointmentModalData;
  const classes = useStyles();
  const [user, setUser] = useState('');
  const [appointmentDateTime, setAppointmentDateTime] = useState(null);
  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
  });

  useEffect(() => {
    if (isPromptOpen) {
      props.getUserList({
        DepartmentId: encryptAES('13'),
        RoleId: encryptAES('9'),
      });
    } else {
      setAppointmentDateTime(null);
      setUser('');
      validator.visibleFields = [];
      forceUpdate();
    }
  }, [isPromptOpen]);

  const handleSubmit = () => {
    if (validator.allValid()) {
      const payload = {
        ...apiData,
        AppointMentDate: moment(appointmentDateTime).format('DD MMMM YYYY'),
        AppointMentDateTime: moment(appointmentDateTime).format('hh:mm A'),
        KycuserId: user,
      };

      //   console.log(payload);
      submitToApi(payload);
    } else {
      validator.showMessages();
    }
  };

  return (
    <div>
      <Dialog
        PaperProps={{ square: true }}
        className={classes.NewDeleteDialog}
        open={isPromptOpen ?? false}
        onClose={props.closeBookAppointmentModal}
        fullWidth={true}
        maxWidth="sm"
      >
        <div className="CustomDialogContainer-root">
          <div>
            <img alt="alert" src={bookAppointmentImage} />
          </div>
          <div style={{ flex: '0 0 82%' }}>
            <DialogTitle className={classes.ViewDialogTitle}>
              <Typography variant="h6">{`Book an appointment`}</Typography>
            </DialogTitle>
            <DialogContent>
              <div>
                <Grid item container lg={12} md={12} xs={12} spacing={2}>
                  <Grid item lg={12} md={12} xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        id="user"
                        select
                        value={user}
                        label="Select User"
                        name="user"
                        variant="outlined"
                        margin="normal"
                        onChange={(event) => setUser(event.target.value)}
                      >
                        {!_.isEmpty(props.userList) &&
                        !_.isEmpty(props.userList.Data) ? (
                          props.userList.Data.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.MUserId}>
                                {item.ContactName}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <MenuItem disabled>No options</MenuItem>
                        )}
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          disablePast
                          label="Appointment Date"
                          inputFormat="dd MMMM yyyy - hh:mm a"
                          value={appointmentDateTime}
                          onChange={(date) => {
                            setAppointmentDateTime(date);
                          }}
                          renderInput={(params) => (
                            <TextField
                              required
                              id="appointmentDateTime"
                              name="appointmentDateTime"
                              color="secondary"
                              margin="normal"
                              size="normal"
                              {...params}
                              onBlur={() => {
                                validator.showMessageFor('appointmentDateTime');
                              }}
                              helperText={validator.message(
                                'appointmentDateTime',
                                appointmentDateTime,
                                'required'
                              )}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <EventIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleSubmit} autoFocus>
                  Book Appointment
                </Button>
                <Button
                  color="primary"
                  /*variant="outlined"*/ onClick={
                    props.closeBookAppointmentModal
                  }
                >
                  Close
                </Button>
              </Stack>
            </DialogActions>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

BookAppointmentModal.propTypes = {};

const mapStateToProps = (state) => ({
  bookAppointmentModalData: state.manageContacts.bookAppointmentModalData,
  userList: state.manageBusinessUser.userList,
});

export default connect(mapStateToProps, {
  getUserList,
  closeBookAppointmentModal,
})(BookAppointmentModal);
