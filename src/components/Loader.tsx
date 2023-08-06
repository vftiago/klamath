import { css, cx } from "@emotion/css";
import React, { useEffect, useState } from "react";
import Logo from "./icons/Logo";

export const Loader = () => {
	const [isOutro, setIsOutro] = useState(false);

	useEffect(() => {
		return () => {
			setIsOutro(true);
		};
	}, []);

	return (
		<div className={cx([loaderStyles, isOutro && outroStyles])}>
			<Logo size={88} />
		</div>
	);
};

const loaderStyles = css`
	background-color: #1d2226;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
	svg {
		fill: white;
	}
`;

const outroStyles = css`
	opacity: 0;
`;
