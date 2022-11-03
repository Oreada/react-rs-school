import React from 'react';
import { Form } from '../../components/Form/Form';
import { useAppSelector } from '../../store/hook';

export function FormsPage() {
  const cardsList = useAppSelector((state) => state.formCards.list); //! так достаём данные из redux store
  console.log(cardsList);

  return (
    <div className="form-page" data-testid="form-page">
      <Form cards={cardsList} />
    </div>
  );
}
