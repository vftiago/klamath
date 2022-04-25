/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fragment } from "react";
import { motion } from "framer-motion";
import Logo from "./icons/Logo";
import HeadphonesIcon from "./icons/Headphones";
import { colors, iconSize, logoSize } from "../theme";
import Typed from "typed.js";

const columnWidth = 80;

// #region framer-animations
const visible = {
	opacity: 1,
	x: 0,
	transition: {
		delay: 0.2,
		duration: 0.8,
		when: "beforeChildren",
		staggerChildren: 0.2,
		ease: "backInOut",
	},
};

const leftColumnVariants = {
	visible,
	hidden: { opacity: 0, x: "-88px" },
};

// const rightColumnVariants = {
// 	visible,
// 	hidden: { opacity: 0, x: "88px" },
// };
// #endregion framer-animations

let typedExternalLink: Typed;

type Props = {
	muted: boolean;
	onButtonClick: () => void;
	onButtonHover: () => void;
	onHeadphonesIconClick: () => void;
};

const NavigationBars = ({
	muted,
	onButtonClick,
	onButtonHover,
	onHeadphonesIconClick,
}: Props) => {
	const handleLogoClick = () => {
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

	return (
		<Fragment>
			<motion.div
				initial="hidden"
				animate="visible"
				variants={leftColumnVariants}
				css={leftColumn}
			>
				<div css={iconContainerStyle} onClick={handleLogoClick}>
					<Logo size={logoSize}></Logo>
				</div>
				<div />
				<div
					css={[iconContainerStyle, muted && mutedStyle]}
					onMouseEnter={onButtonHover}
					onClick={onHeadphonesIconClick}
				>
					<HeadphonesIcon size={iconSize}></HeadphonesIcon>
				</div>
			</motion.div>
			{/* <motion.div
				initial="hidden"
				animate="visible"
				variants={rightColumnVariants}
				css={rightColumn}
			>
				<div css={iconContainerStyle}></div>
				<div
					css={[iconContainerStyle, muted && mutedStyle]}
					onMouseEnter={onButtonHover}
					onClick={onHeadphonesIconClick}
				>
					<HeadphonesIcon size={iconSize}></HeadphonesIcon>
				</div>
			</motion.div> */}
		</Fragment>
	);
};

const mutedStyle = css`
	&::after {
		transform: rotate(-45deg) scaleX(1);
	}
`;

const iconContainerStyle = css`
	height: ${logoSize + "px"};
	width: ${logoSize + "px"};
	margin: 16px 0 16px 0;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		cursor: pointer;
		svg {
			fill: ${colors.icon.accent};
		}
		&::after {
			background-color: ${colors.icon.accent};
		}
	}
	svg {
		transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
		fill: #333;
	}
	&::after {
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

const columnStyle = css`
	position: fixed;
	z-index: 1;
	width: ${columnWidth + "px"};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	min-height: 100vh;
	background-color: rgba(88, 88, 88, 0.02);
`;

const leftColumn = css`
	${columnStyle};
	border-right: 1px solid rgba(128, 128, 128, 0.1);
	box-shadow: 3px 3px 3px 0px rgba(88, 88, 88, 0.03);
	img {
		height: ${logoSize + "px"};
		width: ${logoSize + "px"};
	}
`;

// const rightColumn = css`
// 	${columnStyle};
// 	right: 0;
// 	border-left: 1px solid rgba(128, 128, 128, 0.1);
// 	box-shadow: -3px 3px 3px 0px rgba(88, 88, 88, 0.03);
// `;

export default NavigationBars;
