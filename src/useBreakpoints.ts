import { useEffect, useState } from "react";

const breakpoints = {
	md: 768,
	lg: 1024,
};

export const useBreakpoints = () => {
	const [screenState, setScreenState] = useState<{
		isSmScreen: boolean;
		isMdScreen: boolean;
		isLgScreen: boolean;
	}>({
		isSmScreen: window.innerWidth <= breakpoints.md,
		isMdScreen: window.innerWidth >= breakpoints.md,
		isLgScreen: window.innerWidth >= breakpoints.lg,
	});

	const handleResize = () => {
		const newScreenState = {
			isSmScreen: window.innerWidth <= breakpoints.md,
			isMdScreen: window.innerWidth >= breakpoints.md,
			isLgScreen: window.innerWidth >= breakpoints.lg,
		};

		setScreenState(newScreenState);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return { ...screenState };
};
