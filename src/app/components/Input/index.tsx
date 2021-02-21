import React from 'react';
import { StyledInput } from './styles';

type inputProps = {
  placeholder: string;
  label: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = React.memo(
  ({ placeholder, label, type, onChange }: inputProps) => (
    <>
      <label htmlFor={label}>{label}:</label>
      <StyledInput
        type={type}
        id={label}
        name={label}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  ),
);
