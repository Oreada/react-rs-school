import { render, screen } from '@testing-library/react';
import { Details } from './Details';

const detailsExample = {
  artist_display: 'Amedeo Modigliani Italian, 1884–1920',
  artist_title: 'Amedeo Modigliani',
  artwork_type_title: 'Painting',
  date_display: '1915',
  dimensions: '61.1 × 50.2 cm (24 1/16 × 19 3/4 in.)',
  id: 27281,
  image_id: 'fdc1a755-ff86-487d-f16b-f03c40a30bee',
  title: 'Madam Pompadour',
};

describe('Details component', () => {
  test('Details renders', () => {
    render(<Details data={detailsExample} />);

    expect(screen.getByText(/Madam Pompadour/i)).toBeInTheDocument();
    expect(screen.getByTestId('details')).toBeInTheDocument();
  });
});
