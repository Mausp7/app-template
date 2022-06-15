import NumberPresenter from "./NumberPresenter";
import { useCounter } from "../CounterProvider";

const NumberModifier = () => {
	const { increment, decrement } = useCounter();

	return (
		<div style={{ margin: "50px", fontSize: "30px" }}>
			<button
				onClick={increment}
				style={{ padding: "10px 16px", fontSize: "16px" }}
			>
				+
			</button>
			<NumberPresenter />
			<button
				onClick={decrement}
				style={{ padding: "10px 16px", fontSize: "16px" }}
			>
				-
			</button>
		</div>
	);
};

export default NumberModifier;
