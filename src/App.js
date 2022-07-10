import React, { useState, useRef, useEffect } from "react";
import TaskList from "./Tasklist";
import { v4 as uuidv4 } from "uuid";

const storeKey = "todoApp";

function App() {
  const [Tasklist, setTodos] = useState([]);
  const newItem = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(storeKey));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(storeKey, JSON.stringify(Tasklist));
  }, [Tasklist]);

  function addToList() {
    const name = newItem.current.value;
    if (name === "") return;
    setTodos((currentTodos) => {
      return [...currentTodos, { id: uuidv4(), name: name, completed: false }];
    });
    newItem.current.value = null;
  }
  function deleteFromList() {
    const newList = Tasklist.filter((x) => !x.completed);
    setTodos(newList);
  }
  function toggleToDo(id) {
    const newTodos = [...Tasklist];
    const todo = newTodos.find((x) => x.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  function toggleAll() {
    const newTodos = [...Tasklist];
    if (newTodos.find((x) => x.completed === false)) {
      for (let i = 0; i < newTodos.length; i++) {
        if (newTodos[i].completed === false) newTodos[i].completed = true;
      }
    } else {
      if (newTodos.find((x) => x.completed === true)) {
        for (let i = 0; i < newTodos.length; i++) {
          if (newTodos[i].completed === true) newTodos[i].completed = false;
        }
      }
    }
    setTodos(newTodos);
  }

  return (
    <>
      <div>{Tasklist.filter((x) => !x.completed).length} to complete.</div>
      <input ref={newItem} type="text" />
      <button onClick={addToList}>+</button>
      <button onClick={toggleAll}>Toggle all</button>
      <button onClick={deleteFromList}>Delete to-do</button>
      <TaskList tasklist={Tasklist} toggleTodo={toggleToDo} />
    </>
  );
}

export default App;
