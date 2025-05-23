import React, { useState, useRef } from 'react';
import useTasks from '../hooks/useTasks';

function AddTask() {
  const [title, setTitle] = useState('');
  const descriptionRef = useRef();
  const statusRef = useRef();
  const { addTask } = useTasks(); // addTask da useTasks
  const [error, setError] = useState('');

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validazione del titolo
    if (title.trim() === '') {
      setError('Il nome del task è obbligatorio.');
      return;
    }

    if ([...symbols].some((char) => title.includes(char))) {
      setError('Il nome del task non può contenere simboli speciali.');
      return;
    }

    setError('');

    // Costruzione oggetto task
    const newTask = {
      title: title.trim(),
      description: descriptionRef.current.value.trim(),
      status: statusRef.current.value,
      createdAt: new Date().toISOString(),
    };

    // Aggiungi il nuovo task utilizzando addTask
    addTask(newTask);
    alert("Task aggiunto con successo!");

    // Resetta il form
    setTitle('');
    descriptionRef.current.value = '';
    statusRef.current.value = 'To do';
  };

  return (
    <div>
      <h1>Aggiungi un nuovo Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label><strong>Titolo:</strong></label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Inserisci il nome del task"
          />
        </div>

        <div>
          <label><strong>Descrizione:</strong></label><br />
          <textarea ref={descriptionRef} placeholder="Inserisci una descrizione"></textarea>
        </div>

        <div>
          <label><strong>Stato:</strong></label><br />
          <select ref={statusRef} defaultValue="To do">
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Aggiungi Task</button>
      </form>
    </div>
  );
}

export default AddTask;
