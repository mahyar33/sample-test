import * as selectors from '../selector';
import { RootState } from 'types';
import { initialState } from '../slice';

describe('Todos selectors', () => {
  let state: RootState = {};

  beforeEach(() => {
    state = {};
  });

  it('should select the initial state', () => {
    expect(selectors.selectTodosList(state)).toEqual(initialState.todos);
  });

  it('should select todos', () => {
    const data = [{ userId: 1, id: 1, title: 'hi', completed: true }];
    const todos = { ...initialState.todos, data };
    state = {
      home: { todos },
    };
    expect(selectors.selectTodosList(state)).toEqual(todos);
  });
});
