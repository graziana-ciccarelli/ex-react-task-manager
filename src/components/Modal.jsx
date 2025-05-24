import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root') || document.body;

function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-modal"
          onClick={onClose}
          aria-label="Chiudi modale"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
