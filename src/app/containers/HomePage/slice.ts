import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodosParams, TodosState } from './types';

export const initialState: TodosState = {
  todos: {
    loading: true,
    error: '',
    data: [],
  },
};

const todosSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setTodosList(state, action: PayloadAction<TodosState['todos']>) {
      const { payload } = action;
      state.todos.loading = payload.loading;
      state.todos.error = payload.error;
      state.todos.data = payload.data;
    },
    getTodosList(state, action: PayloadAction<TodosParams>) {
      state.todos.loading = true;
      state.todos.error = '';
      state.todos.data = [];
    },
  },
});

export const { actions, reducer, name: sliceKey } = todosSlice;
