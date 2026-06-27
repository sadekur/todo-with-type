import React from 'react'
import { TodoType } from '../types';

type Props = {
    todo: TodoType,
    handleDelete: Function
}

const ToDo = (props: Props) => {

    const handleDelete = (id: number) => {

    }

    const { id, title } = props.todo
  return (
    <article>
        <h3>{id} - {title}</h3>
        <button onClick={(() => {handleDelete(id)})}>Delete</button>
    </article>
  )
}

export default ToDo
