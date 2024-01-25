import { useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@mui/styles";

import _ from "underscore";

import { decryptAES } from "../helper/cryptography";
import enums from "../helper/enums";

import { authenticateSender } from "../store/actions/action_URLAuthentication";
import { getDataOfToken } from "../store/actions/adminActions";

const useStyles = makeStyles((theme) => ({}));

function URLAuthentication(props) {
  const classes = useStyles();
  const urlParams = props.match.params;

  useEffect(async () => {
    if (!_.isEmpty(urlParams)) {
      if (
        decryptAES(urlParams.prakriya) === "adhoc" &&
        decryptAES(urlParams.bhugtanprakriya) === "requestpayment"
      ) {
        const payload = {
          Guid: urlParams.guid,
          Process: urlParams.prakriya,
          PaymentType: urlParams.bhugtanprakriya,
          SenderUpdatedEmailId: "",
          Status: null,
        };

        const successResponse = await props.authenticateSender(payload);

        if (!_.isEmpty(successResponse)) {
          await props.getDataOfToken();
          props.history.push("/App/Checkout", {
            isCheckoutViaEmail: true,
            PaymentType: enums.PaymentTypes.CHECKOUT_VIA_EMAIL,
            PaymentModes: successResponse.AvailableTransactionType.split(","),
            RequestId: successResponse.RequestId,
            RequestRefNo: successResponse.RequestRefNo,
          });
        } else {
          props.history.push("/");
        }
      }
    }
  }, [urlParams?.guid]);

  return <></>;
}

URLAuthentication.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { authenticateSender, getDataOfToken })(
  URLAuthentication
);
