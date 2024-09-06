import React from 'react';

const User = ({ data, moveTask }) => {

  //ondrop
  const handleOnDrop = (e) => {
    e.preventDefault();

    const droppedTaskText = e.dataTransfer.getData('text');
    const sourceUserId = parseInt(e.dataTransfer.getData('user_id'));
    const targetUserId = data.user_id;

    // Call the moveTask function from the parent component
    moveTask(sourceUserId, targetUserId, droppedTaskText);
  };


  //ondrag  
  const handleOnDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  //dragStart
  const handleOnDragStart = (e, text, id) => {
    e.dataTransfer.setData('text', text);
    e.dataTransfer.setData('user_id', id);
  };

  return (
    <div
      className="text-white text-[24px] bg-zinc-700 rounded-lg p-2 m-2 h-[20rem] w-[20rem]"
      onDragOver={handleOnDragOver}
      onDrop={handleOnDrop}
    >
      <p className="text-white font-semibold">{data.name}</p>
      {data.tasks && data.tasks.length > 0 ? (
        data.tasks.map((task, index) => (
          <p
            key={task.text} // Ensure unique keys
            className="cursor-move bg-zinc-600 rounded-lg p-2 mb-2"
            draggable
            onDragStart={(e) => handleOnDragStart(e, task.text, data.user_id)}
          >
            {task.text}
          </p>
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default User;
