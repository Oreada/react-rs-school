import React, { ReactNode } from 'react';
import { ICard, Card } from './Card';

interface CardsListProps {
  data: Array<ICard>;
}

export class CardsList extends React.Component<CardsListProps> {
  constructor(props: CardsListProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div className="cards__list" data-testid="cards-list">
        {this.props.data.map((card: ICard, index: number) => (
          <Card
            key={index}
            name={card.name}
            phone={card.phone}
            adress={card.adress}
            delivery={card.delivery}
            payment={card.payment}
          />
        ))}
      </div>
    );
  }
}