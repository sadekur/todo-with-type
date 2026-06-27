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
  return (
   <div><Todos todos={todos} /></div>
  );
}

export default App;
