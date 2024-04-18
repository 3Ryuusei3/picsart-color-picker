import React from 'react';

export const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='modal'>
      <div className='modal__content'>
        <span className='modal__content--close' onClick={closeModal}>×</span>
        {children}
      </div>
    </div>
  );
};
