import { asyncThunkCreator, buildCreateSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
const todoSlice = createSliceWithThunks({
  name: "todos",
  initialState: { todos: [], error: null, loading: false },
  reducers: (create) => ({
    fetchAdd: create.asyncThunk(
      async (data, thunkApi) => {
        await axios.post("http://localhost:5000/todos/new", { ...data });
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, actions) => {
          state.loading = false;
          state.error = actions.payload.error;
        },
        fulfilled: (state, actions) => {
          state.loading = false;
        },
      }
    ),

    toggleEdit: create.reducer((state, action) => {
      const { id } = action.payload;
      const toggleEdit = state.todos.find((todo) => todo.id === id);
      if (toggleEdit) {
        toggleEdit.isCompleted = !toggleEdit.isCompleted;
      }
    }),

    fetchToggle: create.asyncThunk(
      async (data, thunkApi) => {
        await axios.patch(`http://localhost:5000/todos/toggle/${data.id}`);
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, actions) => {
          state.loading = false;
          state.error = actions.payload.error;
        },
        fulfilled: (state, actions) => {
          state.loading = false;
        },
      }
    ),

    fetchDelete: create.asyncThunk(
      async (data, thunkApi) => {
        await axios.delete(`http://localhost:5000/todos/delete/${data.id}`);
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, actions) => {
          state.loading = false;
          state.error = actions.payload.error;
        },
        fulfilled: (state, actions) => {
          state.loading = false;
        },
      }
    ),

    fetchDeleteAll: create.asyncThunk(
      async (data, thunkApi) => {
        await axios.delete("http://localhost:5000/todos/delete-all");
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, actions) => {
          state.loading = false;
          state.error = actions.payload.error;
        },
        fulfilled: (state, actions) => {
          state.loading = false;
        },
      }
    ),

    fetchEdit: create.asyncThunk(
      async (data, thunkApi) => {
        const { title } = data;
        await axios.patch(`http://localhost:5000/todos/update/${data.id}`, {
          title,
        });
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, actions) => {
          state.loading = false;
          state.error = actions.payload.error;
        },
        fulfilled: (state, actions) => {
          state.loading = false;
        },
      }
    ),

    fetchTodos: create.asyncThunk(
      async (_, thunkApi) => {
        const response = await fetch("http://localhost:5000/todos");
        return await response.json();
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, actions) => {
          state.loading = false;
          state.error = actions.payload.error;
        },
        fulfilled: (state, actions) => {
          state.loading = false;
          state.todos = actions.payload;
        },
      }
    ),
  }),
});

export const {
  fetchDeleteAll,
  fetchTodos,
  fetchDelete,
  fetchAdd,
  fetchToggle,
  fetchEdit,
} = todoSlice.actions;
export default todoSlice.reducer;
