import { render, screen } from '@testing-library/react';
import { CardsList } from './CardsList';
import { CARDS } from '../data/cards';

describe('CardsList component', () => {
  test('CardsList renders', () => {
    render(<CardsList data={CARDS} />);

    expect(screen.getByTestId('cards-list')).toBeInTheDocument();
  });
});
