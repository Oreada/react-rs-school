import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('https://api.artic.edu/api/v1/artworks/search', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 123,
            image_id: 'rtyu',
            artist_title: 'qwerty',
            date_display: 'dsdsds',
            title: 'gdfgdf',
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('HomePage component', () => {
  test('Place the data at HomePage', async () => {
    const { findByText } = render(<HomePage />);
    const element = await findByText(/dsdsds/i);
    expect(element).toBeInTheDocument();
  });

  test('Handles failure', async () => {
    server.use(
      rest.get('https://api.artic.edu/api/v1/artworks/search', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    const { findByText, findByTestId } = render(<HomePage />);
    const elementById = await findByTestId('error-message');
    expect(elementById).toBeInTheDocument();

    const elementByText = await findByText(/status code 404/i);
    expect(elementByText).toBeInTheDocument();
  });

  test('HomePage renders', () => {
    render(<HomePage />);

    expect(screen.getByTestId('home-page')).toBeInTheDocument;
  });
});
