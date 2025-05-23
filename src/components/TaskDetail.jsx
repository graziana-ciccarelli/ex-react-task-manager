import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Modal from  "../components/Modal";

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask } = useContext(GlobalContext);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const found = tasks.find((t) => t.id === parseInt(id));
    if (found) {
      setTask(found);
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

  if (!task) return <p>Caricamento...</p>;

  return (
    <div>
      <h1>{task.title}</h1>
      <p className="description"><strong>Descrizione: </strong>{task.description}</p>
      <p className="status-p"><strong>Stato: </strong>{task.status}</p>
      <p className="date-p"><strong>Data di creazione: </strong>{new Date(task.createdAt).toLocaleDateString()}</p>
      <button className="delete-button" onClick={handleDelete}>Elimina Task</button>
    </div>
  );
}

export default TaskDetail;
