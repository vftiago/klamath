/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import { getRepos, Repositories } from "../api/octokit-api";
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

function RepositorySection() {
	const [data, setData] = useState<Repositories | null>(null);

	const loadProjects = async () => {
		if (!data) {
			const repos = await getRepos();

			const data = repos.filter((repo) => !repo.fork && !repo.archived);

			setData(data);
		}
	};

	const { ref, inView } = useInView({
		threshold: 1,
	});

	const buildRepositorySection = () => {
		if (!data) return;

		return (
			<motion.ul
				initial="hidden"
				animate="visible"
				variants={projectListAnimation}
				css={projectListStyle}
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

	useEffect(() => {
		if (inView) {
			loadProjects();
		}
	}, [inView]);

	return (
		<Element css={projectSectionStyle} name="repositorySection">
			<div
				css={css`
					margin: 80px 0 120px 0;
				`}
			>
				<h2 ref={ref}>Project Wall</h2>
			</div>
			{buildRepositorySection()}
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

const projectListStyle = css`
	display: grid;
	grid-column-gap: 32px;
	grid-row-gap: 40px;
	grid-template-columns: auto auto auto;
	list-style: none;
	padding: 0;
`;

export default RepositorySection;
