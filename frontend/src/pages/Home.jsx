import React, { useEffect } from "react";
import { useCounter } from "../providers/counter";
import { useAuth } from "../providers/auth";

import useCounterLocal from "../hooks/useCounter";
//import NumberPresenter from "../components/NumberPresenter";
//import NumberModifier from "../components/NumberModifier";

const Home = () => {
	const { value, increment, decrement } = useCounter();
	const { token, auth, resumeSession, logout } = useAuth();

	useEffect(() => {
		resumeSession();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const {
		value: counter,
		increment: goUp,
		decrement: goDown,
	} = useCounterLocal("home");

	return (
		<div>
			Home
			<p>{token ? " Logged in" : "Anonymus user"}</p>
			<h1>Hello world!</h1>
			{!token && <button onClick={auth}>Google Login</button>}
			{token && <button onClick={logout}>Logout</button>}
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
			<button onClick={goUp} style={{ padding: "10px 16px", fontSize: "16px" }}>
				+
			</button>
			<span style={{ padding: "10px 16px", fontSize: "16px" }}>{counter}</span>
			<button
				onClick={goDown}
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

export default Home;
