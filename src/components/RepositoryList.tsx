import React from "react";
import { DEFAULT_OWNER, UserRepositories } from "../api/octokit-api";
import { motion } from "framer-motion";
import RepositoryCard from "./RepositoryCard";

// #region framer-animations
const projectListAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      ease: "backInOut",
    },
  },
};

const projectListItemAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "backInOut",
    },
  },
};
// #endregion framer-animations

const RepositoryList = ({ repositoryData }: { repositoryData: UserRepositories }) => {
  const filteredRepositoryList = repositoryData.user.repositories.nodes.filter(({ owner, name }) => {
    return owner.login === DEFAULT_OWNER && name !== DEFAULT_OWNER;
  });

  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={projectListAnimation}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      {filteredRepositoryList.map((repositoryNode, index) => {
        return (
          <motion.li key={index} className="flex" variants={projectListItemAnimation}>
            <RepositoryCard repositoryNode={repositoryNode}></RepositoryCard>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default RepositoryList;
