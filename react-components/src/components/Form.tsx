import React from 'react';
import { ReactNode } from 'react';
import { ICard } from './Card';
import { CardsList } from './CardsList';
import { ErrorMessage } from './ErrorMessage';

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
  errorMessage: string;
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
    errorMessage: '',
  };

  refNameField: React.RefObject<HTMLInputElement> = React.createRef();
  refPhoneField: React.RefObject<HTMLInputElement> = React.createRef();
  refAdressField: React.RefObject<HTMLTextAreaElement> = React.createRef();
  refDeliveryField: React.RefObject<HTMLSelectElement> = React.createRef();
  refPaymentField: React.RefObject<HTMLInputElement> = React.createRef();

  validateFields = () => {
    // let isValid = true;

    if (!this.state.nameField.length) {
      // isValid = false;
      this.setState({
        errorMessage: 'Enter your name',
      });
      console.log('Enter your name');
    } else {
      this.setState({
        errorMessage: '',
      });
    }
  };

  onSubmit = (): void => {
    this.validateFields();

    this.props.addCard({
      name: this.state.nameField,
      phone: this.state.phoneField,
      adress: this.state.adressField,
      delivery: this.state.deliveryField,
      payment: this.state.paymentField ? 'card' : 'cash',
    });
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
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="form-label-input" htmlFor="form-input-name">
            Name:
          </label>
          <input
            className="form-input"
            type="text"
            name="name"
            id="form-input-name"
            ref={this.refNameField}
          />
          {this.state.errorMessage && <ErrorMessage errorMessage={this.state.errorMessage} />}
          {/* <ErrorMessage errorMessage={'my test message'} /> */}
          {/* {this.state.errorMessage} */}

          <label className="form-label-input" htmlFor="form-input-phone">
            Phone number:
          </label>
          <input
            className="form-input"
            type="number"
            name="name"
            id="form-input-phone"
            ref={this.refPhoneField}
          />

          <label className="form-label-textarea" htmlFor="form-textarea">
            Adress:
          </label>
          <textarea
            className="form-textarea"
            name=""
            id="form-textarea"
            ref={this.refAdressField}
          ></textarea>

          <select className="form-select" ref={this.refDeliveryField}>
            <option value="">--Delivery method--</option>
            <option value="self-delivery">Self-delivery</option>
            <option value="courier delivery">Courier delivery</option>
          </select>

          <label className="toggle">
            <input type="checkbox" ref={this.refPaymentField} />
            <span className="slider"></span>
            <span className="labels" data-on="card" data-off="cash"></span>
          </label>

          <button type="submit" className="form-button" value="Submit">
            Submit
          </button>
        </form>
        <CardsList data={this.props.cards} />
      </>
    );
  }
}
