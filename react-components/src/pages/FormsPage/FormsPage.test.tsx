import { render, screen } from '@testing-library/react';
import { FormsPage } from './FormsPage';

describe('FormsPage component', () => {
  test('FormsPage renders', () => {
    render(<FormsPage />);

    expect(screen.getByTestId('form-page')).toBeInTheDocument();
  });
});
