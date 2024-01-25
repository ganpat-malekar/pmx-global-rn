import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';

import _ from 'underscore';

import BankAccountDetails from './ContactFormComponents/BankAccountDetails';
import BasicInformation from './ContactFormComponents/BasicInformation';
import KYCDetails from './ContactFormComponents/KYCDetails';

import { formUseStyles } from '@paymate/common/style';

import {
  fetchAndStoreVendorInformation,
  flushVendorInformation,
} from '@paymate/common/store/actions';

const ADD_CONTACT_KNOW_MORE_TEXT = `Contacts page lets you add your Vendors and Customers as
 Contacts (from whom you need to make/receive payments). 
 Adding a Contact right away will ease the future transaction process.
`;

function AddContact(props) {
  const classes = formUseStyles();
  const [accordian1, setAccordian1] = useState(true);
  const [accordian2, setAccordian2] = useState(false);
  const [accordian3, setAccordian3] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [isBankAccTabDisabled, setIsBankAccTabDisabled] = useState(true);
  const [isKYCTabDisabled, setIsKYCTabDisabled] = useState(true);
  const [isKYCTabVisible, setIsKYCTabVisible] = useState(true);

  const { id: ClientId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // check if CompanyId present in url
  // call Fetch all data api and put in reducer
  // props.location.search

  useEffect(() => {
    if (ClientId && location.pathname.includes('/App/EditContact')) {
      setIsNew(false);
      props.fetchAndStoreVendorInformation(ClientId);
    } else {
      // need to clear, incase of comming from edit form to a new form
      props.flushVendorInformation();
    }
  }, [ClientId]);

  // Tab progression logic
  useEffect(() => {
    if (!_.isEmpty(props.VendorInfo)) {
      if (ClientId && location.pathname.includes('/App/EditContact')) {
        setIsBankAccTabDisabled(false);
        setIsKYCTabDisabled(false);
      }
    }
  }, [props.VendorInfo]);

  const handleAccordian1 = () => {
    setAccordian1(!accordian1);
  };
  const handleAccordian2 = () => {
    setAccordian2(!accordian2);
  };
  const handleAccordian3 = () => {
    setAccordian3(!accordian3);
  };

  const shouldRender = () => {
    if (ClientId && location.pathname.includes('/App/EditContact')) {
      if (
        props.VendorInfo?.BasicInformation?.TypeOfContact?.toLowerCase() ===
        'buyer'
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  return (
    <div>
      <div className={classes.TopBar}>
        <div>
          <Typography variant="h5">Vendor Configuration Details</Typography>
        </div>
        <div>
          <p className={classes.NoteText}>
            <Tooltip
              TransitionComponent={Zoom}
              title={ADD_CONTACT_KNOW_MORE_TEXT}
            >
              <Link>KNOW MORE</Link>
            </Tooltip>
          </p>
        </div>
      </div>
      <div className={classes.MasterDetailsDiv}>
        <Accordion
          id={'business-information'}
          onChange={handleAccordian1}
          expanded={accordian1}
          className={classes.NewAddFormAccordian}
        >
          <AccordionSummary
            aria-controls="business-information"
            id="business-information-header"
          >
            <Typography className={classes.heading}>
              Basic Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BasicInformation
              isNew={isNew}
              {...{
                setAccordian1,
                setAccordian2,
                setAccordian3,
                setIsBankAccTabDisabled,
                setIsKYCTabVisible,
              }}
            />
          </AccordionDetails>
        </Accordion>
        {shouldRender() && (
          <>
            <Accordion
              id={'transaction-currency'}
              onChange={handleAccordian2}
              expanded={accordian2}
              className={classes.NewAddFormAccordian}
              disabled={isBankAccTabDisabled}
            >
              <AccordionSummary
                aria-controls="transaction-currency"
                id="transaction-currency-header"
              >
                <Typography className={classes.heading}>
                  Bank Account Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <BankAccountDetails
                  isNew={isNew}
                  {...{
                    setAccordian1,
                    setAccordian2,
                    setAccordian3,
                    setIsKYCTabDisabled,
                    isKYCTabVisible,
                  }}
                />
              </AccordionDetails>
            </Accordion>

            {isKYCTabVisible && (
              <Accordion
                id={'business-subscription'}
                onChange={handleAccordian3}
                expanded={accordian3}
                className={classes.NewAddFormAccordian}
                disabled={isKYCTabDisabled}
              >
                <AccordionSummary
                  aria-controls="business-subscription"
                  id="business-subscription-header"
                >
                  <Typography className={classes.heading}>
                    KYC Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <KYCDetails isNew={isNew} />
                </AccordionDetails>
              </Accordion>
            )}
          </>
        )}
      </div>
    </div>
  );
}

AddContact.propTypes = {};

const mapStateToProps = (state) => ({
  VendorInfo: state.addContact.VendorInfo,
});

export default connect(mapStateToProps, {
  fetchAndStoreVendorInformation,
  flushVendorInformation,
})(AddContact);
