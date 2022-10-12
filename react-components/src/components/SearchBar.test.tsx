import { render, screen } from '@testing-library/react';
import { IArtWork } from './ArtWork';
import { SearchBar } from './SearchBar';
// import userEvent from '@testing-library/user-event';

const changeArtWorks: (newList: Array<IArtWork>) => void = jest.fn();

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

describe('SearchBar', () => {
  test('Calls localStorage setItem on unmount', () => {
    render(<SearchBar changeArtWorks={changeArtWorks} />);
    localStorageMock.setItem = jest.fn();
    const { unmount } = render(<SearchBar changeArtWorks={changeArtWorks} />);
    unmount();
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
  });

  test('SearchBar renders', () => {
    render(<SearchBar changeArtWorks={changeArtWorks} />);

    expect(screen.getByTestId('form-search')).toBeInTheDocument();
  });
});
