import React from "react";
import Todo from "./Todo";

function TodoList({ todos, toggleTodo }) {
  return (
    <>
      <h1>Todos:</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" className="text-center col-1">
              Completed
            </th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />;
          })}
        </tbody>
      </table>
    </>
  );
}

export default TodoList;
