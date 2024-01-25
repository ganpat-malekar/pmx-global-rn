// the PaymentType is selected from the enum in the backend code,
// we have simply hardcoded it in our code,
export const PaymentTypes = {
  MAKE_PAYMENT: 1,
  REQUEST_PAYMENT: 2,
  TOPUP: 3,
  SUBSCRIPTION: 4,
  MAKE_TAX_PAYMENT: 7,
  CHECKOUT_VIA_EMAIL: 20, // React specific
};

export default { PaymentTypes };
