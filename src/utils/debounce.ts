const debounce = <Params extends unknown[]>(
	callback: (...args: Params) => unknown,
	duration: number,
): ((...args: Params) => void) => {
	let timer: NodeJS.Timeout;

	return function (...args: Params) {
		clearTimeout(timer);

		timer = setTimeout(function () {
			callback(...args);
		}, duration);
	};
};

export default debounce;
