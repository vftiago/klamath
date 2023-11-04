import React from "react";
import { css } from "@emotion/css";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { UserProjectsV2 } from "../api/octokit-api";

// #region framer-animations
const projectListAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.1,
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

const ProjectList = ({ projectData }: { projectData: UserProjectsV2 }) => {
  const projectList = projectData.user.projectsV2.nodes;

  return (
    <motion.ul initial="hidden" animate="visible" variants={projectListAnimation} className={repostoryListStyle}>
      {projectList.map((project, index) => {
        return (
          <motion.li key={index} variants={projectListItemAnimation}>
            <ProjectCard projectTitle={project.title} projectItems={project.items.nodes}></ProjectCard>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

const repostoryListStyle = css`
  display: grid;
  justify-content: center;
  width: 100%;
  max-width: 1500px;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  grid-gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0 auto;
`;

export default ProjectList;
