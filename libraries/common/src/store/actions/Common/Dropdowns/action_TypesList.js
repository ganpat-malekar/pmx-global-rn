import { config } from '@paymate/common/config';
import axios from 'axios';
import { errorAlertHandler } from '@paymate/common/helpers';
import { showAlert } from '../../UIActions';

export const getTypesData_new = (TypeName) => async (dispatch, getState) => {
  const TypesMap = {
    CommissionType: 1,
    BusinessMode: 2,
    ChannelPartner: 3,
    ServiceMode: 4,
    ContactType: 5,
    Discounting: 6,
    WebSubscription: 7,
    ApiSubscription: 8,
    CardType: 9,
    SubscriptionType: 10,
    SubscriptionCategory: 11,
  };

  const { token, userIpAddress } = getState().admin;
  const types = getState().typesList;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };

  if (types[TypeName].length < 1) {
    const params = {
      objTypeName: TypesMap[TypeName],
    };

    axios(config.DOMAIN + config.GET_TYPES_DATA, {
      method: 'GET',
      headers,
      params,
    })
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          dispatch({
            type: TypeName,
            payload: data,
          });
        } else {
          let { Message: message } = response.data;
          message = 'Something went wrong'; // Currently it is exposing backend url coming from Message
          dispatch(
            showAlert({
              type: 'danger',
              message,
            })
          );
        }
      })
      .catch((error) => {
        errorAlertHandler(error, dispatch);
        return [];
      });
  }
};
