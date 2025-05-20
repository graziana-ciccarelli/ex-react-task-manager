import React from 'react';

const TaskRow = React.memo(({ task }) => {
  const { title, status, createdAt } = task;

  // Stile in base allo stato
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
      <td>{title}</td>
      <td style={statusStyle}>{status}</td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;
