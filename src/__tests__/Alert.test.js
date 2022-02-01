import React from 'react';
import { render as rtlRender, fireEvent, cleanup } from '@testing-library/react';
import Alert from '../components/Alert';
import { AppsProvider } from '../../context/AppsContext'

afterEach(cleanup)

function render(ui, {...options} = {}) {
  function Wrapper(props) {
    return <AppsProvider {...props} />
  }
  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

test("renders a message", () => {
  const { queryByText, getByText } = render(<Alert title='Success!' description='has been released!' visible={true} />);

  expect(queryByText(/Success!/i)).not.toBeNull();

});

test("should show message if success", () => {
  const { queryByText } = render(<Alert title='Congrats!' description='has been saved!' visible={true} />);

  expect(queryByText(/Congrats!/i)).not.toBeNull();
})