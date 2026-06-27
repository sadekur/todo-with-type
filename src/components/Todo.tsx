import React from 'react'

type TodoType = {
    todo: {
        id: number;
        title: string;
    }[]
}

const ToDo = (props: TodoType) => {
  return (
    <div>
      Todo
    </div>
  )
}

export default ToDo
