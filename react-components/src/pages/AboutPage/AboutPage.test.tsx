import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';

describe('AboutPage component', () => {
  test('AboutPage renders', () => {
    render(<AboutPage />);

    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });
});
