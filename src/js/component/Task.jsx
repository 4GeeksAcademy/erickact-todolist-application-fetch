import React from 'react'

const Task = ({task, deleteTask, id}) => {
  
  return (
    <div className='d-flex justify-content-between align-items-center'>
      <p className='poppins-extralight fs-4'>{task}</p>
      <button className='delete' onClick={()=> deleteTask(id)}>X</button>
    </div>
  )
}

export default Task