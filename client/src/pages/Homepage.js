import React, { useState, useEffect } from "react";
import ToDoList from "../components/ToDoList";
import axios from "axios";

const Homepage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${process.env.REACT_APP_API_URL}`);
      setTodos(result.data.tasks);
    };

    fetchData();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault();
    const description = e.target.elements["description"].value;

    const result = await axios.post(`${process.env.REACT_APP_API_URL}/task`, {
      description,
    });

    if (result.status === 200) setTodos([result.data].concat(todos));
  };

  const deleteTask = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  };

  const editTask = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) return { ...todo, status: "done" };
      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <div>
      <h2>To do</h2>
      <form className="input-group" onSubmit={createTodo}>
        <input type="text" name="description"></input>
        <button>Add</button>
      </form>
      {todos && (
        <ToDoList
          todos={todos}
          deleteTask={deleteTask}
          editTask={editTask}
        ></ToDoList>
      )}
    </div>
  );
};

export default Homepage;
