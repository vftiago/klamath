const debounce = (callback: any, duration: number) => {
	let timer: NodeJS.Timeout;
	return function (event: any) {
		clearTimeout(timer);
		timer = setTimeout(function () {
			callback(event);
		}, duration);
	};
};

export default debounce;
