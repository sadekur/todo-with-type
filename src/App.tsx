import React from 'react';
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
  return (
   <div><Todos todos={todoData} /></div>
  );
}

export default App;
