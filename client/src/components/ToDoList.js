import React from "react";
import ToDo from "./ToDo";

import "./ToDoList.css";

const ToDoList = ({ todos, deleteTask, editTask }) => {
  return (
    <div className="todo-list">
      {todos.map(({ id, description, status }) => (
        <ToDo
          id={id}
          description={description}
          status={status}
          deleteTask={deleteTask}
          editTask={editTask}
        ></ToDo>
      ))}
    </div>
  );
};

export default ToDoList;
