import { useContext, useState, useMemo } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import TaskRow from '../components/TaskRow';

function TaskList() {
  const { tasks } = useContext(GlobalContext);

  // Stato per la ricerca
  const [searchQuery, setSearchQuery] = useState('');

  // Stato per ordinamento
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(1); // 1: crescente, -1: decrescente

  // Funzione di ricerca
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  // Funzione di ordinamento
  const sortedTasks = useMemo(() => {
    return filteredTasks.sort((a, b) => {
      if (sortBy === 'createdAt') {
        return (new Date(a.createdAt) - new Date(b.createdAt)) * sortOrder;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title) * sortOrder;
      } else if (sortBy === 'status') {
        const statusOrder = { 'To do': 0, 'Doing': 1, 'Done': 2 };
        return (statusOrder[a.status] - statusOrder[b.status]) * sortOrder;
      }
      return 0;
    });
  }, [filteredTasks, sortBy, sortOrder]);

  // Gestione dell'ordinamento
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(-sortOrder); // Inverte l'ordinamento se la colonna è già selezionata
    } else {
      setSortBy(column);
      setSortOrder(1); // Imposta l'ordinamento crescente per la nuova colonna
    }
  };

  // Funzione per determinare la classe di ordinamento
  const getSortClass = (column) => {
    if (sortBy === column) {
      return sortOrder === 1 ? 'sorted-asc' : 'sorted-desc';
    }
    return ''; // Non applica classi se la colonna non è ordinata
  };

  return (
    <div className='container'>
      <h1>Lista dei Task</h1>

      {/* Campo di ricerca */}
      <div>
        <input
          type="text"
          placeholder="Cerca per titolo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('title')} className={getSortClass('title')}>
              Nome
            </th>
            <th onClick={() => handleSort('status')} className={getSortClass('status')}>
              Stato
            </th>
            <th onClick={() => handleSort('createdAt')} className={getSortClass('createdAt')}>
              Data di Creazione
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
