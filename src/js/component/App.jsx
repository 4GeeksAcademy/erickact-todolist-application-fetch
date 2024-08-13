import React, {useState} from "react";
import Form from "./Form";
import Task from "./Task";


function App() {
	const [tasks, setTasks] = useState([])

	const addTask = (task) => {

		if(task.trim() === "") {
			alert("You need to add something")
			return;
		}
		const newTask = {
			id: Date.now(),
			task,
		}
		setTasks(prevTasks=> [...prevTasks, newTask]);
	}

	const deleteTask = (id) => {
		const updatedTasks = tasks.filter(task=> {
			return task.id !== id
		})
		setTasks(updatedTasks)
	}

	return (
		<div className="mx-auto" style={{width: "35vw"}}>
			<h2 className="text-center poppins-thin" style={{color:"pink", "fontSize":"110px"}}>todos</h2>
			<div className="border border-top-0 px-4">
				<Form addTask={addTask}/>
				{tasks.map((task)=> 
				<Task key={task.id} id={task.id} task={task} deleteTask={deleteTask}/>
				)}
				<div className="poppins-thin">{tasks.length} item left</div>
			</div>
		</div>
		
	);
};

export default App;
