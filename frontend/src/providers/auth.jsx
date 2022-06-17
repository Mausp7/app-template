import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import { toDoApi } from "../api/toDoApi";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const { post } = toDoApi();

	useEffect(() => {
		const tokenFronStorage = localStorage.getItem("tokenJWT");
		if (tokenFronStorage) setToken(tokenFronStorage);
		if (tokenFronStorage) setUser(jwt(tokenFronStorage));
	}, []);

	const auth = () => {
		const goodleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
		const searchParams = new URLSearchParams();
		searchParams.append(
			"client_id",
			"229876868942-31jakcq1lqsn2joo72624bmndemq3js5.apps.googleusercontent.com"
		);
		searchParams.append("scope", "openid");
		searchParams.append("response_type", "code");
		searchParams.append("redirect_uri", "http://localhost:3000/redirect");
		searchParams.append("promt", "select_account");
		console.log(searchParams);
		const fullUrl = goodleAuthUrl + "?" + searchParams;
		//window.location.href = fullUrl;
		window.open(fullUrl, "_self");
	};

	const login = async (code, provider) => {
		try {
			const response = await axios.post(
				"http://localhost:4000/api/user/login",
				{
					code,
					provider,
				}
			);
			setToken(response.data);
			localStorage.setItem("tokenJWT", response.data);
			setUser(jwt(response.data));
		} catch (error) {
			setToken(null);
		}
	};

	const register = async (username) => {
		const response = await post("/user/create", {
			username,
		});

		if (response?.status === 200) {
			setToken(response.data);
			localStorage.setItem("tokenJWT", response.data);
			setUser(jwt(response.data));
		}
	};

	const logout = () => {
		setToken(null);
		localStorage.removeItem("tokenJWT");
	};

	const contextValue = { token, user, auth, login, logout, register };

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("Add AuthProvider to root.");
	return useContext(AuthContext);
};

export { AuthProvider, useAuth };
