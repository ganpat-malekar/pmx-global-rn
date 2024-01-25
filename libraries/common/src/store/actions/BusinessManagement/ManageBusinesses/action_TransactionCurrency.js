import axios from 'axios';

import { getAndSAveBusinessInformation } from './action_AddBusiness';
import {
  getTransactionCharges,
  getSettlementCharges,
  getSettleChargeModes,
} from './action_TransactionCharges';

import errorAlertHandler from '../../../../helper/errorAlertHandler';

import { config } from '../../../../config';

import { getCompanyCurrencies } from '../../Common/Dropdowns/action_DataLists';
import { showAlert } from '../../UIActions';
import '../../types';
import { LOADING, LOADED } from '../../types';

export const submitTransactionCurrencies =
  (status) => async (dispatch, getState) => {
    const { token, userIpAddress } = getState().admin;
    const headers = {
      'content-type': 'application/json',
      IpAddress: userIpAddress,
      ServiceType: 'Web',
      AuthToken: token,
    };
    const { CompanyCrid: Crid, CompanyId } =
      getState().addBusiness.BusinessInfo;
    // const Crid = "799BA790D5B238F6231C5A5ABD5101CC";
    // const CompanyId = "55FB032179DEEECC07F70E883625EFFB";
    const data = {
      CompanyId,
      PayableCurrency: [
        // Refactor this using map, make a separate file for storing currency mappings
        {
          Crid,
          CurrencyId: 'B8EB2D571FB2A28C88FFABD809CE1D4F',
          CurrencyName: 'United States Dollar',
          CurrencySymbol: 'USD',
          PaymentType: '1',
          Status: status.pUsd,
        },
        {
          Crid,
          CurrencyId: 'B70C558595EB6EA65584D7AF941DFB88',
          CurrencyName: 'United Arab Emirates Dirham',
          CurrencySymbol: 'AED',
          PaymentType: '1',
          Status: status.pAed,
        },
      ],
      RecievableCurrency: [
        {
          Crid,
          CurrencyId: 'B8EB2D571FB2A28C88FFABD809CE1D4F',
          CurrencyName: 'United States Dollar',
          CurrencySymbol: 'USD',
          PaymentType: '2',
          Status: status.rUsd,
        },
        {
          Crid,
          CurrencyId: 'B70C558595EB6EA65584D7AF941DFB88',
          CurrencyName: 'United Arab Emirates Dirham',
          CurrencySymbol: 'AED',
          PaymentType: '2',
          Status: status.rAed,
        },
      ],
      TaxableCurrency: [
        {
          Crid,
          CurrencyId: 'B70C558595EB6EA65584D7AF941DFB88',
          CurrencyName: 'United Arab Emirates Dirham',
          CurrencySymbol: 'AED',
          PaymentType: '3',
          Status: status.tAed,
        },
      ],
      RentCollectableCurrency: [
        {
          Crid,
          CurrencyId: 'B8EB2D571FB2A28C88FFABD809CE1D4F',
          CurrencyName: 'United States Dollar',
          CurrencySymbol: 'USD',
          PaymentType: '8',
          Status: status.rcUsd,
        },
        {
          Crid,
          CurrencyId: 'B70C558595EB6EA65584D7AF941DFB88',
          CurrencyName: 'United Arab Emirates Dirham',
          CurrencySymbol: 'AED',
          PaymentType: '8',
          Status: status.rcAed,
        },
      ],
    };

    dispatch({
      type: LOADING,
    });
    axios(config.DOMAIN + config.TRANSACTION_CURRENCY, {
      method: 'POST',
      headers,
      data,
    })
      .then((response) => {
        const { Description, Status } = response.data;
        dispatch({
          type: LOADED,
        });
        if (Status === false) {
          dispatch(
            showAlert({
              type: 'danger',
              message: Description,
            })
          );
          return;
        } else {
          dispatch(
            showAlert({
              type: 'success',
              message: Description,
            })
          );
          dispatch(getAndSAveBusinessInformation());
          dispatch(getSettleChargeModes({ CompanyId }));
          dispatch(getTransactionCharges());
          dispatch(getSettlementCharges());
          dispatch(getCompanyCurrencies({ CompanyId }));
          return true;
        }
      })
      .catch((error) => {
        errorAlertHandler(error, dispatch);
        dispatch({
          type: LOADED,
        });
      });
  };
