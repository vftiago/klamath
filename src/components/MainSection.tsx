/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import LinkedinIcon from "./icons/LinkedinIcon";
import GithubIcon from "./icons/GithubIcon";
import MailIcon from "./icons/MailIcon";
import Typed from "typed.js";
import { copyToClipboard } from "../utils/copyToClipboard";
import { motion } from "framer-motion";
import { Fragment, useEffect, useRef } from "react";
import { iconSize } from "../theme";
import { colors } from "../theme";
import Waterfall from "./Waterfalll";
import { EMAIL } from "../constants";
import { useInView } from "react-intersection-observer";

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
// #endregion framer-animations

let typedMail: Typed;
let typedName: Typed;

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

type Props = {
	onButtonClick: () => void;
	onButtonHover: () => void;
	onHeadphonesIconClick: () => void;
	onVisibilityChange: (page: number, inView: boolean) => void;
};

function MainSection({
	onButtonClick,
	onButtonHover,
	onVisibilityChange,
}: Props) {
	const { ref, inView } = useInView({
		threshold: 1,
	});

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

	useEffect(() => {
		onVisibilityChange(0, inView);
	}, [inView]);

	const handleMailIconClick = () => {
		if (typedMail) typedMail.destroy();

		copyToClipboard(EMAIL);

		onButtonClick();

		typedMail = new Typed("#toast", {
			strings: [`<u>${EMAIL}</u> copied to clipboard.`, ""],
			typeSpeed: 1,
			backDelay: 3000,
			showCursor: false,
			fadeOut: true,
		});
	};

	return (
		<Fragment>
			<div
				id="external-link"
				css={css`
					height: 80px;
					display: flex;
					align-items: center;
					position: fixed;
					left: 90px;
					p {
						font-size: 14px;
						margin: 0 8px;
					}
					a {
						color: ${colors.text.accent};
					}
				`}
			></div>
			<div css={appContainerStyles}>
				<main css={mainContentStyle}>
					<div css={typedTitle}>
						<h1 ref={ref}>
							<span id="typed-name"></span>
						</h1>
						<h3>
							<span id="typed-job"></span>
						</h3>
					</div>
				</main>
				<motion.div
					css={callToActionStyle}
					initial="hidden"
					animate="visible"
					variants={socialIconsVariant}
				>
					<div css={toastStyle}>
						<span id="toast"></span>
					</div>
					<div css={socialIconsStyle}>
						<motion.a
							variants={item}
							href="https://github.com/vftiago"
							target="_blank"
							rel="noreferrer"
							onMouseEnter={onButtonHover}
							onClick={onButtonClick}
						>
							<GithubIcon size={iconSize}></GithubIcon>
						</motion.a>
						<motion.a
							variants={item}
							onClick={handleMailIconClick}
							target="_blank"
							rel="noreferrer"
							onMouseEnter={onButtonHover}
						>
							<MailIcon size={iconSize}></MailIcon>
						</motion.a>
						<motion.a
							variants={item}
							href="https://linkedin.com/in/vftiago"
							target="_blank"
							rel="noreferrer"
							onMouseEnter={onButtonHover}
							onClick={onButtonClick}
						>
							<LinkedinIcon size={iconSize}></LinkedinIcon>
						</motion.a>
					</div>
					<Waterfall />
				</motion.div>
			</div>
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
			fill: ${colors.icon.accent};
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

export default MainSection;
