import React from 'react';
import { StyledTable } from './styled';
import { TodosDataType } from '../../containers/HomePage/types';
import { Alert } from '../Alert';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/i18n';

type tableProps = {
  dataTable: Array<TodosDataType>;
  noResult: string;
};

export const Table = React.memo(({ dataTable, noResult }: tableProps) => {
  const { t } = useTranslation();

  return dataTable.length !== 0 ? (
    <StyledTable>
      <thead>
        <tr>
          <th>#</th>
          <th>{t(translations.title)}</th>
          <th>{t(translations.completed)}</th>
        </tr>
      </thead>
      <tbody>
        {dataTable.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{t(translations[item.completed.toString()])}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  ) : (
    <Alert key={'alert'} textAlert={noResult} />
  );
});
