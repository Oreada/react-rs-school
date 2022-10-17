import { render, screen } from '@testing-library/react';
import { ErrorPage } from './ErrorPage';

describe('ErrorPage component', () => {
  test('ErrorPage renders', () => {
    render(<ErrorPage />);

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
