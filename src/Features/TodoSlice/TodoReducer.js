import { createSlice } from "@reduxjs/toolkit";

const todos = JSON.parse(localStorage.getItem("todos")) || [];
const todoSlice = createSlice({
  name: "todos",
  initialState: todos,
  reducers: {
    addTodos: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    deleteTodo: (state, action) => {
      localStorage.setItem(
        "todos",
        JSON.stringify(state.filter((todo) => todo.id != action.payload.id))
      );
      return state.filter((todo) => todo.id != action.payload.id);
    },
    editTodo: (state, action) => {
      const { id, title } = action.payload;
      const editTodo = state.find((todo) => todo.id === id);
      if (editTodo) {
        editTodo.title = title;
      }
      localStorage.setItem("todos", JSON.stringify(state));
    },
    deleteAll: (state, action) => {
      localStorage.setItem("todos", JSON.stringify((state = [])));
      return (state = []);
    },
    toggleEdit: (state, action) => {
      const { id } = action.payload;
      const toggleEdit = state.find((todo) => todo.id === id);
      if (toggleEdit) {
        toggleEdit.isCompleted = !toggleEdit.isCompleted;
      }
      localStorage.setItem("todos", JSON.stringify(state));
    },
  },
});

export const { addTodos, deleteTodo, editTodo, deleteAll, toggleEdit } =
  todoSlice.actions;
export default todoSlice.reducer;
