import React from 'react'

type TodoType = {
    todo: {
        id: number;
        title: string;
    }
}

const ToDo = (props: TodoType) => {
  return (
    <div className='text-black/50 text-2xl text-[#FF0000]'>
      Todo
    </div>
  )
}

export default ToDo
