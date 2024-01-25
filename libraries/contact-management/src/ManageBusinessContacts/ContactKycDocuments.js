import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Box, Tabs, Tab, Typography } from '@mui/material';

// import { KYC, encryptAES, formUseStyles } from "common";
import { formUseStyles } from '@paymate/common/style';
import { encryptAES } from '@paymate/common/helpera';

function ContactKycDocuments(props) {
  const classes = formUseStyles();

  const Crid = props.match.params.id;

  return (
    <div>
      <div className={classes.TopBar}>
        <div>
          <Typography variant="h5">Document Configuration</Typography>
          <p className={classes.NoteText}>
            Note: Payment made between 5:00PM to 07:00PM will settle next day.{' '}
            {/* FIXME: Show on know more popover - "The collection request will let you send the payment collection request to your customers, from whom you need to receive money. They will get notified upon request sent."  */}
            <Link>KNOW MORE</Link>
          </p>
        </div>
      </div>
      <KYC crid={Crid} fromPage={'AddContact'} />
    </div>
  );
}

ContactKycDocuments.propTypes = {};

const mapStateToProps = (state) => ({
  tokenData: state.admin.tokenData,
});

export default connect(mapStateToProps, {})(ContactKycDocuments);
