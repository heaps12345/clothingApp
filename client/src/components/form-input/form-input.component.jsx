import React from 'react';

import { FormInputContainer, FormGroupContainer, FormLabel } from './form-input.styles';

const FormInput = ({ handleChange, label, ...props }) => (
  <FormGroupContainer>
    <FormInputContainer onChange={handleChange} {...props} />
    {label ? (
      <FormLabel
        className={
          props.value.length ? 'shrink' : ''}
      >
        {label}
      </FormLabel>
    ) : null}
  </FormGroupContainer>
);

export default FormInput;
