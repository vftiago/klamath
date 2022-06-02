/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, SerializedStyles } from "@emotion/core";
import cx from "@emotion/css";
import { ReactNode } from "react";
import { GOLDEN_RATIO } from "../constants";

type Orientation = "horizontal" | "vertical";

type Size = "s" | "m" | "l";

type Props = {
	orientation?: Orientation;
	size?: Size;
	children: ReactNode;
	customCss?: SerializedStyles;
};

const cardSizes = {
	s: 220,
	m: 320,
	l: 640,
};

function GlassPane(cardProps: Props) {
	const {
		orientation = "horizontal",
		size = "m",
		customCss,
		children,
	} = cardProps;

	return (
		<div css={cx(buildCardStyle(orientation, size), customCss)}>{children}</div>
	);
}

const buildCardStyle = (orientation: Orientation, size: Size) => {
	let height = cardSizes[size];
	let width = Math.ceil(height * GOLDEN_RATIO);

	if (orientation === "vertical") {
		width = cardSizes[size];
		height = Math.ceil(width * GOLDEN_RATIO);
	}

	return css`
		padding: 20px;
		background-color: rgba(88, 88, 88, 0.03);
		border: 1px solid rgba(128, 128, 128, 0.1);
		height: ${`${height}px`};
		/* width: ${`${width}px`}; */
		transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
		box-shadow: 3px 3px 3px 0px rgba(88, 88, 88, 0.03);
	`;
};

export default GlassPane;
