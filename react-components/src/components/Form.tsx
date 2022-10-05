import React from 'react';
import { ReactNode } from 'react';

interface FormState {
  inputText: string;
  textareaText: string;
  selectText: string;
  showData: {
    name: string;
    text: string;
    position: string;
  };
}

export class Form extends React.Component<Record<string, never>, FormState> {
  state = {
    inputText: '',
    textareaText: '',
    // selectText: 'Front-end developer',
    selectText: '',
    showData: {
      name: '',
      text: '',
      position: '',
    },
  };

  handleInputChange = ({ target: { value } }: { target: { value: string } }) => {
    this.setState({
      inputText: value,
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

  handleShow = (event: React.MouseEvent) => {
    event.preventDefault();
    this.setState({
      // inputText: '',
      // textareaText: '',
      // selectText: '',
      showData: {
        name: this.state.inputText,
        text: this.state.textareaText,
        position: this.state.selectText,
      },
    });
  };

  render(): ReactNode {
    return (
      <>
        <form className="form">
          {/* input text */}
          <label className="form-label-input" htmlFor="form-input">
            Name:
          </label>
          <input
            className="form-input"
            type="text"
            name="name"
            id="form-input"
            value={this.state.inputText}
            onChange={this.handleInputChange}
          />
          {/* textarea */}
          <label className="form-label-textarea" htmlFor="form-textarea">
            Some info:
          </label>
          <textarea
            className="form-textarea"
            name=""
            id="form-textarea"
            value={this.state.textareaText}
            onChange={this.handleTextareaChange}
          ></textarea>
          {/* select */}
          <select value={this.state.selectText} onChange={this.handleSelectChange}>
            <option value="">--Choose your position--</option>
            <option value="Front-end developer">Front-end developer</option>
            <option value="Back-end developer">Back-end developer</option>
          </select>
          {/* button */}
          <button className="form-button" onClick={this.handleShow}>
            Show
          </button>
        </form>

        <h2>{this.state.showData.name}</h2>
        <h3>{this.state.showData.text}</h3>
        <h3>{this.state.showData.position}</h3>
      </>
    );
  }
}
