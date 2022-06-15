import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<nav>
			<button onClick={() => navigate("/")}>Home</button>
			<button onClick={() => navigate("/about")}>About</button>
			<button onClick={() => navigate("/profile")}>Profile</button>
			<Link to="/profile">profile</Link>
		</nav>
	);
};

export default Navbar;
