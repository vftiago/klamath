import React from "react";
import { css } from "@emotion/css";
import { ReactNode } from "react";
import Glass, { GlassProps } from "./Glass";

type Elevation = 0 | 1 | 2 | 3;

type StickyPosition = "top" | "left" | "right" | "bottom";

export type GlassPanelProps = GlassProps & {
	children: ReactNode;
	customStyles?: string;
	elevation?: Elevation;
	stickyPosition?: StickyPosition;
};

const GlassPanel = ({
	blur,
	elevation = 3,
	opacity,
	tint,
	customStyles,
	children,
	stickyPosition,
}: GlassPanelProps) => {
	return (
		<Glass
			blur={blur}
			opacity={opacity}
			tint={tint}
			customStyles={css([
				getPanelStyle(elevation, stickyPosition),
				customStyles,
			])}
		>
			{children}
		</Glass>
	);
};

const getPanelStyle = (
	elevation: Elevation,
	stickyPosition?: StickyPosition,
) => {
	const boxShadow = `${1 + elevation}px`;

	if (!stickyPosition) {
		return css`
			box-shadow: ${boxShadow} ${boxShadow} ${boxShadow} 0px
				rgba(88, 88, 88, 0.1);
		`;
	}

	const offsetX = stickyPosition === "top" ? 0 : `${1 + elevation}px`;
	const offsetY = stickyPosition === "left" ? 0 : `${1 + elevation}px`;

	return css`
		box-shadow: ${offsetX} ${offsetY} ${boxShadow} 0px rgba(88, 88, 88, 0.1);
	`;
};

export default GlassPanel;
