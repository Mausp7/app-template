import { useAuth } from "../providers/auth";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
	const { token, auth, logout } = useAuth();

	const navigate = useNavigate();

	return (
		<nav
			style={{
				backgroundColor: "#999",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<div>
				<button onClick={() => navigate("/")}>Home</button>
				<button onClick={() => navigate("/about")}>About</button>
				<button onClick={() => navigate("/profile")}>Profile</button>
				{/* <Link to="/profile">profile</Link> */}
			</div>
			<div>
				{!token ? (
					<button onClick={auth}>Google Login</button>
				) : (
					<button onClick={logout}>Logout</button>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
