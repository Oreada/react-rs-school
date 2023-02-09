import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage component', () => {
  test('ErrorMessage renders', () => {
    render(<ErrorMessage errorMessage="some test string" />);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
