import React from 'react';
import { ReactNode } from 'react';
import { ICard } from '../components/Card';
import { Form } from '../components/Form';

interface FormPageState {
  cards: Array<ICard>;
}

export class FormsPage extends React.Component<Record<string, never>, FormPageState> {
  addCard = (card: ICard) => {
    this.setState(({ cards }) => {
      const prevCards = [...cards];
      return { cards: [...prevCards, card] };
    });
  };

  state = {
    cards: [],
  };

  render(): ReactNode {
    return (
      <div className="form-page">
        <Form addCard={this.addCard} cards={this.state.cards} />
      </div>
    );
  }
}
