import React from 'react';
import { render as rtlRender, fireEvent, cleanup } from '@testing-library/react';
import Modal from '../components/Modal';
import { AppsProvider } from '../../context/AppsContext'

afterEach(cleanup)

function render(ui, {...options} = {}) {
  function Wrapper(props) {
    return <AppsProvider {...props} />
  }
  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

test("renders a message", () => {
  const { queryByText, getByText } = render(<Modal title='Yeay, Catched!' />);

  expect(queryByText(/Yeay, Catched!/i)).toBeNull();

});

test("should show message if success", () => {
  const { queryByText } = render(<Modal title='Whoops!' />);

  expect(queryByText(/Whoops!/i)).toBeNull();
})