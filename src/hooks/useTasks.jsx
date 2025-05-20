import { useEffect, useState } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  // Caricamento iniziale dei task
  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Errore nel fetch:', err));
  }, []);

  // Funzione per aggiungere un nuovo task
  const addTask = async (newTask) => {
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();

      if (data.success) {
        setTasks((prevTasks) => [...prevTasks, data.task]); // Aggiorniamo i task
        return { success: true, task: data.task };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const removeTask = (id) => {};
  const updateTask = (id, updatedData) => {};

  return { tasks, addTask, removeTask, updateTask };
}
