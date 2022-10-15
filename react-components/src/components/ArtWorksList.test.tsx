import { render, screen } from '@testing-library/react';
import { ArtWorksList } from './ArtWorksList';

const artWorksListExample = [
  {
    id: 55,
    image_id: 'some',
    artist_title: 'Modigliani',
    date_display: '1915',
    title: 'Madam Pompadour',
  },
  {
    id: 60,
    image_id: 'something',
    artist_title: 'Gauguin',
    date_display: '1892',
    title: 'Te burao',
  },
];

describe('ArtWorksList component', () => {
  test('ArtWorksList renders', () => {
    render(<ArtWorksList data={artWorksListExample} loading={false} errorMessage={''} />);

    expect(screen.getByTestId('artworks-list')).toBeInTheDocument();
  });
});
