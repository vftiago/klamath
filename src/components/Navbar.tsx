import React from "react";
import { css } from "@emotion/css";
import { Fragment, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "./icons/Logo";
import HeadphonesIcon from "./icons/Headphones";
import { colors, iconSize, logoSize } from "../theme";
import Typed from "typed.js";

enum Orientation {
	Horizontal = "horizontal",
	Vertical = "vertical",
}

// #region framer-animations
const visible = {
	opacity: 1,
	x: 0,
	y: 0,
	transition: {
		delay: 0.2,
		duration: 0.8,
		when: "beforeChildren",
		staggerChildren: 0.2,
		ease: "backInOut",
	},
};

const leftNavbarVariants = {
	visible,
	hidden: { opacity: 0, x: "-88px" },
};

const topNavbarVariants = {
	visible,
	hidden: { opacity: 0, y: "-88px" },
};

let typedExternalLink: Typed;

type Props = {
	muted: boolean;
	orientation?: Orientation;
	currentPageHeader: string;
	onButtonClick: () => void;
	onButtonHover: () => void;
	onHeadphonesIconClick: () => void;
};

const Navbar = ({
	muted,
	orientation = Orientation.Vertical,
	currentPageHeader,
	onButtonClick,
	onButtonHover,
	onHeadphonesIconClick,
}: Props) => {
	const handleLogoClick = () => {
		if (orientation === Orientation.Horizontal) return;

		if (typedExternalLink) typedExternalLink.destroy();

		onButtonClick();

		typedExternalLink = new Typed("#external-link", {
			strings: [
				`<p>go to <a href="https://lightradius.com" target="_blank" rel="noreferrer">lightradius.com</a> →</p>`,
				"",
			],
			typeSpeed: 1,
			backDelay: 6000,
			showCursor: false,
			fadeOut: true,
		});
	};

	useEffect(() => {
		const typedCurrentPageHeader = new Typed("#current-page-header", {
			strings: [currentPageHeader],
			typeSpeed: 20,
			showCursor: false,
		});

		return () => {
			typedCurrentPageHeader.destroy();
		};
	}, [currentPageHeader]);

	return (
		<Fragment>
			<motion.div
				initial="hidden"
				animate="visible"
				variants={
					orientation === Orientation.Horizontal
						? topNavbarVariants
						: leftNavbarVariants
				}
				className={getNavbarStyles(orientation)}
			>
				<div className={iconContainerStyle}>
					<span
						className={logoStyle}
						onMouseEnter={onButtonHover}
						onClick={handleLogoClick}
					>
						<Logo size={logoSize}></Logo>
					</span>
				</div>
				<div className={getCenterPieceStyles(orientation)}>
					<p id="current-page-header"></p>
				</div>
				<div className={iconContainerStyle}>
					<span
						className={css([soundIconStyle, muted && mutedStyle])}
						onMouseEnter={onButtonHover}
						onClick={onHeadphonesIconClick}
					>
						<HeadphonesIcon size={iconSize}></HeadphonesIcon>
					</span>
				</div>
			</motion.div>
		</Fragment>
	);
};

const horizontalBarStyles = css`
	position: fixed;
	top: 0;
	z-index: 1;
	height: 80px;
	display: grid;
	grid-template-columns: 80px auto 80px;
	align-items: center;
	width: 100%;
	background-color: rgba(235, 235, 235, 0.9);
	box-shadow: 0 3px 3px 0px rgba(88, 88, 88, 0.1);
`;

const verticalBarStyles = css`
	position: fixed;
	z-index: 1;
	width: 80px;
	display: grid;
	grid-template-rows: 80px auto 80px;
	align-items: center;
	min-height: 100vh;
	background-color: rgba(88, 88, 88, 0.02);
	box-shadow: 3px 3px 3px 0px rgba(88, 88, 88, 0.03);
`;

const getNavbarStyles = (orientation: Orientation) => {
	const navbarStyles =
		orientation === "horizontal" ? horizontalBarStyles : verticalBarStyles;

	return css`
		${navbarStyles};
		border-right: 1px solid rgba(128, 128, 128, 0.1);
		backdrop-filter: blur(4px);
		img {
			height: ${logoSize + "px"};
			width: ${logoSize + "px"};
		}
	`;
};

const getCenterPieceStyles = (orientation: Orientation) => {
	const horizontalParagraphStyles = css`
		p {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	`;

	const verticalParagraphStyles = css`
		p {
			width: 100vh;
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			transform: translate(-50vh) rotate(-90deg);
			margin-left: 40px;
		}
	`;

	const paragraphStyles =
		orientation === "horizontal"
			? horizontalParagraphStyles
			: verticalParagraphStyles;

	return css`
		height: 80px;
		display: flex;
		align-items: center;
		${paragraphStyles}
	`;
};

const iconContainerStyle = css`
	z-index: 1;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const soundIconStyle = css`
	height: 16px;
	svg {
		transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
		fill: #333;
	}
	&:hover {
		cursor: pointer;
		svg {
			fill: ${colors.icon.accent};
		}
		&::after {
			background-color: ${colors.icon.accent};
		}
	}
	&:after {
		transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
		background-color: #666;
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: ${Math.sqrt(iconSize * iconSize + iconSize * iconSize) + "px"};
		height: 2px;
		margin-top: -1px;
		margin-left: ${-1 * iconSize * 0.75 + "px"};
		transform: rotate(-45deg) scaleX(0);
	}
`;

const mutedStyle = css`
	&:after {
		transform: rotate(-45deg) scaleX(1);
	}
`;

const logoStyle = css`
	height: 36px;
	svg {
		transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
		fill: #333;
	}
	&:hover {
		cursor: pointer;
		svg {
			fill: ${colors.icon.accent};
		}
		&::after {
			background-color: ${colors.icon.accent};
		}
	}
`;

export default Navbar;
