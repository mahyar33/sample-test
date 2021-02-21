import { put, takeLatest, call } from 'redux-saga/effects';
import { actions } from './slice';
import { request } from 'utils/request';

export function* getTodosList(params) {
  const requestURL = `https://jsonplaceholder.typicode.com/todos?title_like=${
    params.payload.title_like ? params.payload.title_like : ''
  }${params.payload.completed ? `&completed=${params.payload.completed}` : ''}`;
  try {
    const todos = yield call<any>(request, requestURL);
    yield put(actions.setTodosList({ loading: false, error: '', data: todos }));
  } catch (err) {
    yield put(actions.setTodosList({ loading: false, error: err, data: [] }));
  }
  return;
}
/**
 * Root saga manages watcher lifecycle
 */
export function* todosSaga() {
  yield takeLatest(actions.getTodosList, getTodosList);
}
