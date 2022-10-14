import { render } from '@testing-library/react';
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

test('Place the data at HomePage', async () => {
  const { findByText } = render(<HomePage />);
  const element = await findByText(/dsdsds/i);
  expect(element).toBeInTheDocument();
});
