/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import LinkedinIcon from "./icons/LinkedinIcon";
import GithubIcon from "./icons/GithubIcon";
import Logo from "./icons/Logo";
import HeadphonesIcon from "./icons/Headphones";
import MailIcon from "./icons/MailIcon";
import Typed from "typed.js";
import { copyToClipboard } from "../utils/copyToClipboard";
import { motion } from "framer-motion";
import { Fragment, useEffect } from "react";
import { accentColor, iconSize, logoSize } from "../breakpoints";
import Waterfall from "./Waterfalll";

const email = "tiago@infodump.xyz";

let typedExternalLink: Typed;
let typedMail: Typed;
let typedName: Typed;

type Props = {
	muted: boolean;
	onButtonClick: () => void;
	onButtonHover: () => void;
	onHeadphonesIconClick: () => void;
};

const defaultTypedOptions = {
	typeSpeed: 20,
	showCursor: true,
	cursorChar: "_",
};

const typedJob = (self: any) => {
	setTimeout(() => {
		new Typed("#typed-job", {
			...defaultTypedOptions,
			strings: [`Frontend web developer^16000?`],
			startDelay: 1200,
		});

		self.cursor.remove();
	}, 2900);
};

function App({ muted, onButtonClick, onButtonHover, onHeadphonesIconClick }: Props) {
	useEffect(() => {
		typedName = new Typed("#typed-name", {
			...defaultTypedOptions,
			strings: [`Tiago Fernandes`],
			startDelay: 2900,
			onComplete: typedJob,
		});

		return () => {
			typedName.destroy();
		};
	}, []);

	const handleMailIconClick = () => {
		if (typedMail) typedMail.destroy();

		copyToClipboard(email);

		onButtonClick();

		typedMail = new Typed("#toast", {
			strings: [`<u>${email}</u> copied to clipboard.`, ""],
			typeSpeed: 1,
			backDelay: 3000,
			showCursor: false,
			fadeOut: true,
		});
	};

	const handleLogoClick = () => {
		if (typedExternalLink) typedExternalLink.destroy();

		onButtonClick();

		typedExternalLink = new Typed("#external-link", {
			strings: [`<p>go to <a href="https://lightradius.com" target="_blank">lightradius.com</a> →</p>`, ""],
			typeSpeed: 1,
			backDelay: 6000,
			showCursor: false,
			fadeOut: true,
		});
	};

	return (
		<Fragment>
			<div
				id="external-link"
				css={css`
					height: 68px;
					display: flex;
					align-items: center;
					position: fixed;
					left: 100px;
					p {
						font-size: 14px;
						margin: 0 8px;
					}
					a {
						color: ${accentColor};
					}
				`}
			></div>
			<div css={appContainerStyles}>
				<motion.div initial="hidden" animate="visible" variants={leftColumnVariants} css={leftColumn}>
					<div css={iconContainerStyle} onClick={handleLogoClick}>
						<Logo size={logoSize}></Logo>
					</div>
					<div css={centerPieceStyle}>
						<header css={headerStyle}></header>
					</div>
					<div css={iconContainerStyle}></div>
				</motion.div>
				<motion.div initial="hidden" animate="visible" variants={rightColumnVariants} css={rightColumn}>
					<div css={iconContainerStyle}></div>
					<div
						css={[iconContainerStyle, muted && mutedStyle]}
						onMouseEnter={onButtonHover}
						onClick={onHeadphonesIconClick}
					>
						<HeadphonesIcon size={iconSize}></HeadphonesIcon>
					</div>
				</motion.div>
				<main css={mainContentStyle}>
					<div css={typedTitle}>
						<h1>
							<span id="typed-name"></span>
						</h1>
						<h3>
							<span id="typed-job"></span>
						</h3>
					</div>
				</main>
				<motion.div css={callToActionStyle} initial="hidden" animate="visible" variants={socialIconsVariant}>
					<div css={toastStyle}>
						<span id="toast"></span>
					</div>
					<div css={socialIconsStyle}>
						<motion.a
							variants={item}
							href="https://github.com/vftiago"
							target="_blank"
							onMouseEnter={onButtonHover}
							onClick={onButtonClick}
						>
							<GithubIcon size={iconSize}></GithubIcon>
						</motion.a>
						<motion.a variants={item} onClick={handleMailIconClick} target="_blank" onMouseEnter={onButtonHover}>
							<MailIcon size={iconSize}></MailIcon>
						</motion.a>
						<motion.a
							variants={item}
							href="https://linkedin.com/in/vftiago"
							target="_blank"
							onMouseEnter={onButtonHover}
							onClick={onButtonClick}
						>
							<LinkedinIcon size={iconSize}></LinkedinIcon>
						</motion.a>
					</div>
					<Waterfall />
				</motion.div>
			</div>
			{/* <Projects /> */}
		</Fragment>
	);
}

const appContainerStyles = css`
	display: flex;
	align-items: center;
	/* justify-content: center; */
	height: 100vh;
	width: 100%;
	overflow-x: hidden;
`;

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

const rightColumnVariants = {
	visible,
	hidden: { opacity: 0, x: "88px" },
};

const socialIconsVariant = {
	visible,
	hidden: { opacity: 0 },
};

const item = {
	visible: {
		opacity: 1,
		cursor: "pointer",
		transition: {
			duration: 0.8,
			ease: "backInOut",
		},
	},
	hidden: { opacity: 0 },
};

const columnWidth = 80;

const mainContentStyle = css`
	top: 0;
	left: 0;
	display: flex;
	width: 100%;
	min-height: 100vh;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	p {
		margin: 0;
	}
`;

const toastStyle = css`
	width: 253px;
	height: 16px;
`;

const centerPieceStyle = css`
	transform: rotate(-90deg);
`;

const headerStyle = css`
	width: 265px;
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
			fill: ${accentColor};
		}
		&::after {
			background-color: ${accentColor};
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

const mutedStyle = css`
	&::after {
		transform: rotate(-45deg) scaleX(1);
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

const rightColumn = css`
	${columnStyle};
	right: 0;
	border-left: 1px solid rgba(128, 128, 128, 0.1);
	box-shadow: -3px 3px 3px 0px rgba(88, 88, 88, 0.03);
`;

const socialIconsStyle = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 200px;
	margin: 32px;
	a {
		height: ${iconSize + "px"};
		width: ${iconSize + "px"};
	}
	svg {
		transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
		/* margin: ${"0 " + iconSize + "px"}; */
		fill: #333;
		&:hover {
			cursor: pointer;
			fill: ${accentColor};
		}
	}
`;

const callToActionStyle = css`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 300px;
	width: 100%;
	position: absolute;
	bottom: 0;
`;

const typedTitle = css`
	width: 330px;
	height: 88px;

	.typed-cursor {
		animation-delay: 0s;
		animation-direction: normal;
		animation-duration: 0.7s;
		animation-fill-mode: none;
		animation-iteration-count: infinite;
		animation-play-state: running;
		animation-timing-function: ease;
	}
`;

export default App;
