import React, { useEffect } from "react";
import { css } from "@emotion/css";
import GithubIcon from "../icons/GithubIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import { weightedPhoneHeaders } from "./headers/phoneHeaders";
import Typed from "typed.js";

const LightApp = () => {
	useEffect(() => {
		const header = weightedPhoneHeaders.pick();

		const typedCurrentPageHeader = new Typed("#header", {
			strings: [header],
			typeSpeed: 15,
			showCursor: true,
			cursorChar: "_",
		});

		return () => {
			typedCurrentPageHeader.destroy();
		};
	}, []);

	return (
		<div className={phoneStytles}>
			<div className={headerStyles}>
				<span
					id="header"
					className={css`
						margin-bottom: 20px;
					`}
				/>
			</div>
			<div className={buttonGroupStyles}>
				<a href="https://github.com/vftiago" target="_blank" rel="noreferrer">
					<GithubIcon size={24}></GithubIcon>
				</a>
				<a
					href="https://linkedin.com/in/vftiago"
					target="_blank"
					rel="noreferrer"
				>
					<LinkedinIcon size={24}></LinkedinIcon>
				</a>
			</div>
		</div>
	);
};

const headerStyles = css`
	margin-bottom: 20px;
	font-size: 24px;
	font-weight: 600;
	color: #fff;
	align-self: flex-start;
`;

const buttonGroupStyles = css`
	display: flex;
	align-items: center;
	gap: 40px;
	position: absolute;
	bottom: 80px;
	width: 100%;
	justify-content: center;
`;

const phoneStytles = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	background: radial-gradient(circle at center, #222, #000);
	padding: 0 20px;
	svg {
		fill: #fff;
	}
`;

export default LightApp;
