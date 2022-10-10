import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from './Form';
import { CARDS } from '../data/cards';
import { ICard } from './Card';

const addCardFunc: (card: ICard) => void = jest.fn();

describe('Form component', () => {
  test('Calls addCardFunc with submit', () => {
    render(<Form addCard={addCardFunc} cards={CARDS} />);

    (document.getElementById('form-input-name') as HTMLInputElement).value = 'Olga';
    (document.getElementById('form-input-phone') as HTMLInputElement).value = '777';
    (document.getElementById('form-textarea') as HTMLTextAreaElement).value = 'Moldova';
    (document.getElementById('form-select') as HTMLSelectElement).value = 'self-delivery';
    (document.getElementById('form-checkbox') as HTMLInputElement).checked = true;
    const formButton = screen.getByTestId('form-button');
    formButton.removeAttribute('disabled');
    userEvent.click(formButton);

    expect(addCardFunc).toHaveBeenCalledTimes(1);
  });

  test('Submit is disabled', () => {
    render(<Form addCard={addCardFunc} cards={CARDS} />);

    expect(screen.getByTestId('form-button')).toBeDisabled();
  });

  test('Input value displays', () => {
    render(<Form addCard={addCardFunc} cards={CARDS} />);
    (document.getElementById('form-input-name') as HTMLInputElement).value = 'Olga';

    const inputName = screen.getByDisplayValue('Olga');

    expect(inputName.id).toMatch('form-input-name');
  });

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
