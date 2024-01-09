import React from "react";

const Todo = ({ todo, onDelete, onComplete, onEdit }) => {
  return (
    <div>
      <div
        style={
          todo.isCompleted
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        {todo.title}
      </div>
      <button onClick={() => onDelete(todo.id)}>X</button>
      <input type="checkbox" onClick={() => onComplete(todo.id)} />
      <button onClick={() => onEdit(todo.id)}>Edit</button>
    </div>
  );
};

export default Todo;
