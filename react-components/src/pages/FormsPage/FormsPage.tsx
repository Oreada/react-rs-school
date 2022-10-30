import React from 'react';
import { Form } from '../../components/Form/Form';
import { useFormContext } from '../../context';

export function FormsPage() {
  const { cardsList, setCardsList } = useFormContext();

  return (
    <div className="form-page" data-testid="form-page">
      <Form cards={cardsList} />
    </div>
  );
}
