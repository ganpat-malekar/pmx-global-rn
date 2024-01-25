import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Box, Tabs, Tab, Typography } from '@mui/material';

import AddressProof from './UploadDocumentsFormComponents/AddressProof';
import BankAccountDetails from './UploadDocumentsFormComponents/BankAccountDetails';
import BusinessProof from './UploadDocumentsFormComponents/BusinessProof';
import CompanyType from './UploadDocumentsFormComponents/CompanyType';
import ShareHolderProof from './UploadDocumentsFormComponents/ShareHolderProof';

import TabPanel, { a11yProps } from '../TabPanel';
import { useHistory } from 'react-router-dom';
import { formUseStyles } from '../../Theme';

import {
  getKYCDocumentDetails,
  getKYCDetailsByPrefix,
} from '../../store/actions/BusinessManagement/ManageBusinesses/KYC/action_CommonKYC';

function KYC(props) {
  const classes = formUseStyles();
  const [value, setValue] = React.useState(0);
  const [cridValue, setCridValue] = React.useState('');
  const history = useHistory();
  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (props.crid) {
      setCridValue(props.crid);
      props.getKYCDocumentDetails(props.crid);
      props.getKYCDetailsByPrefix('SDI', props.crid);
      props.getKYCDetailsByPrefix('SDC', props.crid);
    } else {
      if (props.tokenData.UserType !== 'Admin') {
        // #CridChanges
        setCridValue(props.tokenData.Crids);
        props.getKYCDocumentDetails(props.tokenData.Crids);
        props.getKYCDetailsByPrefix('SDI', props.tokenData.Crids);
        props.getKYCDetailsByPrefix('SDC', props.tokenData.Crids);
      }
    }
  }, [props.tokenData, props.crid]);

  useEffect(() => {
    if (props.AllData === null) {
      setValue(0);
    } else {
      const temp_array = [
        props.AllData.CompanyTypeId !== null ? 'Uploaded' : '',
        props.AllData.BusinessProof.Status,
        props.AllData.AddressProof.Status,
        props.AllData.BankAccountProof.Status,
        props.AllData.ShareHolder.Status,
      ];

      let indexOfEmptyString = -1;

      for (let i = 0; i < temp_array.length; i++) {
        if (temp_array[i] === '') {
          indexOfEmptyString = i;
          break;
        }
      }

      if (indexOfEmptyString === -1 && shouldRedirect) {
        setShouldRedirect(false);
        history.push(
          props.fromPage === 'AddBusiness'
            ? '/App/ManageBusiness'
            : '/App/ManageContacts'
        );
      } else {
        setValue(indexOfEmptyString === -1 ? 4 : indexOfEmptyString);
      }
    }
  }, [props.AllData]);

  return (
    <div>
      <div className={classes.MasterDetailsDiv}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="Make a payment tabs"
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab label="Company Type" {...a11yProps(0)} />
              <Tab
                disabled={
                  props.AllData?.BusinessProof?.Isfilled === 'filled'
                    ? false
                    : props.AllData?.CompanyTypeId === null
                }
                label="Business Proof"
                {...a11yProps(1)}
              />
              <Tab
                disabled={
                  props.AllData?.AddressProof?.Isfilled === 'filled'
                    ? false
                    : props.AllData?.BusinessProof?.Status === ''
                }
                label="Address Proof"
                {...a11yProps(2)}
              />
              <Tab
                disabled={
                  props.AllData?.BankAccountProof?.Isfilled === 'filled'
                    ? false
                    : props.AllData?.AddressProof?.Status === ''
                }
                label="Bank Account Details"
                {...a11yProps(3)}
              />
              <Tab
                disabled={
                  props.AllData?.ShareHolder?.Isfilled === 'filled'
                    ? false
                    : props.AllData?.BankAccountProof?.Status === ''
                }
                label="Shareholder Proof"
                {...a11yProps(4)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <CompanyType
              KycStatus={props.KycStatus}
              Crid={cridValue}
              fromPage={props.fromPage}
              redirect={setShouldRedirect}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BusinessProof
              KycStatus={props.KycStatus}
              Crid={cridValue}
              changeTab={handleChange}
              fromPage={props.fromPage}
              redirect={setShouldRedirect}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AddressProof
              KycStatus={props.KycStatus}
              Crid={cridValue}
              changeTab={handleChange}
              fromPage={props.fromPage}
              redirect={setShouldRedirect}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <BankAccountDetails
              KycStatus={props.KycStatus}
              Crid={cridValue}
              changeTab={handleChange}
              fromPage={props.fromPage}
              redirect={setShouldRedirect}
            />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ShareHolderProof
              KycStatus={props.KycStatus}
              Crid={cridValue}
              fromPage={props.fromPage}
              changeTab={handleChange}
              redirect={setShouldRedirect}
            />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

KYC.propTypes = {};

const mapStateToProps = (state) => ({
  tokenData: state.admin.tokenData,
  KycStatus: state.businessKYC.KycStatus,
  AllData: state.businessKYC.AllData,
});

export default connect(mapStateToProps, {
  getKYCDocumentDetails,
  getKYCDetailsByPrefix,
})(KYC);
