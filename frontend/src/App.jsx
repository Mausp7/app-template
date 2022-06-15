import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Redirect from "./pages/Redirect";

import "./App.css";

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/redirect" element={<Redirect />} />
			</Routes>
		</div>
	);
}

export default App;
