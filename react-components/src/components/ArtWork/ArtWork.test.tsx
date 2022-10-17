import { render, screen, waitFor } from '@testing-library/react';
import { ArtWork } from './ArtWork';
import { IDetailsData } from '../ArtWorksList/ArtWorksList';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { HomePage } from '../../pages/HomePage';

const artWorkExample = {
  id: 55,
  image_id: 'some',
  artist_title: 'Modigliani',
  date_display: '1915',
  title: 'Madam Pompadour',
};

const onClickExample: (newModal: boolean) => void = jest.fn();
const forDetailsExample: (dataDetails: IDetailsData | null, loadingDetails: boolean) => void =
  jest.fn();

const server = setupServer(
  rest.get('https://api.artic.edu/api/v1/artworks/27281', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          artist_display: 'Amedeo Modigliani Italian, 1884–1920',
          artist_title: 'Amedeo Modigliani',
          artwork_type_title: 'Painting',
          date_display: '1915',
          dimensions: '61.1 × 50.2 cm (24 1/16 × 19 3/4 in.)',
          id: 27281,
          image_id: 'fdc1a755-ff86-487d-f16b-f03c40a30bee',
          title: 'Madam Pompadour',
        },
      })
    );
  }),
  rest.get('https://api.artic.edu/api/v1/artworks/search', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            artist_display: 'Amedeo Modigliani Italian, 1884–1920',
            artist_title: 'Amedeo Modigliani',
            artwork_type_title: 'Painting',
            date_display: '1915',
            dimensions: '61.1 × 50.2 cm (24 1/16 × 19 3/4 in.)',
            id: 27281,
            image_id: 'fdc1a755-ff86-487d-f16b-f03c40a30bee',
            title: 'Madam Pompadour',
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('ArtWork component', () => {
  test('Get the Details after clicking on the button', async () => {
    const { findByTestId } = render(<HomePage />);

    const detailsButton = await findByTestId('artwork-button');
    userEvent.click(detailsButton);

    await waitFor(() => {
      expect(screen.getByText(/Painting/i)).toBeInTheDocument();
    });
  });

  test('ArtWork renders', () => {
    render(
      <ArtWork
        key={artWorkExample.id}
        id={artWorkExample.id}
        image_id={artWorkExample.image_id}
        artist_title={artWorkExample.artist_title}
        date_display={artWorkExample.date_display}
        title={artWorkExample.title}
        onClick={onClickExample}
        forDetails={forDetailsExample}
      />
    );

    expect(screen.getByTestId('artwork')).toBeInTheDocument();
  });
});
