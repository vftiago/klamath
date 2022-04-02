/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import VisibilitySensor from "react-visibility-sensor";
import { Octokit } from "@octokit/core";
import { useState } from "react";
import GlassPane from "./common/GlassPane";
import { Element } from "react-scroll";

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
							<GlassPane css={projectCardStyle}>
								<h4>{item.name}</h4>
								<p>{item.body}</p>
							</GlassPane>
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
		<Element css={projectSectionStyle} name="projectSection">
			<VisibilitySensor onChange={handleVisibilityChange}>
				<h2>Projects</h2>
			</VisibilitySensor>
			<div>{data && buildProjectSection()}</div>
		</Element>
	);
}

const projectSectionStyle = css`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 40px;
`;

const projectListStyle = css`
	display: grid;
	grid-gap: 16px;
	grid-template-columns: auto auto auto;
	flex: 0 1 800px;
	min-width: 800px;
	list-style: none;
	padding: 0;

	li {
		position: relative;
		transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);

		top: 0;
		&:hover {
			top: -3px;
		}
	}
`;

const projectCardStyle = css`
	margin: 0;
`;

export default Projects;
