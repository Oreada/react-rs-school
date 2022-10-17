import React, { ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;

  title: string;
  onClose: (newModal: boolean) => void;
}

export class Modal extends React.Component<ModalProps> {
  clickHandler = () => {
    this.props.onClose(false);
  };

  render(): ReactNode {
    return (
      <>
        <div className={styles['modal__overlay']} onClick={this.clickHandler}></div>
        <div className={styles['modal__main']} data-testid="modal-main">
          {/* <h1 className="text-center mb-2 text-2xl">{this.props.title}</h1> */}

          {/* //! тут будет отображаться то содержимое, которое вставлено внутрь <Modal></Modal>: */}
          {this.props.children}
        </div>
      </>
    );
  }
}
