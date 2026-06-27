import React from 'react'
import { TodoType } from '../types';

type Props = {
    todo: TodoType
}

const ToDo = (props: Props) => {

    const { id, title } = props.todo
  return (
    <article>
        <h3>{id} - {title}</h3>
    </article>
  )
}

export default ToDo
