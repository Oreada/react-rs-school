import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './Navigation';

describe('Navigation component', () => {
  test('Navigation renders', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });
});
