import React from 'react';
import { StyledAlert } from './styles';

type alertProps = {
  textAlert: string;
};

export const Alert = ({ textAlert }: alertProps) => (
  <StyledAlert role="alert">{textAlert}</StyledAlert>
);
