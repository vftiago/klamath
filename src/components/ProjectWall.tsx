/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Projects, Repositories } from "../api/octokit-api";
import { motion } from "framer-motion";
import RepositoryCard from "./common/RepositoryCard";
import ProjectCard from "./common/ProjectCard";

// #region framer-animations
const projectListAnimation = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delay: 0.2,
			duration: 0.8,
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

const ProjectWall = ({ data }: { data: Projects }) => {
	return (
		<motion.ul
			initial="hidden"
			animate="visible"
			css={projectListStyle}
			variants={projectListAnimation}
		>
			{data.map((project, index) => {
				return (
					<motion.li key={index} variants={projectListItemAnimation}>
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

const projectListStyle = css`
	display: grid;
	grid-column-gap: 32px;
	grid-row-gap: 40px;
	grid-template-columns: auto auto auto;
	list-style: none;
	padding: 0;
`;

export default ProjectWall;
