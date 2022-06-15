import { useState, useEffect } from "react";

const useCounter = (componentName) => {
	const [value, setValue] = useState(
		parseInt(localStorage.getItem([componentName + "value"])) || 0
	);
	const increment = () => setValue(value + 1);
	const decrement = () => setValue(value - 1);

	useEffect(() => {
		localStorage.setItem([componentName + "value"], value);
	}, [value, componentName]);

	return { value, increment, decrement };
};

export default useCounter;
