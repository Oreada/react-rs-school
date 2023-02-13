import React from 'react';
import { Form } from '../../components/Form/Form';
import { useAppSelector } from '../../store/hook';

export function FormsPage() {
  const cardsList = useAppSelector((state) => state.formCards.list); //! так достаём данные из redux store

  return (
    <div className="container">
      <div className="form-page" data-testid="form-page">
        <h2 className="form-title">Here you can order one of our beautiful postcards</h2>
        <Form cards={cardsList} />
      </div>
    </div>
  );
}
