import { useRef, useState } from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

function AddTask() {
  const [title, setTitle] = useState('');
  const descriptionRef = useRef();
  const statusRef = useRef();
  const [error, setError] = useState('');
  
  const { addTask } = useContext(GlobalContext); 

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  const handleSubmit = async (e) => {
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
      createdAt: new Date().toISOString()
    };

    // Aggiunta del task tramite la funzione addTask
    const result = await addTask(newTask);

    if (result.success) {
      alert('Task aggiunto con successo!');
      setTitle('');
      descriptionRef.current.value = '';
      statusRef.current.value = 'To do';
    } else {
      alert(`Errore: ${result.message}`);
    }
  };

  return (
    <div>
      <h1>Aggiungi Nuovo Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titolo:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Inserisci il nome del task"
          />
        </div>

        <div>
          <label>Descrizione:</label><br />
          <textarea
            ref={descriptionRef}
            placeholder="Inserisci una descrizione"
          ></textarea>
        </div>

        <div>
          <label>Stato:</label><br />
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
