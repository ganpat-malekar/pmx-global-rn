import React from "react";

import { FormControl, TextField, MenuItem } from "@mui/material";

import _ from "underscore";

/**
 * @param {string} id - No space, unique identifier
 * @param {string} label - Label
 * @param {boolean} required - If field is required or optional. For showing asterisk
 * @param {number} maxLength - Max characters the field should allow
 * @param {any} value - Field value
 * @param {object} validator - simple-react-validator object
 * @param {string|array} rules - rules for validator.
 * @param {function} onChange - Function to deal with value change
 * @description Renders a dropdown (non-autocompletion).
 */
const RTextField = ({ validator, ...props }) => {
  return (
    <FormControl fullWidth>
      <TextField
        {...props}
        name={props.id}
        color="secondary"
        margin="normal"
        variant="outlined"
        size="normal"
        inputProps={{
          autoComplete: "nope",
          maxLength: props.maxLength,
        }}
        onBlur={() => {
          validator.showMessageFor(props.id);
        }}
        helperText={validator.message(props.id, props.value, props.rules ?? "")}
      />
    </FormControl>
  );
};

export default RTextField;
