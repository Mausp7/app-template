import { useCounter } from "../CounterProvider";

const NumberPresenter = () => {
	const { value } = useCounter();

	return <div style={{ margin: "50px", fontSize: "30px" }}>{value}</div>;
};

export default NumberPresenter;
