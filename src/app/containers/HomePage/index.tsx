import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { actions, reducer, sliceKey } from './slice';
import { todosSaga } from './saga';
import { selectTodosList } from './selector';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { LoadingWrapper } from '../../components/LoadingIndicator/styles';
import { Wrapper } from './styles';
import { Container } from './styles';
import { Form } from './styles';
import { Input } from '../../components/Input';
import { Selector } from '../../components/Selector';
import { Table } from '../../components/Table';
import { TodosParams } from './types';

export function HomePage() {
  const { t } = useTranslation();
  const options = useRef([
    { value: 'undefined', text: '-' },
    { value: 'false', text: t(translations.false) },
    { value: 'true', text: t(translations.true) },
  ]);
  const timer = useRef<number>();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: todosSaga });
  const dispatch = useDispatch();
  const todosList = useSelector(selectTodosList);
  const [params, setParams] = useState<TodosParams>({
    title_like: undefined,
    completed: undefined,
  });
  const handleChangeInput = useCallback(
    event => {
      setParams({
        title_like: event.target.value,
        completed: params.completed,
      });
    },
    [params],
  );
  const handleChangeSelector = useCallback(
    event => {
      setParams({
        title_like: params.title_like,
        completed:
          event.target.value === 'undefined' ? undefined : event.target.value,
      });
    },
    [params],
  );
  const handleForm = useCallback(e => {
    e.preventDefault();
  }, []);
  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(function () {
      dispatch(actions.getTodosList(params));
    }, 500);
  }, [params, dispatch]);
  return (
    <>
      <Helmet>
        <title>{t(translations.headerTitle)}</title>
        <meta name="description" content={t(translations.headerContent)} />
      </Helmet>
      <Wrapper>
        <h1>{t(translations.todos)}</h1>
        <Container>
          <Form onSubmit={handleForm}>
            <Input
              placeholder={t(translations.keyword)}
              label={t(translations.search)}
              type="text"
              onChange={handleChangeInput}
            />
            <Selector
              label={t(translations.completed)}
              options={options.current}
              onChange={handleChangeSelector}
            />
          </Form>

          {todosList.loading ? (
            <LoadingWrapper key={'loading'}>
              <LoadingIndicator />
            </LoadingWrapper>
          ) : (
            <Table
              key={'table'}
              dataTable={todosList.data!}
              noResult={t(translations.noResult)}
            />
          )}
        </Container>
      </Wrapper>
    </>
  );
}
