import React, { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ onCloseModal, data }) => {
  const onKeyDown = event => {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  };

  const onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div>
      <div onClick={onOverlayClick} className={css.overlay}>
        <div className={css.modal}>
          <button onClick={onCloseModal} className={css.closeModalBtn}>
            &times;
          </button>
          <img className={css.imageLarge} src={data} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
