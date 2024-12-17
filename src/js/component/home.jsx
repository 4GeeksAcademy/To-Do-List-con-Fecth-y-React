import React from "react";
import { useState } from "react";

//create your first component
const Home = () => {
	const [listElement, setListElement] = useState([]);

	const handleNewTask = (e) => {
		if (e.key === "Enter" && e.target.value !== "") {
			setListElement([...listElement, e.target.value]);
			e.target.value = "";
		}
	};
	const handleClick = (e) => {
		const newLi = listElement.filter((element) => {
			return e.target.parentElement.firstChild.textContent !== element;
		});
		setListElement(newLi);
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
			{listElement.map((element) => {
				return (
					<ul className="list-group w-50 d-flex justify-content-between">
						<li className="list-group-item d-flex justify-content-between ">
							{element}
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
