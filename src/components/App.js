import React, { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

/**
 *
 * Todo List App
 *
 * This is a simple react application.
 *
 * @author Emilijan Koteski <emilijan.koteski@pm.me>
 *
 */

const LOCAL_STORAGE_KEY = "todoListApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

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
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

  const handleClearCompletedTodos = () => {
    const newTodos = todos.filter((todo) => todo.completed === false);
    setTodos(newTodos);
  };

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text"></input>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearCompletedTodos}>Clear Completed Todos</button>
      <div>
        {todos.filter((todo) => todo.completed === false).length} left todos
      </div>
    </>
  );
}

export default App;
