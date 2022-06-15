import { useState, useContext, createContext } from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);

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
			sessionStorage.setItem("tokenJWT", response.data);
		} catch (error) {
			setToken(null);
		}
	};

	const resumeSession = () => {
		const token = sessionStorage.getItem("tokenJWT");
		if (token) setToken(token);
	};

	const logout = () => {
		setToken(null);
		sessionStorage.removeItem("tokenJWT");
	};

	const contextValue = { token, auth, login, resumeSession, logout };

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
