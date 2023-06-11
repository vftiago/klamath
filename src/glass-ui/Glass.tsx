import React from "react";
import { css } from "@emotion/css";
import { ReactNode } from "react";

export type GlassProps = {
	blur?: 1 | 2 | 4;
	opacity?: 0.03 | 1;
	tint?: "light" | "dark";
	children: ReactNode;
	customStyles?: string;
};

const Glass = ({
	blur = 1,
	opacity = 0.03,
	tint = "dark",
	customStyles,
	children,
}: GlassProps) => {
	return (
		<div className={css([getGlassStyles(blur, opacity, tint), customStyles])}>
			{children}
		</div>
	);
};

const getGlassStyles = (
	blur: number,
	opacity: number,
	tint: "light" | "dark",
) => {
	const color = tint === "light" ? 232 : 88;

	const backdropFilter = `blur(${blur}px)`;
	const backgroundColor = `rgba(${color}, ${color}, ${color}, ${opacity})`;

	return css`
		backdrop-filter: ${backdropFilter};
		background-color: ${backgroundColor};
		border: 1px solid rgba(128, 128, 128, 0.3);
	`;
};

export default Glass;
