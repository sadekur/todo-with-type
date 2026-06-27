import React from 'react'
import { TodoType } from '../types';

type Props = {
    todo: TodoType,
    handleDelete: Function
}

const ToDo = (props: Props) => {

    const deleteTodo = (id: number) => {
        handleDelete(id)
    }

    const { id, title } = props.todo
  return (
    <article>
        <h3>{id} - {title}</h3>
        <button onClick={(() => {deleteTodo(id)})}>Delete</button>
    </article>
  )
}

export default ToDo
