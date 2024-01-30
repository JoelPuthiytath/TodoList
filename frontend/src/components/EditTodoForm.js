import React,{useState} from 'react'

export const EditTodoForm = ({editTodo,task}) => {
  const [value, setValue] = useState(task.task);
  const submitForm = (e) => {
    e.preventDefault();
    editTodo(value,task._id);
    setValue("");
  };
  return (
    <form className="TodoForm" onSubmit={submitForm}>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        className="todo-input"
      />
      <button className="todo-btn" type="submit">
        Update Task
      </button>
    </form>
  );
}

