import React from 'react'

type Props = {}

const AddTodo = (props: Props) => {
  return (
    <div>
      <form>
        <input type="text" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddTodo
