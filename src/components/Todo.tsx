import React from 'react'

type TodoType = {
    todo: TodoType
}

const ToDo = (props: TodoType) => {

    const { id, title } = props.todo
  return (
    <article>
        <h3>{id} - {title}</h3>
    </article>
  )
}

export default ToDo
