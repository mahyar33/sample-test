import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table } from '../index';

const renderWithProps = (props: Parameters<typeof Table>[number]) =>
  render(<Table {...props} />);

describe('<Table />', () => {
  const props: Parameters<typeof Table>[number] = {
    noResult: 'text',
    dataTable: [
      { userId: 1, id: 1, title: 'hi', completed: true },
      { userId: 2, id: 2, title: 'hello', completed: false },
    ],
  };
  it('should render an <table> tag', () => {
    const table = renderWithProps(props);
    expect(table.container.querySelector('table')).toBeInTheDocument();
  });
  it('should match snapshot', () => {
    const table = renderWithProps(props);
    expect(table.container.firstChild).toMatchSnapshot();
  });
  it('should have 2 rows in tbody', () => {
    const table = renderWithProps(props);
    expect(table.container.querySelectorAll('tbody tr').length).toBe(2);
  });
  it('should have props displayed', () => {
    const table = renderWithProps(props);
    expect(
      table.queryByText(props.dataTable[0].title, { exact: false }),
    ).toBeInTheDocument();
  });
  it('should show noResult', () => {
    props.dataTable = [];
    const table = renderWithProps(props);
    expect(table.queryByText(props.noResult)).toBeInTheDocument();
  });
  it('should match snapshot with noResult', () => {
    const table = renderWithProps(props);
    expect(table.container.firstChild).toMatchSnapshot();
  });
});
