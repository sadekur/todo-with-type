import React, { useState } from 'react';
import Todos from './components/Todos';

const todoData = [
  {
    id: 1,
    title: "Learn React",
  },
  {
    id: 2,
    title: "Learn Vue",
  },
  {
    id: 3,
    title: "Learn Angular",
  }
]

function App() {
  const [todos, setTodos] = useState(todoData);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  return (
   <div><Todos todos={todos} handleDelete={handleDelete} /></div>
  );
}

export default App;
