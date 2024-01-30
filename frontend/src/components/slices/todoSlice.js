import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

try {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    initialState.todos = JSON.parse(storedTodos);
  }
} catch (error) {
  console.error("Error parsing stored todos:", error);
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = [...state.todos, ...action.payload];
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    todoComplete: (state, action) => {
      const { id } = action.payload;
      const todoToUpdate = state.todos.find((todo) => todo._id === id);
      if (todoToUpdate) {
        todoToUpdate.completed = !todoToUpdate.completed;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      state.todos = state.todos.filter((todo) => todo._id !== id);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    todoEdit: (state, action) => {
      const { id } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      );
    },
    taskEdit: (state, action) => {
      const { id, task } = action.payload;
      const todoToUpdate = state.todos.find((todo) => todo._id === id);
      if (todoToUpdate) {
        todoToUpdate.task = task;
        todoToUpdate.isEditing = !todoToUpdate.isEditing;
      }

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { setTodos, todoComplete, deleteTodo, todoEdit, taskEdit } =
  todoSlice.actions;

export default todoSlice.reducer;
