import React from 'react';
import { StyledSelector } from './styles';

type options = {
  text: string;
  value: string;
};

type selectorProps = {
  label: string;
  options: Array<options>;
  onChange?: (event: any) => void;
};

export const Selector = React.memo(
  ({ label, options, onChange }: selectorProps) => (
    <>
      <label htmlFor={label}>{label}:</label>
      <StyledSelector id={label} name={label} onChange={onChange}>
        {options.map(item => (
          <option key={item.text} value={item.value}>
            {item.text}
          </option>
        ))}
      </StyledSelector>
    </>
  ),
);
