/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import ProjectCard from "./common/ProjectCard";
import { getProjects, Projects } from "../api/octokit-api";
import { motion } from "framer-motion";

// #region framer-animations
const projectListAnimation = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delay: 0.2,
			when: "beforeChildren",
			staggerChildren: 0.2,
			ease: "backInOut",
		},
	},
};

const projectListItemAnimation = {
	visible: {
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: "backInOut",
		},
	},
	hidden: { opacity: 0 },
};
// #endregion framer-animations

function ProjectSection() {
	const [data, setData] = useState<Projects | null>(null);

	const loadProjects = async () => {
		if (!data) {
			const projects = await getProjects();

			setData(projects);
		}
	};

	const { ref, inView } = useInView({
		threshold: 1,
	});

	const buildProjectSection = () => {
		if (!data) return;

		return (
			<motion.ul
				initial="hidden"
				animate="visible"
				variants={projectListAnimation}
			>
				{data.map((project, index) => {
					console.log(project);
					return (
						<motion.li
							key={index}
							variants={projectListItemAnimation}
							css={projectListItemStyle}
						>
							<ProjectCard
								projectId={project.id}
								projectName={project.name}
								projectDescription={project.body}
							></ProjectCard>
						</motion.li>
					);
				})}
			</motion.ul>
		);
	};

	useEffect(() => {
		if (inView) {
			loadProjects();
		}
	}, [inView]);

	return (
		<Element css={projectSectionStyle} name="projectSection">
			<h2 ref={ref}>Projects</h2>
			<div css={projectListStyle}>{buildProjectSection()}</div>
		</Element>
	);
}

const projectSectionStyle = css`
	min-height: 420px;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 160px 0 80px 0;
	h2 {
		margin-bottom: 80px;
	}
`;

const projectListStyle = css`
	ul {
		display: grid;
		grid-gap: 16px;
		grid-template-columns: auto auto auto;
		list-style: none;
		padding: 0;
	}
`;

const projectListItemStyle = css`
	position: relative;
	transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
	top: 0;
	&:hover {
		top: -3px;
	}
`;

export default ProjectSection;
