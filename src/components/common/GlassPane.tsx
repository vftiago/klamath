/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	disabled?: boolean;
};

function GlassPane({ children }: Props) {
	return <div css={quoteWindowStyle}>{children}</div>;
}

const quoteWindowStyle = css`
	padding: 16px;
	background-color: rgba(88, 88, 88, 0.03);
	border: 1px solid rgba(128, 128, 128, 0.1);
	height: 185.4px;
	width: 300px;
	transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
	box-shadow: 3px 3px 3px 0px rgba(88, 88, 88, 0.03);
`;

export default GlassPane;
