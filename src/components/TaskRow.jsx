import React from 'react';
import { Link } from "react-router-dom";

const TaskRow = React.memo(({ task }) => {
  const { id, title, status, createdAt } = task;

  // Stile in base allo stato del task
  let statusStyle = {};
  switch (status) {
    case 'To do':
      statusStyle = { backgroundColor: 'red' };
      break;
    case 'Doing':
      statusStyle = { backgroundColor: 'yellow' };
      break;
    case 'Done':
      statusStyle = { backgroundColor: 'green' };
      break;
    default:
      statusStyle = {};
  }

  return (
    <tr>
      <td>
        {/* Link che porta alla pagina di dettaglio del task */}
        <Link to={`/task/${id}`}>{title}</Link>
      </td>
      <td style={statusStyle}>{status}</td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;
