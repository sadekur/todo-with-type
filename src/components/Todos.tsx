import React from 'react'
import ToDo from './Todo';
type TodosType = {
    todos: {
        id: number;
        title: string;
    }[]
}

const Todos = (props: TodosType) => {
  return (
    <div>
      {props.todos.map((todo) => ( <ToDo key={todo.id} todo={todo} /> ))}
    </div>
  )
}

export default Todos
