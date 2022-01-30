/**
 * @jest-environment jsdom
 */

// import { render, fireEvent, screen } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'
import Home from '../home'

test('Home', () => {
  render(<Home />)
  const element = document.createElement('div');
  expect(element).not.toBeNull();
})