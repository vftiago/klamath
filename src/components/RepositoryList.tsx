/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Repositories } from "../api/octokit-api";
import { motion } from "framer-motion";
import RepositoryCard from "./common/RepositoryCard";

// #region framer-animations
const projectListAnimation = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delay: 0.2,
			duration: 0.8,
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

const RepositoryList = ({ data }: { data: Repositories }) => {
	return (
		<motion.ul
			initial="hidden"
			animate="visible"
			variants={projectListAnimation}
			css={repostoryListStyle}
		>
			{data.map((repo, index) => {
				return (
					<motion.li key={index} variants={projectListItemAnimation}>
						<RepositoryCard
							htmlUrl={repo.html_url}
							name={repo.name}
							homepage={repo.homepage}
						></RepositoryCard>
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
	max-width: 1600px;
	grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
	grid-gap: 16px;
	list-style: none;
	padding: 0;
	margin: 0 auto;
`;

export default RepositoryList;
