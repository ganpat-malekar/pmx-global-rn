import _ from "underscore";

/**
 * Returns an error message if transaction charge details are
 * not present in the table for each type of payment
 * Pass "businessInfo" from reducer:
 * BusinessInfo: state.addBusiness.BusinessInfo
 *
 * @param {Object} businessInfo
 * @returns {string|null}
 */
export const getTransactionChargesValidationMessage = (businessInfo) => {
  let { PayableCurrency, RecievableCurrency, TaxableCurrency, Configuration } =
    businessInfo;
  const { SendMoney, ReceiveMoney, TaxMoney } =
    Configuration?.TransactionCharges;

  PayableCurrency = PayableCurrency.replaceAll(" ", "")
    .split(",")
    .filter((i) => i !== "");
  RecievableCurrency = RecievableCurrency.replaceAll(" ", "")
    .split(",")
    .filter((i) => i !== "");
  TaxableCurrency = TaxableCurrency.replaceAll(" ", "")
    .split(",")
    .filter((i) => i !== "");

  let no_payable_added = false;
  let no_receivable_added = false;
  let no_taxable_added = false;

  no_payable_added = !PayableCurrency.every((currency) => {
    return SendMoney?.map((i) => i.CurrencySymbol).includes(currency);
  });
  no_receivable_added = !RecievableCurrency.every((currency) => {
    return ReceiveMoney?.map((i) => i.CurrencySymbol).includes(currency);
  });
  no_taxable_added = !TaxableCurrency.every((currency) => {
    return TaxMoney?.map((i) => i.CurrencySymbol).includes(currency);
  });

  // RecievableCurrency.forEach((currency) => {
  //   no_receivable_added = !ReceiveMoney?.some(
  //     (charge) => charge.CurrencySymbol === currency
  //   );
  // });

  // TaxableCurrency.forEach((currency) => {
  //   no_taxable_added = !TaxMoney?.some(
  //     (charge) => charge.CurrencySymbol === currency
  //   );
  // });

  console.log(PayableCurrency, RecievableCurrency, TaxableCurrency);
  console.log(SendMoney, ReceiveMoney, TaxMoney);
  console.log(no_payable_added, no_receivable_added, no_taxable_added);

  let message =
    no_payable_added && no_receivable_added && no_taxable_added
      ? "Please add any one charges"
      : no_payable_added
      ? "Please add transaction charges for all payable currency"
      : no_receivable_added
      ? "Please add transaction charges for all receivable currency"
      : no_taxable_added
      ? "Please add transaction charges for all taxable currency"
      : null;

  return message;
};

/**
 * Returns an error message if settlment charge details are
 * not present in the table for each type of payment
 * Pass "businessInfo" from reducer:
 * BusinessInfo: state.addBusiness.BusinessInfo
 *
 * @param {Object} businessInfo
 * @returns {string|null}
 */
export const getSettlementChargesValidationMessage = (businessInfo) => {
  // Conditional validation
  let { PayableCurrency, RecievableCurrency, TaxableCurrency, Configuration } =
    businessInfo;
  let { settlement } = Configuration.TransactionCharges;

  // Grouping all settlement charges by 'Send Money, Receive Money', 'Tax Money'
  settlement = settlement.reduce((r, charge) => {
    // Set a group to itself or any empty group (array)
    r[charge.ServiceType] = r[charge.ServiceType] || [];
    // Push object into it's group
    r[charge.ServiceType].push(charge);
    return r;
  }, {});

  const {
    "Send Money": SendMoney,
    "Receive Money": ReceiveMoney,
    "Tax Payment": TaxMoney,
  } = settlement;

  PayableCurrency = PayableCurrency.replaceAll(" ", "")
    .split(",")
    .filter((i) => i !== "");
  RecievableCurrency = RecievableCurrency.replaceAll(" ", "")
    .split(",")
    .filter((i) => i !== "");
  TaxableCurrency = TaxableCurrency.replaceAll(" ", "")
    .split(",")
    .filter((i) => i !== "");

  let no_payable_added = false;
  let no_receivable_added = false;
  let no_taxable_added = false;

  // Had to add optional chaining because unlike transaction charges, we are not getting an array at all if empty
  // PayableCurrency.forEach((currency) => {
  //   no_payable_added = !SendMoney?.some(
  //     (charge) => charge.CurrencySymbol === currency
  //   );
  // });

  // RecievableCurrency.forEach((currency) => {
  //   no_receivable_added = !ReceiveMoney?.some(
  //     (charge) => charge.CurrencySymbol === currency
  //   );
  // });

  // TaxableCurrency.forEach((currency) => {
  //   no_taxable_added = !TaxMoney?.some(
  //     (charge) => charge.CurrencySymbol === currency
  //   );
  // });

  no_payable_added = !PayableCurrency.every((currency) => {
    return SendMoney?.map((i) => i.CurrencySymbol).includes(currency);
  });
  no_receivable_added = !RecievableCurrency.every((currency) => {
    return ReceiveMoney?.map((i) => i.CurrencySymbol).includes(currency);
  });
  no_taxable_added = !TaxableCurrency.every((currency) => {
    return TaxMoney?.map((i) => i.CurrencySymbol).includes(currency);
  });

  let message =
    no_payable_added && no_receivable_added && no_taxable_added
      ? "Please add any one charges"
      : no_payable_added
      ? "Please add settlement charges for all payable currency"
      : no_receivable_added
      ? "Please add settlement charges for all receivable currency"
      : no_taxable_added
      ? "Please add settlement charges for all taxable currency"
      : null;

  return message;
};
