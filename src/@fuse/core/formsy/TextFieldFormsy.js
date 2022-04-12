import _ from '@lodash';
import TextField from '@mui/material/TextField';
import { mask as masker, unMask } from 'remask';
import { withFormsy } from 'formsy-react';
import React from 'react';

function TextFieldFormsy(props) {
  const importedProps = _.pick(props, [
    'autoComplete',
    'autoFocus',
    'children',
    'className',
    'defaultValue',
    'disabled',
    'FormHelperTextProps',
    'fullWidth',
    'id',
    'InputLabelProps',
    'inputProps',
    'InputProps',
    'inputRef',
    'label',
    'multiline',
    'name',
    'onBlur',
    'onChange',
    'onFocus',
    'placeholder',
    'required',
    'rows',
    'rowsMax',
    'select',
    'SelectProps',
    'type',
    'variant',
    'color',
  ]);

  const { errorMessage } = props;
  const value = props.value || '';

  function changeValue(event) {
    if (props?.mask) {
      const originValue = unMask(event.currentTarget.value);
      const maskedValue = masker(originValue, props.mask);
      // props.onChange(maskedValue);

      props.setValue(maskedValue);
    } else {
      props.setValue(event.currentTarget.value);
    }

    if (props.onChange) {
      props.onChange(event);
    }
  }

  return (
    <TextField
      {...importedProps}
      onChange={changeValue}
      value={value}
      error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
      helperText={errorMessage}
    />
  );
}

export default React.memo(withFormsy(TextFieldFormsy));
