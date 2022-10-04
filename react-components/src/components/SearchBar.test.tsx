import { render, screen } from '@testing-library/react';
import { SearchBar } from './SearchBar';
// import userEvent from '@testing-library/user-event';

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
