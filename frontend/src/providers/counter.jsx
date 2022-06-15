import { useState, useContext, createContext } from "react";
const CounterContext = createContext();

const CounterProvider = ({ children }) => {
	const [value, setValue] = useState(0);
	const increment = () => setValue(value + 1);
	const decrement = () => setValue(value - 1);

	return (
		<CounterContext.Provider value={{ value, increment, decrement }}>
			{children}
		</CounterContext.Provider>
	);
};

const useCounter = () => {
	return useContext(CounterContext);
};

export { CounterProvider, useCounter };
