import React from "react";

function Todo({ todo, toggleTodo }) {
  const handleTodoClick = () => {
    toggleTodo(todo.id);
  };

  return (
    <>
      <tr>
        <td className="text-center col-1">
          <input
            className="form-check-input"
            type="checkbox"
            checked={todo.completed}
            onChange={handleTodoClick}
          />
        </td>
        <td>
          <label>{todo.description}</label>
        </td>
      </tr>
    </>
  );
}

export default Todo;
