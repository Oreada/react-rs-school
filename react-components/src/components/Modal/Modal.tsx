import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;

  title: string;
  onClose: (newModal: boolean) => void;
}

export function Modal(props: ModalProps) {
  const clickHandler = () => {
    props.onClose(false);
  };

  return (
    <>
      <div className={styles['modal__overlay']} onClick={clickHandler}></div>
      <div className={styles['modal__main']} data-testid="modal-main">
        {/* <h1 className="text-center mb-2 text-2xl">{this.props.title}</h1> */}

        {/* //! тут будет отображаться то содержимое, которое вставлено внутрь <Modal></Modal>: */}
        {props.children}
      </div>
    </>
  );
}
