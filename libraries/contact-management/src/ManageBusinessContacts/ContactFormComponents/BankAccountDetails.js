import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  TextField,
  Grid,
  FormControl,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';
import { withStyles } from '@mui/material/styles';

import moment from 'moment';
import _ from 'underscore';

import BankAccountDetailsTable from './BankAccountDetailsTable';

import {
  validatorRules,
  getDetailsFromIBAN,
  checkIsInputAllowed,
  useSimpleReactValidator,
} from '@paymate/common/helpers';
import { formUseStyles } from '@paymate/common/style';
import {
  fetchAndStoreVendorInformation,
  getCountryList,
  getBankList,
  getBankAccountTableData,
  submitBankAccountDetails,
  deleteBankAccount,
  getCurrencyList,
  showAlert,
  sendVendorAppovalMailToApprover,
  submitKYCDocumentUploadedBy,
  flushBankAccountTable,
} from '@paymate/common/store/actions';

const _initialFormFieldsModel = {
  BeneficiaryName: '', // Account holder name, same validation as client agency name
  BankId: '', //-- AES256 Encrypted
  RoutingCode: '',
  BICCode: '',
  CurrencyId: '', //-- AES256 Encrypted
  IbanNo: '',
  HashIbanNo: '',
  HashAccountNo: '',
  BankAccountNumber: '',
  BranchAddress: '',
  PayableCity: '',
  PayableCountryId: '',
  BankName: '', // To display in table
  CurrencyName: '', // To display in table
  Viewstatus: 'Registered', // To display in table
  IbanLength: '', // For validation
  InstitutionCode: '', // For validation
};

function BankAccountDetails(props) {
  // States
  const classes = formUseStyles();
  const [formFields, setFormFields] = useState({ ..._initialFormFieldsModel });
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  // Effects
  useEffect(() => {
    props.getCountryList();

    return () => {
      props.flushBankAccountTable();
    };
  }, []);

  useEffect(() => {
    setFormFields((prevState) => ({
      ...prevState,
      BeneficiaryName: props.BeneficiaryName,
    }));
  }, [props.BeneficiaryName]);

  useEffect(() => {
    // Loading dependent dropdowns
    if (formFields.PayableCountryId) {
      props.getBankList(formFields.PayableCountryId);
      props.getCurrencyList(formFields.PayableCountryId, props.CompanyId);
    }
  }, [formFields.PayableCountryId]);

  useEffect(() => {
    if (!props.isNew && props.ClientId) {
      props.getBankAccountTableData(props.ClientId);
    }
  }, [props.isNew, props.ClientId]);

  useEffect(() => {
    // We want to reset if any of the below change
    setFormFields((prevState) => ({
      ...prevState,
      IbanNo: '',
      HashIbanNo: '',
      HashAccountNo: '',
      BankAccountNumber: '',
    }));
  }, [formFields.CurrencyId, formFields.CountryId, formFields.BankId]);

  // Validators
  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    validators: { ...validatorRules },
  });

  const isIbanValidMessage = (iban) => {
    const validLength = formFields.IbanLength;
    const validInstitutionCode = formFields.InstitutionCode;
    // Ask about this to amir, are we taking first two characters of AED as country code?
    const validCountryCode = formFields.CurrencyName.slice(0, 2);

    const ibanCountryCode = iban.slice(0, 2);
    const ibanInstitutionCode = iban.slice(4, 7);

    let message = '';

    if (
      iban.length !== validLength ||
      ibanInstitutionCode !== validInstitutionCode ||
      ibanCountryCode !== validCountryCode
    ) {
      message = `Please enter country code ${validCountryCode} followed by valid IBAN No. \
        The length should be ${validLength}, and Institution Code \
        should be ${validInstitutionCode}`;
    }

    return message;
  };

  const isBankAlreadyAdded = (data) => {
    return (
      data.some((bank) => bank.CurrencyId === formFields.CurrencyId) &&
      `Bank account details for currency ${formFields.CurrencyName} already exists`
    );
  };

  // Utility
  const extractBankAccountNumber = () => {
    const { AccountNo, HashedIBAN, HashedAccountNo } = getDetailsFromIBAN(
      formFields.IbanNo
    );

    setFormFields((prevState) => ({
      ...prevState,
      BankAccountNumber: AccountNo,
      HashIbanNo: HashedIBAN,
      HashAccountNo: HashedAccountNo,
    }));
  };

  const deleteBank = async (id) => {
    const data = {
      AccountId: id,
      Status: '0', //Hardcoded
    };
    // needs testing
    if (!_.isEmpty(props.fetchedTableData)) {
      const isPresent = props.fetchedTableData.some(
        (i) => i.ContactAccountId === id
      );
      if (isPresent) {
        await props.deleteBankAccount(data);
        props.getBankAccountTableData(props.ClientId);
      }
    } else {
      // If not present in fetchedTableData, then it is guaranteed to be
      // present in tableData
      const newTableData = tableData.filter((i) => i.ContactAccountId !== id);
      setTableData([...newTableData]);
      props.showAlert({
        type: 'success',
        message: 'Bank account removed successfully',
      });
    }
  };

  // Handle functions
  const handleChange = (event) => {
    if (event.target.name === 'BankId') {
      const selectedBank = props.banks.find(
        (e) => e.BankId === event.target.value
      );

      setFormFields({
        ...formFields,
        [event.target.name]: event.target.value,
        RoutingCode: selectedBank.RoutingCode,
        BICCode: selectedBank.BICCode,
        BankName: selectedBank.BankName,
        InstitutionCode: selectedBank.InstitutionCode,
      });
    } else if (event.target.name === 'CurrencyId') {
      const selectedCurrency = props.currencies.find(
        (e) => e.CurrencyId === event.target.value
      );

      setFormFields({
        ...formFields,
        [event.target.name]: event.target.value,
        CurrencyName: selectedCurrency.CurrencySymbol,
        IbanLength: selectedCurrency.IbanLength,
      });
    } else {
      setFormFields({ ...formFields, [event.target.name]: event.target.value });
    }
  };

  const handleAdd = () => {
    if (validator.allValid()) {
      const ibanErrorMessage = isIbanValidMessage(formFields.IbanNo);
      if (ibanErrorMessage) {
        props.showAlert({
          type: 'danger',
          message: ibanErrorMessage,
        });

        return;
      }

      let alreadyAddedErrorMessage = null;
      if (!props.isNew && !_.isEmpty(props.fetchedTableData)) {
        alreadyAddedErrorMessage = isBankAlreadyAdded(props.fetchedTableData);
      } else {
        alreadyAddedErrorMessage = isBankAlreadyAdded(tableData);
      }

      if (alreadyAddedErrorMessage) {
        props.showAlert({
          type: 'danger',
          message: alreadyAddedErrorMessage,
        });

        return;
      }

      setTableData((prevState) => [...prevState, formFields]);
      setFormFields({ ..._initialFormFieldsModel });

      validator.visibleFields = [];
      forceUpdate();
    } else {
      validator.showMessages();
    }
  };

  const handleSubmit = async () => {
    if (!_.isEmpty(tableData) || !_.isEmpty(props.fetchedTableData)) {
      let data;
      if (!_.isEmpty(tableData)) {
        data = tableData.map((savedBank, index) => {
          const selectedBank = props.banks.find(
            (bank) => bank.BankId === savedBank.BankId
          );

          const selectedCountry = props.countries.find(
            (country) => country.CountryId === savedBank.PayableCountryId
          );

          const selectedCurrency = props.currencies.find(
            (currency) => currency.CurrencyId === savedBank.CurrencyId
          );

          const { HashedIBAN, HashedAccountNo } = getDetailsFromIBAN(
            savedBank.IbanNo
          );

          const newBankDetails = { ...savedBank };

          newBankDetails.ClientId = props.ClientId;
          newBankDetails.Crid = props.Crid;
          newBankDetails.ClientRelationShipNo = props.ClientRelationShipNo;
          newBankDetails.BankCode = selectedBank.BankCode;
          newBankDetails.Type = null; // remove
          newBankDetails.IsIbanSupported = selectedCurrency.IsIbanSupported;
          newBankDetails.SwiftCode = newBankDetails.BICCode;
          newBankDetails.PayableCountryName = selectedCountry.CountryName;
          newBankDetails.Status = 0;
          newBankDetails.ContactAccountId = 0;
          newBankDetails.Viewstatus = 'Registered';
          newBankDetails.RegistrationDate = moment(new Date()).format(
            'DD/MM/YYYY'
          );

          return newBankDetails;
        });
      } else {
        data = props.fetchedTableData;
      }

      const response = await props.submitBankAccountDetails(data);

      if (props.isKYCTabVisible && response?.Data?.ClientId) {
        setTableData([]);
        props.fetchAndStoreVendorInformation(response.Data.ClientId);
        props.getBankAccountTableData(response.Data.ClientId);
        props.setIsKYCTabDisabled(false);
        props.setAccordian1(false);
        props.setAccordian2(false);
        props.setAccordian3(true);
      } else if (!props.isKYCTabVisible && response?.StatusCode === '000') {
        const success1 = await props.submitKYCDocumentUploadedBy(
          props.ClientId,
          1 // is for "by vendor"
        );

        if (success1) {
          const success2 = await props.sendVendorAppovalMailToApprover({
            ClientId: props.ClientId,
          });

          success2 && navigate('/App/ManageContacts');
        }
      }
    } else {
      showAlert({
        type: 'danger',
        message: 'Please add new banks',
      });
    }
  };

  return (
    <div className={classes.FormPanel}>
      <Grid container item lg={6} md={6} xs={12} spacing={3}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              required
              select
              label="Select Country Name"
              id="PayableCountryId"
              name="PayableCountryId"
              variant="outlined"
              size="normal"
              value={formFields.PayableCountryId}
              onBlur={() => {
                validator.showMessageFor('CountryName');
              }}
              helperText={validator.message(
                'CountryName',
                formFields.PayableCountryId,
                'required'
              )}
              onChange={handleChange}
            >
              {!_.isEmpty(props.countries) ? (
                props.countries.map((country, index) => {
                  return (
                    <MenuItem key={index} value={country.CountryId}>
                      {country.CountryName}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled>No options</MenuItem>
              )}
            </TextField>
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              select
              required
              label="Select Bank"
              id="BankId"
              name="BankId"
              variant="outlined"
              size="normal"
              value={formFields.BankId}
              onBlur={() => {
                validator.showMessageFor('bank');
              }}
              helperText={validator.message(
                'bank',
                formFields.BankId,
                'required'
              )}
              onChange={handleChange}
            >
              {!_.isEmpty(props.banks) ? (
                props.banks.map((bank, index) => {
                  return (
                    <MenuItem key={index} value={bank.BankId}>
                      {bank.BankName}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled>No options</MenuItem>
              )}
            </TextField>
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              select
              required
              label="Select Currency"
              id="CurrencyId"
              name="CurrencyId"
              variant="outlined"
              size="normal"
              value={formFields.CurrencyId}
              onBlur={() => {
                validator.showMessageFor('currency');
              }}
              helperText={validator.message(
                'currency',
                formFields.CurrencyId,
                'required'
              )}
              onChange={handleChange}
            >
              {!_.isEmpty(props.currencies) ? (
                props.currencies.map((currency, index) => {
                  return (
                    <MenuItem key={index} value={currency.CurrencyId}>
                      {currency.CurrencySymbol}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled>No options</MenuItem>
              )}
            </TextField>
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              required
              label="Account Holder Name"
              name="BeneficiaryName"
              id="BeneficiaryName"
              variant="outlined"
              size="normal"
              inputProps={{
                autoComplete: 'nope',
                maxLength: '100',
              }}
              value={formFields.BeneficiaryName}
              onChange={handleChange}
              onBlur={() => {
                validator.showMessageFor('account_holder_name');
              }}
              helperText={validator.message(
                'account_holder_name',
                formFields.BeneficiaryName,
                ['required', { max: 100 }, 'company_name_validator']
              )}
            />
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              required
              color="secondary"
              margin="normal"
              label="Iban No"
              name="IbanNo"
              id="IbanNo"
              variant="outlined"
              size="normal"
              inputProps={{
                autoComplete: 'nope',
                maxLength: '50',
              }}
              value={formFields.IbanNo}
              onChange={handleChange}
              onBlur={() => {
                validator.showMessageFor('iban_no');
                extractBankAccountNumber();
              }}
              helperText={validator.message('iban_no', formFields.IbanNo, [
                'required',
                { max: 50 },
                'company_name_validator',
                // {
                //   regex: "^[a-zA-Z0-9,.@!' -]*$",
                // },
              ])}
            />
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              required
              color="secondary"
              margin="normal"
              label="Bank Account Number"
              name="BankAccountNumber"
              disabled
              id="BankAccountNumber"
              variant="outlined"
              size="normal"
              inputProps={{
                autoComplete: 'nope',
                maxLength: '50',
              }}
              value={formFields.BankAccountNumber}
              onChange={handleChange}
              onBlur={() => {
                validator.showMessageFor('bank_account_number');
              }}
              helperText={validator.message(
                'bank_account_number',
                formFields.BankAccountNumber,
                [
                  'required',
                  { max: 50 },
                  'company_name_validator',
                  // {
                  //   regex: "^[a-zA-Z0-9,.@!' -]*$",
                  // },
                ]
              )}
            />
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              label="Route Code"
              id="RoutingCode"
              name="RoutingCode"
              variant="outlined"
              size="normal"
              disabled
              inputProps={{
                autoComplete: 'nope',
                maxLength: '100',
              }}
              value={formFields.RoutingCode}
            />
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              label="Swift Code / BIC Code"
              name="BICCode"
              id="BICCode"
              variant="outlined"
              size="normal"
              disabled
              inputProps={{
                autoComplete: 'nope',
                maxLength: '100',
              }}
              value={formFields.BICCode}
            />
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              required
              label="Branch Address"
              name="BranchAddress"
              id="BranchAddress"
              variant="outlined"
              size="normal"
              inputProps={{
                autoComplete: 'nope',
                maxLength: '100',
              }}
              value={formFields.BranchAddress}
              onChange={handleChange}
              onBlur={() => {
                validator.showMessageFor('branch_address');
              }}
              helperText={validator.message(
                'branch_address',
                formFields.BranchAddress,
                ['required', { max: 100 }, 'uae_branch_address_validator']
              )}
            />
          </FormControl>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              margin="normal"
              required
              label="Payable City"
              name="PayableCity"
              id="PayableCity"
              variant="outlined"
              size="normal"
              inputProps={{
                autoComplete: 'nope',
                maxLength: '100',
              }}
              value={formFields.PayableCity}
              onChange={handleChange}
              onBlur={() => {
                validator.showMessageFor('city');
              }}
              helperText={validator.message('city', formFields.PayableCity, [
                'required',
                { max: 100 },
                'uae_branch_address_validator',
                // {
                //   regex: "^[a-zA-Z0-9,.:+_' -]*$",
                // },
              ])}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            style={{ marginRight: '1%' }}
            variant="contained"
            color="primary"
            onClick={handleAdd}
          >
            Add Account
          </Button>
        </Grid>
      </Grid>

      <Grid container item lg={12} md={12} xs={12} spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <div className={classes.BusinessSubscriptionTable}>
            <BankAccountDetailsTable
              tableData={tableData}
              deleteBank={deleteBank}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.Divider} />
        </Grid>
      </Grid>

      <Grid sx={{ mt: 0 }} container item lg={12} md={12} xs={12} spacing={3}>
        {(!_.isEmpty(tableData) || !_.isEmpty(props.fetchedTableData)) && (
          <Grid item xs={12}>
            <Button
              style={{ marginRight: '10px' }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Confirm
            </Button>
            <Link to="/App/ManageContacts">
              <Button variant="outlined" color="error">
                Cancel
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

BankAccountDetails.propTypes = {};

const mapStateToProps = (state) => ({
  countries: state.bankAccountDetails.countries,
  currencies: state.dataLists.currencyList,
  banks: state.bankAccountDetails.banks,
  BeneficiaryName:
    state.basicInfo.ClientAgencyName ??
    state.addContact.VendorInfo?.BasicInformation?.ClientAgencyName,
  CompanyId:
    state.basicInfo.CompanyId ?? state.addContact.VendorInfo?.CompanyId,
  ClientId: state.addContact.VendorInfo?.ClientId,
  Crid: state.basicInfo.Crid ?? state.addContact.VendorInfo?.Crid,
  ClientRelationShipNo:
    state.basicInfo.CompanyId ??
    state.addContact.VendorInfo?.BasicInformation?.ClientRelationShipNo,
  fetchedTableData: state.bankAccountDetails.tableData,
});

export default connect(mapStateToProps, {
  getCountryList,
  getCurrencyList,
  getBankList,
  getBankAccountTableData,
  showAlert,
  submitBankAccountDetails,
  deleteBankAccount,
  fetchAndStoreVendorInformation,
  sendVendorAppovalMailToApprover,
  submitKYCDocumentUploadedBy,
  flushBankAccountTable,
})(BankAccountDetails);
