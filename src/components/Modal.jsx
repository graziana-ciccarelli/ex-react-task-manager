import ReactDOM from 'react-dom';

function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div>{content}</div>
        <div className="modal-buttons">
          <button onClick={onClose}>Annulla</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
