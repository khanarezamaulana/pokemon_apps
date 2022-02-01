import React from 'react';
import { render as rtlRender, fireEvent, cleanup } from '@testing-library/react';
import Tabs from '../components/Tabs';
import { AppsProvider } from '../../context/AppsContext'

afterEach(cleanup)

function render(ui, {...options} = {}) {
  function Wrapper(props) {
    return <AppsProvider {...props} />
  }
  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

test("renders a message", () => {
  const { queryByText, getByText } = render(<Tabs activeTab='pokemons' />);

  expect(queryByText(/pokemons/i)).toBeNull();

  // fireEvent.click(getByText(/pokemons/i));
  // expect(getByText(/pokemons/i)).not.toBeNull();

});

test("should show message", () => {
  const { queryByText } = render(<Tabs activeTab='mypokemons' />);

  expect(queryByText(/mypokemons/i)).toBeNull();
})