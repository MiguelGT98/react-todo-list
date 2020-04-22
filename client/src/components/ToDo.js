import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./ToDo.css";

const ToDo = ({ id, description, status, deleteTask, editTask }) => {
  const onDelete = async () => {
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}/task/${id}`
    );

    if (result.status === 200) deleteTask(id);
  };

  const onDone = async () => {
    const result = await axios.patch(
      `${process.env.REACT_APP_API_URL}/task/${id}`
    );

    if (result.status === 200) editTask(id);
  };

  return (
    <div className={`todo ${status === "done" ? "done" : ""}`}>
      <p>
        <Link to={`/todo/${id}`}>{description}</Link>
      </p>
      {status !== "done" && <button onClick={onDone}>Done</button>}
      <div className="icon-right">
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ToDo;
