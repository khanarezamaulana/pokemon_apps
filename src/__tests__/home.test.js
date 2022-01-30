import React from 'react';
import { render } from '@testing-library/react';
import Home from '../pages/home';

test('renders a message', () => {
  const { container, getByText } = render(<Home />);
  expect(getByText('Total Pokemon')).toBeInTheDocument();
  // expect(container.firstChild).toMatchInlineSnapshot(`
  //   <span>
  //     Created by Khana Reza Maulana
  //   </span>
  // `);
});