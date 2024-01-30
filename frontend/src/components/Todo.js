import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ todoList, toggleComplete, todoDelete, editTodo }) => {
  return (
    <div className="Todo">
      <p
        onClick={() => toggleComplete(todoList._id)}
        className={`${todoList.completed ? "completed" : ""}`}
      >
        {todoList.task}
      </p>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodo(todoList._id)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => todoDelete(todoList._id)}
        />
      </div>
    </div>
  );
};
