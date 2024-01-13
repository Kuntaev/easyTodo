import React, { useEffect } from "react";

import Todo from "../components/Todo";

import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteAll, fetchTodos } from "../Features/TodoSlice/TodoReducer";
import { minus, plus, reset } from "../Features/CountSlice/CountReducer";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const count = useSelector((state) => state.count);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handlePlus = () => {
    dispatch(plus());
  };
  function handleMinus() {
    dispatch(minus());
  }

  function handleReset() {
    dispatch(reset());
  }

  const handleDeleteAll = async () => {
    await dispatch(fetchDeleteAll());
    dispatch(fetchTodos());
  };

  return (
    <>
      <div>
        <button onClick={handlePlus}>Plus</button>
        <div>{count}</div>
        <button onClick={handleMinus}>Minus</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div>
        <Link to="/create">
          <button>Create</button>
        </Link>

        {todos.length
          ? todos.map((todo) => <Todo key={todo._id} todo={todo} />)
          : "No todos"}
        <button onClick={handleDeleteAll}>Delete All</button>
      </div>
    </>
  );
};

export default Home;
