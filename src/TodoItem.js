import React from "react";

export default function TodoItem({ item, toggleToDo }) {
  function handlesClick() {
    toggleToDo(item.id);
  }
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={handlesClick}
        ></input>
        {item.name}
      </label>
    </div>
  );
}
