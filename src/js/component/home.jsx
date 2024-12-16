import React from "react";
import { useState } from "react";

//create your first component
const Home = () => {
	const [listElement, setListElement] = useState([]);
	const [inputChange, setInputChange] = useState("");

	const handleChange = (e) => {
		setInputChange(e.target.value);
	};
	const handleNewTask = (e) => {
		if (e.key === "Enter" && e.target.value !== "") {
			setListElement([...listElement, e.target.value]);
			setInputChange("");
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
		<div className="container d-flex flex-column align-items-center">
			<h1>To-Do</h1>
			<div className="input-group mb-3 w-50">
				<input
					type="text"
					className="form-control"
					placeholder="Username"
					aria-label="Username"
					aria-describedby="basic-addon1"
					onKeyDown={handleNewTask}
					onChange={handleChange}
				/>
			</div>
			{listElement.map((element) => {
				return (
					<ul className="list-group w-50 d-flex justify-content-between">
						<li className="list-group-item d-flex justify-content-between ">
							{element}
							<span onClick={handleClick}>x</span>
						</li>
					</ul>
				);
			})}
			<div className="list-group w-50">
				<span className="list-group-item">{listElement.length} CONTADOR</span>
			</div>
		</div>
	);
};

export default Home;
