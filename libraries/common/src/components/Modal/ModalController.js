import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import PrivacyPolicy from "../Popup/PrivacyPolicy";
import RequestToConnect from "../Popup/RequestToConnect";

import { formUseStyles } from "../../Theme";

import { fetchBusinessInformationForView } from "../../store/actions/BusinessManagement/ManageBusinesses/action_ManageBusiness";

function ModalController(props) {
  const classes = formUseStyles();
  const location = useLocation();

  const [currentOpenModal, setCurrentOpenModal] = useState(0);

  useEffect(() => {
    if (location.pathname === "/App/Dashboard") {
      // For privacy policy modal
      if (!props.userData?.TermsAccepted) {
        handleOpen(1);
      }
      // For Request to connect modal
      else if (props.showConnectionRequests) {
        handleOpen(2);
      } else {
        handleClose();
      }
    }
  }, [props.userData, props.showConnectionRequests, currentOpenModal]);

  const handleOpen = (modalNumber) => {
    setTimeout(() => setCurrentOpenModal(modalNumber), 1500);
  };

  const handleClose = () => {
    setCurrentOpenModal(0);
  };

  return (
    <>
      <PrivacyPolicy
        isOpen={currentOpenModal === 1}
        handleClose={handleClose}
      />
      <RequestToConnect
        isOpen={currentOpenModal === 2}
        handleClose={handleClose}
      />
    </>
  );
}

ModalController.propTypes = {};

const mapStateToProps = (state) => ({
  userData: state.admin.user,
  showConnectionRequests: state.dashboard.showConnectionRequests,
  tokenData: state.admin.tokenData,
});

export default connect(mapStateToProps, { fetchBusinessInformationForView })(
  ModalController
);
