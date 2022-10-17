import React from 'react';
import { ReactNode } from 'react';
import { ICard } from '../Card/Card';
import { CardsList } from '../CardsList/CardsList';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import styles from './Form.module.css';

interface FormProps {
  addCard: (card: ICard) => void;
  cards: Array<ICard>;
}

interface FormState {
  nameField: string;
  phoneField: string;
  adressField: string;
  deliveryField: string;
  paymentField: boolean;
  nameErrorMessage: string;
  phoneErrorMessage: string;
  adressErrorMessage: string;
  deliveryErrorMessage: string;
  isSubmitted: boolean;
  isDisabled: boolean;
}

export class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
  }

  state = {
    nameField: '',
    phoneField: '',
    adressField: '',
    deliveryField: '',
    paymentField: false,
    nameErrorMessage: '',
    phoneErrorMessage: '',
    adressErrorMessage: '',
    deliveryErrorMessage: '',
    isSubmitted: false,
    isDisabled: true,
  };

  refNameField: React.RefObject<HTMLInputElement> = React.createRef();
  refPhoneField: React.RefObject<HTMLInputElement> = React.createRef();
  refAdressField: React.RefObject<HTMLTextAreaElement> = React.createRef();
  refDeliveryField: React.RefObject<HTMLSelectElement> = React.createRef();
  refPaymentField: React.RefObject<HTMLInputElement> = React.createRef();

  handleChange = (): void => {
    this.setState({
      isDisabled: false,
    });
  };

  validateFields = () => {
    let isValid = true;

    if (!this.state.nameField.length) {
      isValid = false;
      this.setState({
        nameErrorMessage: 'Enter your name',
      });
    } else if (!/^[ a-zA-Zа-яА-Я]+$/.test(this.state.nameField)) {
      isValid = false;
      this.setState({
        nameErrorMessage: 'The name must contain only letters',
      });
    } else {
      this.setState({
        nameErrorMessage: '',
      });
    }

    if (!this.state.phoneField.length) {
      isValid = false;
      this.setState({
        phoneErrorMessage: 'Enter your phone number',
      });
    } else {
      this.setState({
        phoneErrorMessage: '',
      });
    }

    if (!this.state.adressField.length) {
      isValid = false;
      this.setState({
        adressErrorMessage: 'Enter your adress',
      });
    } else {
      this.setState({
        adressErrorMessage: '',
      });
    }

    if (!this.state.deliveryField) {
      isValid = false;
      this.setState({
        deliveryErrorMessage: 'Choose a delivery method',
      });
    } else {
      this.setState({
        deliveryErrorMessage: '',
      });
    }

    this.setState({
      isDisabled: !isValid,
    });

    return isValid;
  };

  onSubmit = (): void => {
    const isValid = this.validateFields();
    console.log(isValid);

    if (isValid) {
      this.setState({
        isSubmitted: true,
        isDisabled: true,
      });

      this.props.addCard({
        name: this.state.nameField,
        phone: this.state.phoneField,
        adress: this.state.adressField,
        delivery: this.state.deliveryField,
        payment: this.state.paymentField ? 'card' : 'cash',
      });

      (this.refNameField.current as HTMLInputElement).value = '';
      (this.refPhoneField.current as HTMLInputElement).value = '';
      (this.refAdressField.current as HTMLTextAreaElement).value = '';
      (this.refDeliveryField.current as HTMLSelectElement).value = '';
      (this.refPaymentField.current as HTMLInputElement).checked = false;

      setTimeout(() => {
        this.setState({
          isSubmitted: false,
        });
      }, 3000);
    } else {
      console.log('Enter the valid data into fields');
    }
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState(
      {
        nameField: (this.refNameField.current as HTMLInputElement).value,
        phoneField: (this.refPhoneField.current as HTMLInputElement).value,
        adressField: (this.refAdressField.current as HTMLTextAreaElement).value,
        deliveryField: (this.refDeliveryField.current as HTMLSelectElement).value,
        paymentField: (this.refPaymentField.current as HTMLInputElement).checked,
      },
      () => this.onSubmit()
    );
  };

  render(): ReactNode {
    return (
      <>
        <form
          className={styles['form']}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          id="form"
          data-testid="form"
        >
          <label className={styles['form-label-input']} htmlFor="form-input-name">
            Name:
          </label>
          <input
            className={styles['form-input']}
            type="text"
            name="name"
            id="form-input-name"
            ref={this.refNameField}
            data-testid="form-input-name"
          />
          {this.state.nameErrorMessage && (
            <ErrorMessage errorMessage={this.state.nameErrorMessage} />
          )}
          <label className={styles['form-label-input']} htmlFor="form-input-phone">
            Phone number:
          </label>
          <input
            className={styles['form-input']}
            type="number"
            name="name"
            id="form-input-phone"
            ref={this.refPhoneField}
            data-testid="form-input-phone"
          />
          {this.state.phoneErrorMessage && (
            <ErrorMessage errorMessage={this.state.phoneErrorMessage} />
          )}
          <label className={styles['form-label-textarea']} htmlFor="form-textarea">
            Adress:
          </label>
          <textarea
            className={styles['form-textarea']}
            name=""
            id="form-textarea"
            ref={this.refAdressField}
            data-testid="form-textarea"
          ></textarea>
          {this.state.adressErrorMessage && (
            <ErrorMessage errorMessage={this.state.adressErrorMessage} />
          )}
          <select
            className={styles['form-select']}
            ref={this.refDeliveryField}
            id="form-select"
            data-testid="form-select"
          >
            <option value="">--Delivery method--</option>
            <option value="self-delivery">Self-delivery</option>
            <option value="courier delivery">Courier delivery</option>
          </select>
          {this.state.deliveryErrorMessage && (
            <ErrorMessage errorMessage={this.state.deliveryErrorMessage} />
          )}
          <label className={styles['toggle']}>
            <input
              type="checkbox"
              ref={this.refPaymentField}
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
            disabled={this.state.isDisabled}
            data-testid="form-button"
          >
            Submit
          </button>
          <div
            className={styles['form-saved']}
            style={this.state.isSubmitted ? { visibility: 'visible' } : { visibility: 'hidden' }}
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
        <CardsList data={this.props.cards} />
      </>
    );
  }
}
