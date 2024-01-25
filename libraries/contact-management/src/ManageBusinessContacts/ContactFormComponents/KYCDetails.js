import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  FormGroup,
  FormHelperText,
  Button,
} from '@mui/material';
import { withStyles } from '@mui/material/styles';

import { formUseStyles } from '@paymate/common/style';

import {
  submitKYCDocumentUploadedBy,
  showAlert,
  sendVendorAppovalMailToApprover,
} from '@paymate/common/store/actions';

function KYCDetails(props) {
  // States
  const classes = formUseStyles();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('1');

  // Effects
  useEffect(() => {
    // Loading data for Edit
    if (!props.isNew) {
      setSelectedValue(props.UploadedBy?.toString());
    }
  }, [props.UploadedBy]);

  // Handle functions
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (props.ClientId) {
      const success1 = await props.submitKYCDocumentUploadedBy(
        props.ClientId,
        +selectedValue
      );

      if (success1) {
        const success2 = await props.sendVendorAppovalMailToApprover({
          ClientId: props.ClientId,
        });

        if (success2 && selectedValue === '1') navigate('/App/ManageContacts');
        if (success2 && selectedValue === '2')
          navigate('/App/KycDocument/UploadDocuments/' + props.Crid);
      }
    } else {
      console.log('Error ClientId: ', props.ClientId);
    }
  };

  return (
    <div className={classes.FormPanel}>
      <Grid container item lg={6} md={6} xs={12} spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Upload Documents</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Radio
                    checked={selectedValue === '1'}
                    onChange={handleChange}
                    value="1"
                    color="secondary"
                    name="by_vendor"
                    inputProps={{ 'aria-label': 'by vendor' }}
                  />
                }
                label="By Vendor"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={selectedValue === '2'}
                    onChange={handleChange}
                    value="2"
                    color="secondary"
                    name="by_business"
                    inputProps={{ 'aria-label': 'by business' }}
                  />
                }
                label="By Business"
              />
            </FormGroup>
            {/* <FormHelperText>Show error here</FormHelperText> */}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            style={{ marginRight: '1%' }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

KYCDetails.propTypes = {};

const mapStateToProps = (state) => ({
  ClientId: state.basicInfo.ClientId ?? state.addContact.VendorInfo?.ClientId,
  Crid: state.addContact.VendorInfo?.Crid,
  UploadedBy: state.addContact.VendorInfo?.UploadedBy,
});

export default connect(mapStateToProps, {
  submitKYCDocumentUploadedBy,
  showAlert,
  sendVendorAppovalMailToApprover,
})(KYCDetails);
