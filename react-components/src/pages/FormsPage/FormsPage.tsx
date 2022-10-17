import React from 'react';
import { ReactNode } from 'react';
import { ICard } from '../../components/Card/Card';
import { Form } from '../../components/Form/Form';

interface FormPageState {
  cards: Array<ICard>;
}

export class FormsPage extends React.Component<Record<string, never>, FormPageState> {
  state = {
    cards: [],
  };

  addCard = (card: ICard) => {
    this.setState(({ cards }) => {
      const prevCards = [...cards];
      return { cards: [...prevCards, card] };
    });
  };

  render(): ReactNode {
    return (
      <div className="form-page" data-testid="form-page">
        <Form addCard={this.addCard} cards={this.state.cards} />
      </div>
    );
  }
}
