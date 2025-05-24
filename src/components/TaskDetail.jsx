import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);
  const [task, setTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
    status: 'To do',
  });

  useEffect(() => {
    const found = tasks.find((t) => t.id === parseInt(id));
    if (found) {
      setTask(found);
      setEditedTask({
        title: found.title,
        description: found.description,
        status: found.status,
      });
    } else {
      navigate("/");
    }
  }, [id, tasks, navigate]);

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminato");
      navigate("/");
    } catch (err) {
      alert("Errore: " + err.message);
    }
  };

  const handleUpdate = async () => {
    const updated = {
      ...task,
      ...editedTask,
    };

    try {
      await updateTask(updated);
      alert("Task aggiornato");
      setIsModalOpen(false);
      setTask(updated);
    } catch (err) {
      alert("Errore durante l'aggiornamento: " + err.message);
    }
  };

  if (!task) return <p>Caricamento...</p>;

  return (
    <div>
      <h1>{task.title}</h1>
      <p className="description"><strong>Descrizione: </strong>{task.description}</p>
      <p className="status-p"><strong>Stato: </strong>{task.status}</p>
      <p className="date-p"><strong>Data di creazione: </strong>{new Date(task.createdAt).toLocaleDateString()}</p>
      
      <button className="delete-button" onClick={handleDelete}>Elimina Task</button>
      <button className="edit-button" onClick={() => setIsModalOpen(true)}>Modifica Task</button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Modifica Task</h2>
          <div>
            <label><strong>Titolo: </strong></label><br />
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            />
          </div>
          <div>
            <label><strong>Descrizione:</strong></label><br />
            <textarea
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            />
          </div>
          <div>
            <label><strong>Stato: </strong></label><br />
            <select
              value={editedTask.status}
              onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="buttons-container">
            <button className="save-button" onClick={handleUpdate}>Salva modifiche</button>
            <button className="cancel-button" onClick={() => setIsModalOpen(false)}>Annulla</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default TaskDetail;
