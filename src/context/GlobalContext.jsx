import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();
export function GlobalProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch ('http://localhost:3001/tasks')
    
      .then((res) => res.json())
      .then((data) => {
        console.log("Tasks ricevuti:", data);
        setTasks(data);
      })
      .catch((err) => console.error("Errore nel fetch dei task", err));
  }, []);

  return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  );
}