import React, { useState, useEffect } from "react";
import ToDoDetail from "../components/ToDoDetail";
import axios from "axios";

const ToDoDetailPage = ({ match }) => {
  const id = match.params.id;
  const [todo, setTodo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${process.env.REACT_APP_API_URL}/task/${id}`);
      if (result.status === 200) setTodo(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {todo.id && (
        <ToDoDetail
          id={todo.id}
          description={todo.description}
          status={todo.status}
          created_at={todo.created_at}
        ></ToDoDetail>
      )}
    </div>
  );
};

export default ToDoDetailPage;
