import { useEffect, useRef } from "react";

export const useTimeout = (callback, delay) => {
	const savedCallback = useRef();

	useEffect(() => {
		if (callback) {
			savedCallback.current = callback;
		}
	}, [callback]);

	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setTimeout(tick, delay);
			return () => clearTimeout(id);
		}
	}, [delay]);
};
