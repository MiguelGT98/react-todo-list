import React from "react";

const ToDoDetail = ({ id, description, status }) => {
  return (
    <div className={`todo-detail ${status === "completada" ? "done" : ""}`}>
      <p>{description}</p>
      <p>{id}</p>
    </div>
  );
};

export default ToDoDetail;
