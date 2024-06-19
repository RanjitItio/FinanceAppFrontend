import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(maskRef) => {
        if (ref) {
          ref(maskRef ? maskRef.inputElement : null);
        }
        if (inputRef) {
          inputRef(maskRef ? maskRef.inputElement : null);
        }
      }}
      mask={[
        /\d/, /\d/, /\d/, /\d/, ' ',
        /\d/, /\d/, /\d/, /\d/, ' ',
        /\d/, /\d/, /\d/, /\d/, ' ',
        /\d/, /\d/, /\d/, /\d/
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
});

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default TextMaskCustom;
