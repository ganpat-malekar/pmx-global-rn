import React, { useState } from "react";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import toDecimal from "../helper/toDecimal";

/**
 * Refer:
 * - https://mui.com/material-ui/react-text-field/#integration-with-3rd-party-input-libraries
 * - https://github.com/s-yadav/react-number-format
 */

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  const handleValueChange = (values) => {
    // const { floatValue, formattedValue, value } = values;
    // const rawStringValue = String(value);

    // let isWholeNumberValid = true;
    // let isFractionalPartValid = true;

    // if (typeof other.maxDigits === "number") {
    //   const wholeNumber = rawStringValue.split(".")[0];
    //   isWholeNumberValid = wholeNumber.length <= other.maxDigits;
    // }

    // if (other.displayDecimal && typeof other.precision === "number") {
    //   const fractionalPart = rawStringValue.split(".")[1];
    //   isFractionalPartValid = fractionalPart.length <= other.precision;
    // }

    // isWholeNumberValid &&
    //   isFractionalPartValid &&
    onChange({
      target: {
        name: props.name,
        value: other.displayDecimal ? toDecimal(values.value) : values.value,
      },
    });
  };

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={handleValueChange}
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NumberFormatCustom;
