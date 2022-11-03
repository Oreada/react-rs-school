import React, { useState } from 'react';
import { ICard } from '../Card/Card';
import { CardsList } from '../CardsList/CardsList';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './Form.module.css';
import { useAppDispatch } from '../../store/hook';
import { addFormCard } from '../../store/formCardsSlice';
import { store } from '../../store';

interface FormProps {
  cards: Array<ICard>;
}

interface FormValues {
  nameField: string;
  phoneField: string;
  adressField: string;
  deliveryField: string;
  paymentField: boolean;
}

export function Form(props: FormProps) {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // const dispatch = useAppDispatch(); //! так почему-то не работает - ???

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setIsSubmitted(() => true);

    store.dispatch(
      addFormCard({
        name: data.nameField,
        phone: data.phoneField,
        adress: data.adressField,
        delivery: data.deliveryField,
        payment: data.paymentField ? 'card' : 'cash',
      })
    );

    reset(); //! очищает поля формы после успешного сабмита

    setTimeout(() => {
      setIsSubmitted(() => false);
    }, 3000);
  };

  return (
    <>
      <form
        className={styles['form']}
        onSubmit={handleSubmit(onSubmit)}
        id="form"
        data-testid="form"
      >
        <label className={styles['form-label-input']} htmlFor="form-input-name">
          Name:
        </label>
        <input
          {...register('nameField', {
            required: 'Enter your name',
            pattern: {
              value: /^[ a-zA-Zа-яА-Я]+$/,
              message: 'The name must contain only letters',
            },
          })}
          className={styles['form-input']}
          type="text"
          id="form-input-name"
          data-testid="form-input-name"
        />
        {errors?.nameField && <ErrorMessage errorMessage={errors?.nameField?.message as string} />}

        <label className={styles['form-label-input']} htmlFor="form-input-phone">
          Phone number:
        </label>
        <input
          {...register('phoneField', {
            required: 'Enter your phone number',
          })}
          className={styles['form-input']}
          type="number"
          id="form-input-phone"
          data-testid="form-input-phone"
        />
        {errors?.phoneField && (
          <ErrorMessage errorMessage={errors?.phoneField?.message as string} />
        )}

        <label className={styles['form-label-textarea']} htmlFor="form-textarea">
          Adress:
        </label>
        <textarea
          {...register('adressField', {
            required: 'Enter your adress',
          })}
          className={styles['form-textarea']}
          id="form-textarea"
          data-testid="form-textarea"
        ></textarea>
        {errors?.adressField && (
          <ErrorMessage errorMessage={errors?.adressField?.message as string} />
        )}

        <select
          {...register('deliveryField', {
            required: 'Choose a delivery method',
          })}
          className={styles['form-select']}
          id="form-select"
          data-testid="form-select"
        >
          <option value="">--Delivery method--</option>
          <option value="self-delivery">Self-delivery</option>
          <option value="courier delivery">Courier delivery</option>
        </select>
        {errors?.deliveryField && (
          <ErrorMessage errorMessage={errors?.deliveryField?.message as string} />
        )}

        <label className={styles['toggle']}>
          <input
            {...register('paymentField')}
            type="checkbox"
            id="form-checkbox"
            data-testid="form-checkbox"
          />
          <span className={styles['slider']}></span>
          <span className={styles['labels']} data-on="card" data-off="cash"></span>
        </label>

        <button
          type="submit"
          className={styles['form-button']}
          value="Submit"
          disabled={!isDirty}
          data-testid="form-button"
        >
          Submit
        </button>
        <div
          className={styles['form-saved']}
          style={isSubmitted ? { visibility: 'visible' } : { visibility: 'hidden' }}
        >
          <img
            className={styles['form-saved__icon']}
            src="./images/checked-icon.svg"
            width="20px"
            height="20px"
            alt="Checked"
          />
          <p className={styles['form-saved__text']}>The data was successfully saved</p>
        </div>
      </form>
      <CardsList data={props.cards} />
    </>
  );
}
