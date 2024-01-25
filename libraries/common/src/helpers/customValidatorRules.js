/**
 * Refer: https://www.npmjs.com/package/simple-react-validator
 */
export default {
  only_integer: {
    message: 'Please enter a valid :attribute',
    rule: (val) => {
      return !!val.toString().match(/^-?\d+$/);
    },
  },
  no_ending_dot: {
    message: 'Please enter valid :attribute',
    rule: (val) => {
      return !!val.toString().match(/^(?![.])(?!.*[-_.]$).*/);
    },
  },
  two_decimals_max: {
    message: 'The :attribute must have no more than two decimal places.',
    rule: (val, params, validator) => {
      return !!val.toString().match(/^\d+(\.\d{1,2})?$/);
    },
    required: true,
  },
  chargesValidator: {
    message:
      'Enter upto 9-digit number before the decimal, with exactly 2 decimal digits.',
    rule: (val, params, validator) => {
      return !!val.toString().match(/^\d{1,9}\.\d{2}$/);
    },
    required: true,
  },
  /**
   * Example Usage:
   * validator.message('amount', this.state.amount, 'maxNumber:9,2');
   */
  // maxNumber: {
  //   message:
  //     "The :attribute must have a maximum of :maxIntegerPart digits before the decimal point and must include a decimal point with up to :maxDecimalPlaces decimal places.",
  //   rule: (val, params, validator) => {
  //     const [maxIntegerPart, maxDecimalPlaces] = params;
  //     // Adjust regex to ensure there's a decimal point followed by 1 or 2 digits
  //     const regex = new RegExp(
  //       `^-?\\d{1,${maxIntegerPart}}\\.(\\d{1,${maxDecimalPlaces}})?$`
  //     );
  //     return regex.test(val.toString());
  //   },
  //   messageReplace: (message, params) =>
  //     message
  //       .replace(":maxIntegerPart", params[0])
  //       .replace(":maxDecimalPlaces", params[1]),
  //   required: true,
  // },
  /**
   * Example usage:
   * validator.message("field_name", field_value, "required|max_discount:100,30,Percentage")
   */
  max_discount: {
    message: ':attribute',
    rule: (val, params) => {
      // Need to explicitly convert to number. Because comparing two number-strings causes different behavior.
      const [baseAmount, maxPercent, type] = params.map((item) =>
        !isNaN(item) ? +item : item
      );

      if (!baseAmount) {
        return false;
      }

      if (type === 'Percentage') {
        return val <= maxPercent;
      } else {
        return val <= (baseAmount * maxPercent) / 100;
      }
    },
    messageReplace: (message, params) => {
      const [baseAmount, maxPercent, type] = params.map((item) =>
        !isNaN(item) ? +item : item
      );

      const fieldname = message;

      if (!baseAmount) {
        return `Please enter the Amount first`;
      }

      if (type && type === 'Percentage') {
        return `The ${fieldname} cannot be more than ${maxPercent}%`;
      } else {
        return `The ${fieldname} cannot be more than ${
          (baseAmount * maxPercent) / 100
        }`;
      }
    },
  },
  min_approver_check: {
    message: ':attribute',
    rule: (val, params) => {
      // Need to explicitly convert to number. Because comparing two number-strings causes different behavior.
      const [minApproverCount, approverCount] = params.map((item) =>
        !isNaN(item) ? +item : item
      );

      if (!approverCount) {
        return false;
      }

      return minApproverCount <= approverCount;
    },
    messageReplace: (message, params) => {
      const [baseAmount, maxPercent, type] = params.map((item) =>
        !isNaN(item) ? +item : item
      );

      if (!baseAmount) {
        return `Please, first select the Approvers`;
      }

      return 'Minimum approver cannot be more than selected approvers';
    },
  },
  more_than_zero: {
    message: ':attribute',
    rule: (val, params) => {
      // Need to explicitly convert to number. Because comparing two number-strings causes different behavior.
      const [minApproverCount] = params.map((item) =>
        !isNaN(item) ? +item : item
      );

      return minApproverCount > 0;
    },
    messageReplace: (message, params) => {
      return 'Atleast one approver is required';
    },
  },
  upload_file_size: {
    message: 'File size exceeded',
    rule: (val, params) => {
      return val.size <= parseInt(params);
    },
  },
  upload_file_type: {
    message: 'File type not allowed',
    rule: (val) => {
      return [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/pdf',
        'image/gif',
      ].includes(val.type);
    },
  },
  upload_image_file: {
    message: 'File type not allowed',
    rule: (val) => {
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(
        val.type
      );
    },
  },
  upload_html_file: {
    message: 'File type not allowed',
    rule: (val) => {
      return ['text/html'].includes(val.type);
    },
  },
  email_validator: {
    message: 'Please enter a valid :attribute',
    rule: (val) => {
      return /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(
        val
      );
    },
  },
  business_name_validator: {
    message: 'Please enter a valid :attribute',
    rule: (val) => {
      return /^[a-zA-Z0-9,.@&!' _-]*$/.test(val);
    },
  },
  company_name_validator: {
    message: 'Please enter a valid :attribute',
    rule: (val) => {
      return /^[a-zA-Z0-9,.@!' -]*$/.test(val);
    },
  },
  contact_name_validator: {
    message: "That's an invalid :attribute. Please enter only alphabets",
    rule: (val) => {
      return /^[A-Za-z'  ][A-Za-z][A-Za-z'  ]*$/.test(val);
    },
  },
  contact_designation_validator: {
    message: 'Please enter a valid :attribute',
    rule: (val) => {
      return /^s*([a-zA-Z' ]+)s*$/.test(val);
    },
  },
  source_field_validator: {
    message: 'Please enter a valid :attribute',
    rule: (val) => {
      return /^s*([0-9a-zA-Z _]+)s*$/.test(val);
    },
  },
  uae_mobile_no_validator: {
    message: 'Please enter a valid :attribute',
    rule: (val) => {
      return /^[5][024568][0-9]{7}$/.test(val);
    },
  },
  in_mobile_no_validator: {
    message: 'Please enter a valid :attribute',
    rule: (val) => {
      return /^[6-9][0-9]{9}$/.test(val);
    },
  },
  mobile_number_validator: {
    message: 'Please enter a valid :attribute',
    rule: (val, params, validator) => {
      if (!val) {
        return true;
      }

      let [regex, length] = params;

      const regexObj = new RegExp(regex);

      return regexObj.test(val.toString()) && val.length == length;
    },
    messageReplace: (message, params) => message.replace(':country', params),
    required: true,
  },
  uae_branch_address_validator: {
    message: 'Please enter a valid :attribute',
    rule: (val) => {
      return /^[a-zA-Z0-9,.:+_' -]*$/.test(val);
    },
  },
  uae_postal_code_validator: {
    message: 'Please enter a valid :attribute',
    rule: (val) => {
      return /^\d{4,6}$/.test(val);
    },
  },
  company_registration_number_validator: {
    message: 'Please enter valid :attribute',
    rule: (val) => {
      return /^[a-zA-Z0-9]+$/.test(val);
    },
  },
};
