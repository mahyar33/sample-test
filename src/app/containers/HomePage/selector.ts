import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

const selectHome = (state: RootState) => state.home || initialState;

export const selectTodosList = createSelector(
  [selectHome],
  homeState => homeState.todos,
);
