import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const api_base = 'http://localhost:3001';

function App() {
    const navigate = useNavigate();
    const { currUser, logout } = useAuth();
    // STATE VARIABLES
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");

	useEffect(() => {
		GetTodos();
	}, []);

	const GetTodos = () => {
        if (currUser) {
            fetch(api_base + '/todo/' + currUser.email)
			.then(res => res.json())
			.then(data => setTodos(data))
			.catch((err) => console.error("Error: ", err));
        }
	}

	const completeTodo = async (id) => {
		const data = await fetch(api_base + '/todo/complete/' + id, {method: 'PUT'}).then(res => res.json());

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.completed = data.completed;
			}

			return todo;
		}));
		
	}

	const addTodo = async () => {
		const data = await fetch(api_base + "/todo/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				text: newTodo,
                email: currUser.email
			})
		}).then(res => res.json());


		setTodos([...todos, data]);

		setPopupActive(false);
		setNewTodo("");
	}

	const deleteTodo = async (id) => {
		const data = await fetch(api_base + '/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());

		setTodos(todos => todos.filter(todo => todo._id !== data._id));
	}

    function handleLogout() {
        try {
            logout();
            navigate("/login");
        } catch(err) {
            console.log(err);
        }
    }

	return (
		<div className="App">
            <Link className='logOut' onClick={() => handleLogout()}>Log out</Link>
			<h1>Welcome, {currUser.displayName}</h1>
			<h4>Your tasks</h4>

			<div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.completed ? " is-complete" : "")
					} key={todo._id}>
						<div className="checkbox" onClick={() => completeTodo(todo._id)}></div>

						<div className="text">{todo.text}</div>

						<div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
					</div>
				)) : (
					<p>You currently have no tasks</p>
				)}
			</div>

			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
						<h3>Add Task</h3>
						<input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<div className="button" onClick={addTodo}>Create Task</div>
					</div>
				</div>
			) : ''}
		</div>
	);
}

export default App;
