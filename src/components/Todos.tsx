import React from 'react'
import ToDo from './Todo';
import { TodoType } from '../types';
type TodosType = {
    todos: TodoType[]
    handleDelete: Function
}

const Todos = (props: TodosType) => {
  return (
    <div>
      {props.todos.map((todo) => ( <ToDo key={todo.id} todo={todo} handleDelete={props.handleDelete} /> ))}
    </div>
  )
}

export default Todos
