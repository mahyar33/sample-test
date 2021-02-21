import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureAppStore } from 'store/configureStore';
import { actions, initialState } from '../slice';
import { HomePage } from '..';
import { i18n, translations } from 'locales/i18n';
import userEvent from '@testing-library/user-event';
import { createRenderer } from 'react-test-renderer/shallow';
const shallowRenderer = createRenderer();

function* mockHomePageSaga() {}

jest.mock('../saga', () => ({
  todosSaga: mockHomePageSaga,
}));

const renderHomePage = (store: Store) =>
  render(
    <Provider store={store}>
      <HelmetProvider>
        <HomePage />
      </HelmetProvider>
    </Provider>,
  );

describe('<renderHomePage />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderHomePage>;

  beforeEach(() => {
    jest.useFakeTimers();
    store = configureAppStore();
    component = renderHomePage(store);
    store.dispatch(actions.getTodosList({}));
    expect(store.getState().home).toEqual(initialState);
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    component.unmount();
  });
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
  it('should dispatch action on mount', () => {
    store.dispatch(
      actions.setTodosList({ loading: false, error: '', data: [] }),
    );
    component.unmount();
    component = renderHomePage(store);
    expect(initialState.todos.data.length).toEqual(0);
    jest.runAllTimers();
    expect(store.getState().home.todos.loading).toBe(true);
  });
  it('should display loading indicator when state is loading', () => {
    component.unmount();
    component = renderHomePage(store);
    expect(component.container.querySelector('circle')).toBeInTheDocument();
  });
  it('should display empty table', async () => {
    const t = await i18n;
    store.dispatch(
      actions.setTodosList({ loading: false, error: '', data: [] }),
    );
    expect(
      component.queryByText(t(translations.noResult)!),
    ).toBeInTheDocument();
  });
  it('should display table', () => {
    store.dispatch(
      actions.setTodosList({
        loading: false,
        error: '',
        data: [{ userId: 1, id: 1, title: 'hi', completed: true }],
      }),
    );
    expect(component.queryByText('hi')).toBeInTheDocument();
  });
  it('should dispatch action on input change', () => {
    store.dispatch(
      actions.setTodosList({ loading: false, error: '', data: [] }),
    );
    const input = component.container.querySelector('input');
    userEvent.type(input!, 'Hello, World!');
    jest.runAllTimers();
    expect(store.getState().home.todos.loading).toBe(true);
  });
  it('should dispatch action on select change', () => {
    store.dispatch(
      actions.setTodosList({ loading: false, error: '', data: [] }),
    );
    const select = component.container.querySelector('select');
    userEvent.selectOptions(select!, 'true');
    jest.runAllTimers();
    expect(store.getState().home.todos.loading).toBe(true);
  });
});
