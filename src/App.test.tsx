import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('render quay app', () => {
  render(<App />);
  const linkElement = screen.getByText(/quay/i);
  expect(linkElement).toBeInTheDocument();
});
