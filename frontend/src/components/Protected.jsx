import { useAuth } from "../providers/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Protected = ({ children }) => {
	const { token } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/");
		}
	}, [token]); //lefut először, es ha valtozik a token

	return <div>{children}</div>;
};

export default Protected;
