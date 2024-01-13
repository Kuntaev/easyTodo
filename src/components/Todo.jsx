import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchDelete,
  fetchTodos,
  fetchToggle,
} from "../Features/TodoSlice/TodoReducer";

const Todo = ({ todo }) => {
  const handleDelete = async (id) => {
    await dispatch(fetchDelete({ id }));
    dispatch(fetchTodos());
  };
  const dispatch = useDispatch();
  const handleComplete = async (id) => {
    await dispatch(fetchToggle({ id }));
    dispatch(fetchTodos());
  };
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
      <button onClick={() => handleDelete(todo._id)}>X</button>
      <input
        type="checkbox"
        defaultChecked={todo.isCompleted && true}
        onClick={() => handleComplete(todo._id)}
      />
      <Link to={`/edit/${todo._id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default Todo;
