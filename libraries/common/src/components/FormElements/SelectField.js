import React from "react";

import { FormControl, TextField, MenuItem } from "@mui/material";

import _ from "underscore";

/**
 * @param {string} id - No space, unique identifier
 * @param {string} label - Label
 * @param {boolean} required - If field is required or optional. For showing asterisk
 * @param {any} value - Field value
 * @param {object} validator - simple-react-validator object
 * @param {string|array} rules - rules for validator.
 * @param {function} onChange - Function to deal with value change
 * @param {array} options - Data for rendering option list
 * @description Renders a dropdown (non-autocompletion).
 */
const SelectField = ({ validator, options, ...props }) => {
  return (
    <FormControl fullWidth>
      <TextField
        {...props}
        name={props.id}
        select
        color="secondary"
        margin="normal"
        variant="outlined"
        size="normal"
        onBlur={() => {
          validator.showMessageFor(props.id);
        }}
        helperText={validator.message(props.id, props.value, props.rules ?? "")}
      >
        {!_.isEmpty([]) ? (
          options.map((item, index) => {
            return (
              <MenuItem key={index} value={item.Id}>
                {item.Text}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem disabled>No options</MenuItem>
        )}
      </TextField>
    </FormControl>
  );
};

export default SelectField;
