import React from 'react'
import { Props } from '../types';


const ToDo = (props: Props) => {
    const { id, title } = props.todo
    const deleteTodo = (id: number) => {
        props.handleDelete(id)
    }
  return (
    <article>
        <h3>{id} - {title}</h3>
        <button onClick={() => deleteTodo(id)}>Delete</button>
    </article>
  )
}

export default ToDo
