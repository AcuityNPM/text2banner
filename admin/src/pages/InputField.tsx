import React, { ChangeEvent } from 'react';
import * as css from './styles/style';

type InputFieldProps = {
  label: string,
  required: boolean,
  name: string,
  type: string,
  value: string | number,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  pattern: string,
  placeholder: string,
  hint: string
}

const InputField = (props: InputFieldProps) => {
  
  const {label, required, pattern, hint, ...others} = props;
  let inputElement;
  if (pattern != "" && required) {
    inputElement = <input style={css.bbFormLabelInput} {...others} pattern={pattern} required />;
  } else if (pattern != "") {
    inputElement = <input style={css.bbFormLabelInput} {...others} pattern={pattern} />;
  } else if (required) {
    inputElement = <input style={css.bbFormLabelInput} {...others} required />;
  } else {
    inputElement = <input style={css.bbFormLabelInput} {...others} />;
  }

  return (
    <label style={css.bbFormLabel}>
      <span style={css.bbFormLabelSpan}>
        {label}
        {required && (<span style={css.bbFormLabelRequired}>*</span>)}
      </span>
      <div style={css.bbFormLabelWrap}>
        {inputElement}
        {hint ? (<span style={css.bbFormLabelHint}>{hint}</span>) : (null)}
      </div>
    </label>
  );
};

export default InputField;