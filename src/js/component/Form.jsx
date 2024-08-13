import React, {useState} from 'react'

const Form = ({ addTask}) => {
  
  const [task, setTask] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask("")

  }
  return (
    <form onSubmit={handleSubmit}>
        <input className='input poppins-extralight fs-4 w-100 mb-3' type="text" placeholder='What need to be done?' onChange={(e)=>setTask(e.target.value)} value={task}/>
    </form>
  )
}

export default Form