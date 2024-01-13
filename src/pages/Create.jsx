import React from "react";
import { useDispatch } from "react-redux";
import { fetchAdd } from "../Features/TodoSlice/TodoReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAddTodos = () => {
    dispatch(fetchAdd({ title }));
    setTitle("");
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" onChange={handleChange} value={title} />
        <button onClick={handleAddTodos}>Add</button>
      </form>
    </div>
  );
};

export default Create;
