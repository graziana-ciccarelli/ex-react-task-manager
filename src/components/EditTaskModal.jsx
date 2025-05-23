import { useState, useEffect } from "react";
import Modal from "./Modal";

function EditTaskModal({ show, onClose, task, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To do");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title,
      description,
      status,
    };
    onSave(updatedTask); // Invia il task aggiornato
  };

  return (
    <Modal
      title="Modifica Task"
      show={show}
      onClose={onClose}
      onConfirm={handleSubmit}
      confirmText="Salva"
      content={
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Titolo:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Descrizione:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="status">Stato:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </form>
      }
    />
  );
}

export default EditTaskModal;
