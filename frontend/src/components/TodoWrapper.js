import React, { useEffect, useRef, useState } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  setTodos,
  taskEdit,
  todoComplete,
  todoEdit,
} from "./slices/todoSlice";
import {
  useDeleteTaskMutation,
  useGetTodosMutation,
  useUpdateTodosMutation,
} from "./slices/apiSlice";
import { toast } from "react-toastify";

export const TodoWrapper = () => {
  // const [todoTasks, setTodoTasks] = useState([]);

  const { todos } = useSelector((state) => state.todos);

  const [deleteTask] = useDeleteTaskMutation();
  const [updateTodos] = useUpdateTodosMutation();
  const [getTodos] = useGetTodosMutation();
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  const getTodoItems = async () => {
    isMounted.current = true;
    if (todos.length > 0) return;
    const res = await getTodos().unwrap();
    console.log(res);
    dispatch(setTodos(res));
  };

  useEffect(() => {
    if (isMounted.current === false) {
      getTodoItems();
    }
  }, []);

  const toggleComplete = (id) => {
    console.log(id, "toggel complate");
    dispatch(todoComplete({ id }));
  };

  const todoDelete = async (id) => {
    try {
      const res = await deleteTask({ id }).unwrap();
      console.log(res);
      toast.success(res.message);
      dispatch(deleteTodo({ id }));
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const editTodo = (id) => {
    dispatch(todoEdit({ id }));
  };

  const editTask = async (task, id) => {
    console.log(task, id, "edit task");
    try {
      const res = await updateTodos({ id, task }).unwrap();
      console.log(res);
      toast.success(res.message);
      dispatch(taskEdit({ id, task }));
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }

    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, task, isEditng: !todo.isEditng } : todo
    //   )
    // );
  };

  return (
    <div className="TodoWrapper">
      <h3 style={{ color: "white" }}>Todo List</h3>
      <TodoForm />
      {todos.length > 0 &&
        todos.map((todo, index) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} key={index} task={todo} />
          ) : (
            <Todo
              todoList={todo}
              key={index}
              toggleComplete={toggleComplete}
              todoDelete={todoDelete}
              editTodo={editTodo}
            />
          )
        )}
    </div>
  );
};
