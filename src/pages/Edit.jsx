import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEdit } from "../Features/TodoSlice/TodoReducer";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const todos = useSelector((state) => state.todos.todos);
  const { id } = useParams();
  const navigate = useNavigate();
  const editTitle = todos.filter((todo) => todo._id === id);
  console.log(editTitle, "salkdm");
  const [title, setTitle] = useState(editTitle[0].title);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleEditTodo = () => {
    dispatch(fetchEdit({ id: id, title: title }));
    setTitle("");
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" onChange={handleChange} value={title} />
        <button onClick={handleEditTodo}>update</button>
      </form>
    </div>
  );
};

export default Edit;
