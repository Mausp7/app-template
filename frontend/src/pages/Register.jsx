import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../providers/auth";

const Register = () => {
	const [username, setUsername] = useState("");
	const { register, user } = useAuth();

	const navigate = useNavigate();

	useEffect(() => {
		if (user.userId) navigate("/profile");
	}, [user]);

	return (
		<div>
			Register
			<input
				type="text"
				value={username}
				onChange={(event) => setUsername(event.target.value)}
			/>
			<button onClick={() => register(username)}>Save</button>
		</div>
	);
};

export default Register;
