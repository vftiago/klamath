/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import VisibilitySensor from "react-visibility-sensor";
import { accentColor } from "../breakpoints";
import { Octokit } from "@octokit/core";
import { useState } from "react";
import GlassPane from "./common/GlassPane";

const octokit = new Octokit({
	auth: process.env.REACT_APP_GITHUB_AUTH_TOKEN,
});

function Projects() {
	const [data, setData] = useState<any[] | null>(null);

	const loadCrap = async () => {
		if (!data) {
			const response = await octokit.request("GET /users/{username}/projects", {
				username: "vftiago",
				mediaType: {
					previews: ["inertia"],
				},
			});

			console.log(response.data);

			setData(response.data);
		}
	};

	const buildProjectSection = () => {
		if (!data) return;

		return (
			<ul css={projectListStyle}>
				{data.map((item, index) => {
					return (
						<li key={index}>
							<GlassPane css={projectCardStyle}>{item.name}</GlassPane>
						</li>
					);
				})}
			</ul>
		);
	};

	const handleVisibilityChange = (isVisible: boolean) => {
		if (isVisible) {
			loadCrap();
		}
	};

	return (
		<div css={projectSectionStyle}>
			<VisibilitySensor onChange={handleVisibilityChange}>
				<h1>Projects</h1>
			</VisibilitySensor>
			<div>{data && buildProjectSection()}</div>
		</div>
	);
}

const projectListStyle = css`
	padding: 0;
	display: flex;
	flex: 0 1 800px;
	min-width: 800px;
	justify-content: space-between;
	list-style: none;
`;

const projectCardStyle = css`
	margin: 0;
`;

const projectSectionStyle = css`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	span {
		color: ${accentColor};
	}
`;

export default Projects;
