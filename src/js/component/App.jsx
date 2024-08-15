import React, {useEffect, useState} from "react";
import Form from "./Form";
import Task from "./Task";

function App() {
	const [tasks, setTasks] = useState([])
	const [name, setName] = useState("")
	const [usersList, setUsersList] = useState([])
	const [userDeleted, setUserDeleted] = useState(false)


	function createUser() {
		fetch(`https://playground.4geeks.com/todo/users/${name}`, {
			method: "POST"
		})
		.then((response)=>response.json())
		.then((data)=>{
			if (data.id){
				alert("user successfully created")
				setUserDeleted(prev => !prev)
			} else {
				alert("something went wrong")
			}
		})
		.catch((error)=>console.log(error)
		)	
	}

	function getUsers() {
		fetch("https://playground.4geeks.com/todo/users")
		.then((response)=>response.json())
		.then((data)=>
		setUsersList(data.users))
	}

	function deleteUser(){
		fetch(`https://playground.4geeks.com/todo/users/${name}`, {
			method: "DELETE"
		})
		.then((data)=>{
			if(data.ok){
				alert("user successfully removed")
				setUserDeleted(prev => !prev)
			} else {
				alert("something went wrong")
			}
		})
	}
	
	function getTaskList() {
		fetch(`https://playground.4geeks.com/todo/users/${name}`)
		.then((response)=>response.json())
		.then((data)=> {
			if(data.todos) {
				setTasks(data.todos)
			}
		})
	}

	function addTask(task) {
		if(task.trim() === "") {
			alert("You need to add a task")
			return;
		}
		const newTask = {
			label: task,
			is_done: false	
		}

		fetch(`https://playground.4geeks.com/todo/todos/${name}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newTask)
		})
		.then((response)=>response.json())
		.then((data)=>setTasks(prevTasks=>[...prevTasks, data]))
		.catch((error)=>console.log(error))
	}

	function deleteTask(id) {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		})
		.then((data)=> {
			if (data.ok) {
                setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            } else {
                console.error("failed to delete task");
            }
		})
		.catch((error)=>console.log(error))
	}

	useEffect(() => {
		getUsers()
	}, [userDeleted])

	return (
		<div className="container-fluid" style={{width: "70vw"}}>
			<h2 className="text-center poppins-thin" style={{color:"pink", "fontSize":"110px"}}>todos</h2>
			<div className="row">
				<div className="col w-100vw">
					<h3 className="mb-4">Users</h3>
					<select
						className="form-select mb-3"
						id="user-select"
						value={name}
						onChange={(e) => setName(e.target.value)}
					>
						<option selected value="">--Select User--</option>
						{usersList.map((user) => (
						<option key={user.id} value={user.name}>
							{user.name}
						</option>
						))}
					</select>
					<div className="d-flex gap-1">
						<input className="form-control me-1" type="text"  style={{ width: 'auto', flex: '0 1 auto' }} onChange={(e)=>setName(e.target.value)} />
						<div className="d-flex gap-1">
							<button className="button" onClick={createUser}>Create user</button>
							<button className="button" onClick={deleteUser}>Delete user</button>
						</div>	
					</div>
				</div>

				<div className="col w-100">
					<h3 className="mb-4">Tasks</h3>
					<button className="button mb-3 py-2 px-1" onClick={getTaskList}>Get tasks</button>
					<div className="border rounded px-4">
						<Form addTask={addTask}/>
						{tasks.map((task)=>
							<Task key={task.id} id={task.id} task={task.label} is_done={task.is_done} deleteTask={deleteTask}/>
						)}
						<div className="poppins-thin">{tasks.length} item left</div>
					</div>
				</div>
			</div>
		</div>
		
	);
};

export default App;
