import React from 'react'

const Task = ({task, deleteTask}) => {
  

  return (
    <div className='d-flex justify-content-between align-items-center'>
      <p className='poppins-extralight fs-4'>{task.task}</p>
      <button className='button' onClick={()=> deleteTask(task.id)}>X</button>
    </div>
  )
}

export default Task