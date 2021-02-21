import * as slice from '../slice';
import { TodosState } from '../types';

describe('Todos slice', () => {
  let state: TodosState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should handle setTodosList', () => {
    const data = {
      loading: false,
      error: '',
      data: [{ userId: 1, id: 1, title: 'hi', completed: true }],
    };
    expect(slice.reducer(state, slice.actions.setTodosList(data))).toEqual<
      TodosState
    >({
      todos: data,
    });
  });
  it('should handle getTodosList', () => {
    expect(slice.reducer(state, slice.actions.getTodosList({}))).toEqual<
      TodosState
    >({
      ...slice.initialState,
    });
  });
});
