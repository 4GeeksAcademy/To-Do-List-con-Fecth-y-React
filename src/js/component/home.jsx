import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [listElement, setListElement] = useState([]);

	function getListElement() {
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/todo/users/PabloQuerales", requestOptions)
			.then((response) => response.json())
			.then((result) => setListElement(result.todos))
			.catch((error) => console.error(error));
	}
	function deletListElement(task) {
		const requestOptions = {
			method: "DELETE",
			redirect: "follow"
		};

		fetch(`https://playground.4geeks.com/todo/todos/${task}`, requestOptions)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.error(error));
	}
	function createTask(task) {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
			label: { task },
			is_done: false
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/todo/todos/PabloQuerales", requestOptions)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.error(error));
	}
	// REALIZA EL GET DE LA API AL INICIALIZAR LA APP
	useEffect(() => {
		getListElement();
	}, []);

	const handleNewTask = (e) => {
		if (e.key === "Enter" && e.target.value !== "") {
			setListElement([...listElement, e.target.value]);
			createTask(e.target.value);
			e.target.value = "";
		}
	};
	console.log(listElement);

	const handleClick = (e) => {
		const newLi = listElement.filter((element) => {
			return e.target.parentElement.firstChild.textContent !== element;
		});
		setListElement(newLi);
		deletListElement(e.target.parentElement.id);
	};
	return (
		<div className="container d-flex flex-column m-2 w-50 align-items-center p-5">
			<h1>To-Do</h1>
			<div className="input-group w-50">
				<input
					type="text"
					className="form-control"
					placeholder="Tienes alguna tarea pendiente?"
					aria-label="Tienes alguna tarea pendiente?"
					aria-describedby="basic-addon1"
					onKeyDown={handleNewTask}
				/>
			</div>
			{listElement.map((task) => {
				return (
					<ul className="list-group w-50 d-flex justify-content-between">
						<li className="list-group-item d-flex justify-content-between " key={task.id} id={task.id}>
							{task.label}
							<span className="button-delete" onClick={handleClick}>
								x
							</span>
						</li>
					</ul>
				);
			})}
			<div className="list-group w-50">
				<span className="list-group-item counter">{listElement.length} Task </span>
			</div>
		</div>
	);
};

export default Home;
