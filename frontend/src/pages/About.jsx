import React from "react";
import useCounter from "../hooks/useCounter";

const About = () => {
	const { value, increment, decrement } = useCounter("About");
	return (
		<div>
			About
			<h1>Hello world!</h1>
			<h3>Change the value:</h3>
			<button
				onClick={increment}
				style={{ padding: "10px 16px", fontSize: "16px" }}
			>
				+
			</button>
			<span style={{ padding: "10px 16px", fontSize: "16px" }}>{value}</span>
			<button
				onClick={decrement}
				style={{ padding: "10px 16px", fontSize: "16px" }}
			>
				-
			</button>
			{/*
	<NumberPresenter />
	<NumberModifier></NumberModifier>
*/}
		</div>
	);
};

export default About;
