import { render, screen } from '@testing-library/react';
import { Form } from './Form';
import { CARDS } from '../data/cards';
import { ICard } from './Card';

const addCardFunc: (card: ICard) => void = jest.fn();

describe('Form component', () => {
  test('Form renders', () => {
    render(<Form addCard={addCardFunc} cards={CARDS} />);

    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  test('Input name renders', () => {
    render(<Form addCard={addCardFunc} cards={CARDS} />);

    expect(screen.getByTestId('form-input-name')).toBeInTheDocument();
  });

  test('Input phone renders', () => {
    render(<Form addCard={addCardFunc} cards={CARDS} />);

    expect(screen.getByTestId('form-input-phone')).toBeInTheDocument();
  });

  test('Textarea renders', () => {
    render(<Form addCard={addCardFunc} cards={CARDS} />);

    expect(screen.getByTestId('form-textarea')).toBeInTheDocument();
  });

  test('Select renders', () => {
    render(<Form addCard={addCardFunc} cards={CARDS} />);

    expect(screen.getByTestId('form-select')).toBeInTheDocument();
  });

  test('Checkbox renders', () => {
    render(<Form addCard={addCardFunc} cards={CARDS} />);

    expect(screen.getByTestId('form-checkbox')).toBeInTheDocument();
  });
});
