import React from 'react';
import { ICard } from '../../components/Card/Card';
import { Form } from '../../components/Form/Form';
import { storeFormCards } from '../../store/store';
import { FormContext } from '../../context';

export function FormsPage() {
  // const [cardsList, setCardsList] = useState<Array<ICard>>([]);

  const addCard = (card: ICard) => {
    // setCardsList((prev) => [...prev, card]);
    storeFormCards.push(card);
  };

  return (
    <FormContext.Provider value={{ addCard }}>
      <div className="form-page" data-testid="form-page">
        <Form cards={storeFormCards} />
      </div>
    </FormContext.Provider>
  );
}
