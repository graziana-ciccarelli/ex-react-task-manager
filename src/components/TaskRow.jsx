import React from 'react';
import { Link } from "react-router-dom";

const TaskRow = React.memo(({ task }) => {
  const { id, title, status, createdAt } = task;

  // Determina la classe da applicare in base allo stato del task
  let statusClass = '';
  switch (status) {
    case 'To do':
      statusClass = 'status-to-do';
      break;
    case 'Doing':
      statusClass = 'status-doing';
      break;
    case 'Done':
      statusClass = 'status-done';
      break;
    default:
      statusClass = '';
  }

  return (
    <tr>
      <td>
        {/* Link che porta alla pagina di dettaglio del task */}
        <Link to={`/task/${id}`}>{title}</Link>
      </td>
      <td className={statusClass}>{status}</td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;
