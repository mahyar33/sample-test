import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Selector } from '../index';

const renderWithProps = (props: Parameters<typeof Selector>[number]) =>
  render(<Selector {...props} />);

describe('<Selector />', () => {
  const props: Parameters<typeof Selector>[number] = {
    label: 'text',
    options: [
      { text: 'yes', value: 'yes' },
      { text: 'no', value: 'no' },
    ],
    onChange: jest.fn(),
  };
  it('should render an <select> tag', () => {
    const selector = renderWithProps(props);
    expect(selector.container.querySelector('select')).toBeInTheDocument();
  });
  it('should render an <label> tag', () => {
    const selector = renderWithProps(props);
    expect(selector.container.querySelector('label')).toBeInTheDocument();
  });
  it('should match snapshot', () => {
    const selector = renderWithProps(props);
    expect(selector.container.firstChild).toMatchSnapshot();
  });
  it('should have props', () => {
    const selector = renderWithProps(props);
    expect(selector.container.querySelector('select')).toHaveAttribute(
      'name',
      props.label,
    );
  });
  it('should have props displayed', () => {
    const selector = renderWithProps(props);
    expect(
      selector.queryByText(props.label, { exact: false }),
    ).toBeInTheDocument();
  });
  it('should call onChange', () => {
    const selector = renderWithProps(props);
    userEvent.selectOptions(
      selector.getByLabelText(props.label, { exact: false }),
      'yes',
    );
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
  it('should select option', () => {
    const selector = renderWithProps(props);
    userEvent.selectOptions(
      selector.getByLabelText(props.label, { exact: false }),
      'yes',
    );
    const option = selector.getByText('yes') as HTMLOptionElement;
    expect(option.selected).toBe(true);
  });
  it('should have 2 options', () => {
    const selector = renderWithProps(props);
    expect(selector.queryAllByRole('option').length).toBe(2);
  });
});
