import { put, takeLatest } from 'redux-saga/effects';
import * as slice from '../slice';
import { getTodosList, todosSaga } from '../saga';

describe('todosSaga Saga', () => {
  let data: any;
  let getTodosListIterator: ReturnType<typeof getTodosList>;

  beforeEach(() => {
    getTodosListIterator = getTodosList({
      payload: { title_like: '1', completed: true },
    });
  });

  it('should dispatch action if it requests the data successfully', () => {
    data = [{ userId: 1, id: 1, title: 'hi', completed: true }];
    const requestDescriptor = getTodosListIterator.next().value;
    const putDescriptor = getTodosListIterator.next(data).value;
    expect(putDescriptor).toEqual(
      put(
        slice.actions.setTodosList({ loading: false, error: '', data: data }),
      ),
    );
    const iteration = getTodosListIterator.next();
    expect(iteration.done).toBe(true);
  });
  it('should dispatch error', () => {
    const error = 'error';
    const requestDescriptor = getTodosListIterator.next().value;
    const putDescriptor = getTodosListIterator.throw(error).value;
    expect(putDescriptor).toEqual(
      put(
        slice.actions.setTodosList({ loading: false, error: error, data: [] }),
      ),
    );
  });
});

describe('todosSaga Saga', () => {
  const todosSagaIterator = todosSaga();
  it('should start task to watch for getTodosList action', () => {
    const takeLatestDescriptor = todosSagaIterator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(slice.actions.getTodosList, getTodosList),
    );
  });
});
