import React from "react";
import { IMaskInput } from "react-imask";

import PropTypes from "prop-types";

/**
 * Refer:
 * - https://mui.com/material-ui/react-text-field/#integration-with-3rd-party-input-libraries
 * - https://github.com/uNmAnNeR/imaskjs/tree/master/packages/react-imask
 * FIXME: Issue with iMask, if a character is entered from left side or in between of a string,
 *        the new character will replace the character at it's right side, instead or inserting
 *        it in between.
 */
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      definitions={{
        "#": /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite // TODO: See what it does
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextMaskCustom;
