import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from './Form';
import { CARDS } from '../data/cards';
import { ICard } from './Card';

const addCardFunc: (card: ICard) => void = jest.fn();

describe('Form component', () => {
  test('Passes validation and Calls addCard after a submit', () => {
    render(<Form addCard={addCardFunc} cards={CARDS} />);

    fireEvent.change(screen.getByTestId('form-input-name'), { target: { value: '1111' } });
    fireEvent.change(screen.getByTestId('form-input-phone'), { target: { value: '' } });
    fireEvent.change(screen.getByTestId('form-textarea'), { target: { value: '' } });
    fireEvent.change(screen.getByTestId('form-select'), { target: { value: '' } });
    fireEvent.change(screen.getByTestId('form-checkbox'), { target: { checked: true } });

    const formButton = screen.getByTestId('form-button');
    userEvent.click(formButton);

    fireEvent.change(screen.getByTestId('form-input-name'), { target: { value: '' } });
    userEvent.click(formButton);

    fireEvent.change(screen.getByTestId('form-input-name'), { target: { value: 'Olga' } });
    fireEvent.change(screen.getByTestId('form-input-phone'), { target: { value: '777' } });
    fireEvent.change(screen.getByTestId('form-textarea'), { target: { value: 'Moldova' } });
    fireEvent.change(screen.getByTestId('form-select'), { target: { value: 'self-delivery' } });
    fireEvent.change(screen.getByTestId('form-checkbox'), { target: { checked: true } });
    userEvent.click(formButton);

    expect(addCardFunc).toHaveBeenCalledTimes(1);
  });

  test('Submit is disabled', () => {
    render(<Form addCard={addCardFunc} cards={CARDS} />);

    expect(screen.getByTestId('form-button')).toBeDisabled();
  });

  test('Input value displays', () => {
    render(<Form addCard={addCardFunc} cards={CARDS} />);
    // (document.getElementById('form-input-name') as HTMLInputElement).value = 'Olga';
    fireEvent.change(screen.getByTestId('form-input-name'), { target: { value: 'Olga' } });

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
