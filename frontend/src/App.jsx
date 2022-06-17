import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Protected from "./components/Protected";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Redirect from "./pages/Redirect";
import Register from "./pages/Register";

import "./App.css";

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route
					path="/profile"
					element={
						<Protected>
							<Profile />
						</Protected>
					}
				/>
				<Route path="/redirect" element={<Redirect />} />
				<Route
					path="/register"
					element={
						<Protected>
							<Register />
						</Protected>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
