import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { CARDS } from '../../data/cards';

describe('Card component', () => {
  test('Card renders', () => {
    render(
      <Card
        name={CARDS[0].name}
        phone={CARDS[0].phone}
        adress={CARDS[0].adress}
        delivery={CARDS[0].delivery}
        payment={CARDS[0].payment}
      />
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
});
