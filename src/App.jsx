import { useState, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";
import Form from "./components/Form";

const LOCAL_STORAGE_KEY = "todo:saveTodos";

function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    loadSavedTodos();
  }, []);

  const handlePlus = () => {
    setCount(count + 1);
  };
  function handleMinus() {
    count <= 0 ? count : setCount(count - 1);
  }

  const handleAddTodos = () => {
    const filteredTodos = todos.filter((todo) => todo.title === title);

    const filteredTodosAll =
      filteredTodos.length != true && title.trim("") !== "";
    if (filteredTodosAll) {
      setTodosAndSave([
        ...todos,
        {
          title: title,
          id: crypto.randomUUID(),
          isCompleted: false,
        },
      ]);
      setTitle("");
      if (editId) {
        const updatedTodos = todos.map((todo) =>
          todo.id === editId ? (todo = { ...todo, title }) : todo
        );
        setTodosAndSave(updatedTodos);
        setEditId(0);
        return;
      }
    } else return alert("U cant add that!");
  };

  const handleDeleteAll = () => {
    setTodosAndSave([]);
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      })
    );
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id != id);
    setTodosAndSave(newTodos);
  };

  const setTodosAndSave = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
  };

  const loadSavedTodos = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    saved && setTodos(JSON.parse(saved));
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((todo) => todo.id === id);
    setTitle(editTodo.title);
    setEditId(id);
  };

  const handleCancel = () => {
    setTitle("");
    setEditId(0);
  };
  return (
    <>
      <div>
        <button onClick={handlePlus}>Plus</button>
        <div>{count}</div>
        <button onClick={handleMinus}>Minus</button>
      </div>
      <div>
        <Form
          editId={editId}
          onChange={handleChange}
          onClick={handleAddTodos}
          title={title}
          oncancel={handleCancel}
        />
      </div>
      <div>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onEdit={handleEdit}
          />
        ))}
        <button onClick={handleDeleteAll}>Delete All</button>
      </div>
    </>
  );
}

export default App;
