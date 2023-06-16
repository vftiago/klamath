import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import GithubIcon from "../icons/GithubIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import { weightedPhoneHeaders } from "../../weighted-tables/headers";

const LightApp = () => {
	const [phoneHeader, setPhoneHeader] = useState<string>("Hello World");

	useEffect(() => {
		setPhoneHeader(weightedPhoneHeaders.pick());
	}, []);

	return (
		<div className={phoneStytles}>
			{phoneHeader}
			<span>
				<a href="https://github.com/vftiago" target="_blank" rel="noreferrer">
					<GithubIcon size={36}></GithubIcon>
				</a>
				<a
					href="https://linkedin.com/in/vftiago"
					target="_blank"
					rel="noreferrer"
				>
					<LinkedinIcon size={36}></LinkedinIcon>
				</a>
			</span>
		</div>
	);
};

const phoneStytles = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: 100%;
	font-size: 42px;
	font-weight: 700;
	color: #fff;
	background: radial-gradient(circle at center, #111, #000);
	padding: 0 20px;
	span {
		display: flex;
		padding: 32px;
		gap: 36px;
	}
	svg {
		fill: #fff;
	}
`;

export default LightApp;
