import React from "react";
import { css } from "@emotion/css";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "./icons/Logo";
import HeadphonesIcon from "./icons/Headphones";
import { colors, iconSize, logoSize } from "../theme";
import Typed from "typed.js";
import GlassPanel from "../glass-ui/GlassPanel";

// #region framer-animations
const visible = {
	x: 0,
	y: 0,
	transition: {
		duration: 0.8,
		when: "beforeChildren",
		staggerChildren: 0.2,
		ease: "backInOut",
	},
};

const leftNavbarVariants = {
	visible,
	hidden: { x: "-88px" },
};

const topNavbarVariants = {
	visible,
	hidden: { y: "-88px" },
};

let typedExternalLink: Typed;

type Props = {
	muted: boolean;
	largeScreen: boolean;
	currentPageHeader: string;
	onButtonClick: () => void;
	onButtonHover: () => void;
	onHeadphonesIconClick: () => void;
};

const Navbar = ({
	muted,
	largeScreen,
	currentPageHeader,
	onButtonClick,
	onButtonHover,
	onHeadphonesIconClick,
}: Props) => {
	const handleLogoClick = () => {
		if (!largeScreen) return;

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
		<motion.div
			initial="hidden"
			animate="visible"
			variants={largeScreen ? leftNavbarVariants : topNavbarVariants}
			className={navbarContainerStyles}
		>
			<GlassPanel
				customStyles={getNavbarStyles(largeScreen)}
				opacity={!largeScreen ? 1 : undefined}
				tint={!largeScreen ? "light" : undefined}
				stickyPosition={!largeScreen ? "top" : "left"}
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
				<div className={getPageHeaderStyles(largeScreen)}>
					<header id="current-page-header"></header>
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
			</GlassPanel>
		</motion.div>
	);
};

const navbarContainerStyles = css`
	z-index: 1;
	position: fixed;
	height: 100%;
`;

const baseNavbarStyles = css`
	position: fixed;
	display: grid;
	align-items: center;
`;

const horizontalBarStyles = css`
	${baseNavbarStyles}
	top: 0;
	left: -1px;
	height: 80px;
	grid-template-columns: 80px auto 80px;
	width: 100%;
`;

const verticalBarStyles = css`
	${baseNavbarStyles}
	top: -1px;
	width: 80px;
	grid-template-rows: 80px auto 80px;
	height: 100%;
`;

const getNavbarStyles = (largeScreen: boolean) => {
	const navbarStyles = largeScreen ? verticalBarStyles : horizontalBarStyles;

	return css`
		${navbarStyles};
		img {
			height: ${logoSize + "px"};
			width: ${logoSize + "px"};
		}
	`;
};

const getPageHeaderStyles = (largeScreen: boolean) => {
	const horizontalHeaderStyles = css`
		header {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	`;

	const verticalHeaderStyles = css`
		header {
			width: 100vh;
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			transform: translate(-50vh) rotate(-90deg);
			margin-left: 40px;
		}
	`;

	const headerStyles = largeScreen
		? verticalHeaderStyles
		: horizontalHeaderStyles;

	return css`
		height: 80px;
		display: flex;
		align-items: center;
		${headerStyles}
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
