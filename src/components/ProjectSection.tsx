/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import { getProjects, Projects } from "../api/octokit-api";
import ProjectWall from "./ProjectWall";

type Props = {
	onVisibilityChange: (page: number, inView: boolean) => void;
};

function ProjectSection({ onVisibilityChange }: Props) {
	const [projectData, setProjectData] = useState<Projects | null>(null);

	const { ref, inView } = useInView({
		threshold: 1,
	});

	useEffect(() => {
		const loadRepositories = async () => {
			if (!projectData) {
				const projects = await getProjects();

				setProjectData(projects);
			}
		};

		if (inView && !projectData) {
			loadRepositories();
		}
	}, [inView, projectData]);

	useEffect(() => {
		onVisibilityChange(1, inView);
	}, [inView]);

	return (
		<Element css={projectSectionStyle} name="projectSection">
			<h2 ref={ref}>Projects</h2>
			{projectData && <ProjectWall data={projectData} />}
		</Element>
	);
}

const projectSectionStyle = css`
	min-height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default ProjectSection;
