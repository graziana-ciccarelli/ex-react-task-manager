import { useState, useEffect } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

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
          setTasks((prevTasks) => [...prevTasks, data.task]);
        } else {
          console.error("Errore nell'aggiunta del task:", data.message);
        }
      })
      .catch((err) => console.error("Errore nel POST dei task:", err));
  };

  // Funzione per aggiornare un task
  const updateTask = (updatedTask) => {
    fetch(`http://localhost:3001/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === updatedTask.id ? data.task : task
            )
          );
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => console.error("Errore nell'aggiornamento del task:", err));
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
    updateTask,  // Aggiungi updateTask all'oggetto restituito
  };
}
