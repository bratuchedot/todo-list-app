import React, { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import NavBar from "./NavBar";

/**
 *
 * Todo List App
 *
 * This is a simple react application where you can
 * add new, mark as done and clear completed todos.
 *
 * @author Emilijan Koteski <emilijan.koteski@pm.me>
 *
 */

const LOCAL_STORAGE_KEY = "todoListApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoDescriptionRef = useRef();

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (savedTodos) setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const selectedTodo = newTodos.find((todo) => todo.id === id);
    selectedTodo.completed = !selectedTodo.completed;
    setTodos(newTodos);
  };

  const handleAddTodo = () => {
    const description = todoDescriptionRef.current.value;
    if (description === "") return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: uuidv4(), description: description, completed: false },
      ];
    });
    todoDescriptionRef.current.value = null;
  };

  const handleClearCompletedTodos = () => {
    const newTodos = todos.filter((todo) => todo.completed === false);
    setTodos(newTodos);
  };

  return (
    <>
      <NavBar />
      <main className="container">
        <div className="shadow p-3 mb-4 bg-body rounded mt-4">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-success"
              onClick={handleClearCompletedTodos}
            >
              <i className="bi bi-check-lg"></i> Clear Completed Todos
            </button>
            <span className="">
              <span class="badge text-bg-danger">
                {todos.filter((todo) => todo.completed === false).length}
              </span>{" "}
              left todos.
            </span>
          </div>
        </div>
        <div className="shadow p-3 mb-4 bg-body rounded mt-4">
          <div className="input-group">
            <input
              className="form-control"
              ref={todoDescriptionRef}
              type="text"
              placeholder="Enter description here..."
            ></input>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleAddTodo}
            >
              <i className="bi bi-plus-lg"></i> Add Todo
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
