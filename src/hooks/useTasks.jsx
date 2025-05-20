import { useState, useEffect } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  // Recuperare i task da API
  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Errore nel fetch:", err));
  }, []);

  // Funzione per aggiungere un task
  const addTask = (newTask) => {
    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Se l'API ha restituito successo, aggiungiamo il task alla lista
          setTasks((prevTasks) => [...prevTasks, data.task]);
        } else {
          console.error("Errore nell'aggiunta del task:", data.message);
        }
      })
      .catch((err) => console.error("Errore nel POST dei task:", err));
  };

  // Funzione per eliminare un task
  const removeTask = (taskId) => {
    fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } else {
          console.error("Errore nell'eliminazione del task:", data.message);
        }
      })
      .catch((err) => console.error("Errore nel DELETE del task:", err));
  };

  return {
    tasks,
    addTask,
    removeTask,
  };
}
