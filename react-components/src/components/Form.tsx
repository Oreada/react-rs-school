import React from 'react';
import { ReactNode } from 'react';

interface FormState {
  inputNameText: string;
  inputPhoneText: string;
  textareaText: string;
  selectText: string;
  checkboxText: string;
  showData: {
    name: string;
    phone: string;
    adress: string;
    delivery: string;
    payment: string;
  };
}

export class Form extends React.Component<Record<string, never>, FormState> {
  state = {
    inputNameText: '',
    inputPhoneText: '',
    textareaText: '',
    // selectText: 'Self-delivery',
    selectText: '',
    checkboxText: 'cash',
    showData: {
      name: '',
      phone: '',
      adress: '',
      delivery: '',
      payment: '',
    },
  };

  handleInputNameChange = ({ target: { value } }: { target: { value: string } }) => {
    this.setState({
      inputNameText: value,
    });
  };

  handleInputPhoneChange = ({ target: { value } }: { target: { value: string } }) => {
    this.setState({
      inputPhoneText: value,
    });
  };

  handleTextareaChange = ({ target: { value } }: { target: { value: string } }) => {
    this.setState({
      textareaText: value,
    });
  };

  handleSelectChange = ({ target: { value } }: { target: { value: string } }) => {
    this.setState({
      selectText: value,
    });
  };

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.checked);
    let payment = '';
    if (event.target.checked) {
      payment = 'card';
    } else {
      payment = 'cash';
    }

    this.setState({
      checkboxText: payment,
    });
  };

  handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    this.setState({
      // inputText: '',
      // textareaText: '',
      // selectText: '',
      showData: {
        name: this.state.inputNameText,
        phone: this.state.inputPhoneText,
        adress: this.state.textareaText,
        delivery: this.state.selectText,
        payment: this.state.checkboxText,
      },
    });
  };

  render(): ReactNode {
    return (
      <>
        <form className="form">
          {/* input: NAME */}
          <label className="form-label-input" htmlFor="form-input-name">
            Name:
          </label>
          <input
            className="form-input"
            type="text"
            name="name"
            id="form-input-name"
            value={this.state.inputNameText}
            onChange={this.handleInputNameChange}
          />
          {/* input: PHONE */}
          <label className="form-label-input" htmlFor="form-input-phone">
            Phone number:
          </label>
          <input
            className="form-input"
            type="number"
            name="name"
            id="form-input-phone"
            value={this.state.inputPhoneText}
            onChange={this.handleInputPhoneChange}
          />
          {/* textarea: ADRESS */}
          <label className="form-label-textarea" htmlFor="form-textarea">
            Adress:
          </label>
          <textarea
            className="form-textarea"
            name=""
            id="form-textarea"
            value={this.state.textareaText}
            onChange={this.handleTextareaChange}
          ></textarea>
          {/* select: DELIVERY */}
          <select value={this.state.selectText} onChange={this.handleSelectChange}>
            <option value="">--Delivery method--</option>
            <option value="self-delivery">Self-delivery</option>
            <option value="courier delivery">Courier delivery</option>
          </select>
          {/* checkbox switcher: PAYMENT */}
          <label className="toggle">
            <input
              type="checkbox"
              value={this.state.checkboxText}
              onChange={this.handleCheckboxChange}
            />
            <span className="slider"></span>
            <span className="labels" data-on="card" data-off="cash"></span>
          </label>
          {/* button */}
          <button type="submit" className="form-button" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
        <div className="form-card card">
          <p className="card__item">Name: {this.state.showData.name}</p>
          <p className="card__item">Phone number: {this.state.showData.phone}</p>
          <p className="card__item">Adress: {this.state.showData.adress}</p>
          <p className="card__item">Delivery method: {this.state.showData.delivery}</p>
          <p className="card__item">Payment option: {this.state.showData.payment}</p>
        </div>
      </>
    );
  }
}
