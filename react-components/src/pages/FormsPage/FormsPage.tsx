import React, { useState } from 'react';
import { ICard } from '../../components/Card/Card';
import { Form } from '../../components/Form/Form';

export function FormsPage() {
  const [cardsList, setCardsList] = useState<Array<ICard>>([]);

  const addCard = (card: ICard) => {
    setCardsList((prev) => [...prev, card]);
  };

  return (
    <div className="form-page" data-testid="form-page">
      <Form addCard={addCard} cards={cardsList} />
    </div>
  );
}
