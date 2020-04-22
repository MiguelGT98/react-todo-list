import React from "react";

import "./ToDoDetail.css";

const ToDoDetail = ({ id, description, status, created_at }) => {
  return (
    <div className={`todo-detail ${status === "completada" ? "done" : ""}`}>
      <h2>{description}</h2>
      {status === "done" && <div className="chip">Completed</div>}
      {status === "pending" && <div className="chip pending">Pending</div>}
      <span>{id}</span>
      <p>
        Created at {new Date(created_at).toLocaleDateString()} -{" "}
        {new Date(created_at).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default ToDoDetail;
