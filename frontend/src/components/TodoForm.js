import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddTodosMutation } from "./slices/apiSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { setTodos } from "./slices/todoSlice";

uuidv4();

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const [addTodos] = useAddTodosMutation();
  const dispatch = useDispatch();

  const submitForm = async (e) => {
    e.preventDefault();
    if (value === "") {
      return toast.warning("Please enter the something..");
    }
    try {
      const todo = {
        id: uuidv4(),
        task: value,
        completed: false,
        isEditing: false,
      };
      const addItem = await addTodos({ todo }).unwrap();
      console.log(addItem);
      toast.success(addItem.message);
      dispatch(setTodos([addItem.item]));
    } catch (error) {
      console.log("here the error");
      console.log(error);
    }

    setValue("");
  };

  return (
    <form className="TodoForm" onSubmit={submitForm}>
      <ToastContainer />
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        className="todo-input"
        placeholder=" what is your task today?"
      />
      <button className="todo-btn" type="submit">
        Add Task
      </button>
    </form>
  );
};
