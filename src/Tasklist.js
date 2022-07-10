import React from "react";
import TodoItem from "./TodoItem";

export default function TaskList({ tasklist, toggleTodo }) {
  return tasklist.map((item) => {
    return <TodoItem id={item.id} item={item} toggleToDo={toggleTodo} />;
  });
}
