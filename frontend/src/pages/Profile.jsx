import { useCounter } from "../providers/counter";
//import NumberPresenter from "../components/NumberPresenter";
//import NumberModifier from "../components/NumberModifier";

const Profile = () => {
	const { value, increment, decrement } = useCounter();

	return (
		<div>
			Profile
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

export default Profile;
