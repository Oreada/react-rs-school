import { render, screen } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { HomePage } from '../../pages/HomePage/HomePage';

// const changeArtWorks: (newList: Array<IArtWorkData>) => void = jest.fn();

const localStorageMock = (function () {
  let store: Record<string, never | string> = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const server = setupServer(
  rest.get('https://api.artic.edu/api/v1/artworks/search', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 123,
            image_id: 'abcd',
            artist_title: 'Amadeo',
            date_display: '1917',
            title: 'Portrait of a Woman',
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('SearchBar', () => {
  test('Place the searching data at HomePage', async () => {
    const { findByText } = render(<HomePage />);
    //const submitButton = await findByTestId('input-submit');
    //userEvent.click(submitButton);

    const element = await findByText(/Amadeo/i);
    expect(element).toBeInTheDocument();
  });

  test('Content format checks', async () => {
    server.use(
      rest.get('https://api.artic.edu/api/v1/artworks/search', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            content: [
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
    const { findByTestId, findByText } = render(<HomePage />);
    const submitButton = await findByTestId('input-submit');
    userEvent.click(submitButton);

    const elementById = await findByTestId('error-message');
    expect(elementById).toBeInTheDocument();

    const elementByText = await findByText(/Incorrect content format/i);
    expect(elementByText).toBeInTheDocument();
  });

  test('Handles failure', async () => {
    server.use(
      rest.get('https://api.artic.edu/api/v1/artworks/search', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    const { findByTestId, findByText } = render(<HomePage />);
    const submitButton = await findByTestId('input-submit');
    userEvent.click(submitButton);

    const elementById = await findByTestId('error-message');
    expect(elementById).toBeInTheDocument();

    const elementByText = await findByText(/status code 404/i);
    expect(elementByText).toBeInTheDocument();
  });

  test('Calls localStorage setItem on unmount', () => {
    render(<SearchBar />);
    localStorageMock.setItem = jest.fn();
    const { unmount } = render(<SearchBar />);
    unmount();
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
  });

  test('SearchBar renders', () => {
    render(<SearchBar />);

    expect(screen.getByTestId('form-search')).toBeInTheDocument();
  });
});
