/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useInView } from "react-intersection-observer";
import React, { Suspense, useEffect, useState } from "react";
import { Element } from "react-scroll";
import { getRepos, Repositories } from "../api/octokit-api";
import LoadingIcon from "./icons/LoadingIcon";
import { Orientation } from "./AppContainer";
const RepositoryWall = React.lazy(() => import("./RepositoryWall"));

type Props = {
	onVisibilityChange: (pageNumber: number, inview: boolean) => void;
	orientation: Orientation;
};

function RepositorySection({ onVisibilityChange, orientation }: Props) {
	const [repositoryData, setRepositoryData] = useState<Repositories | null>(
		null,
	);

	const { ref, inView } = useInView({
		threshold: 1,
	});

	useEffect(() => {
		const loadRepositories = async () => {
			if (!repositoryData) {
				const repos = await getRepos();

				const repositoryData = repos.filter(
					(repo) => !repo.fork && !repo.archived,
				);

				setRepositoryData(repositoryData);
			}
		};

		if (inView && !repositoryData) {
			loadRepositories();
		}
	}, [inView, repositoryData]);

	useEffect(() => {
		onVisibilityChange(1, inView);
	}, [inView]);

	return (
		<Element css={projectSectionStyle} name="repository-section">
			<div css={projectSectionTitleStyle} ref={ref}>
				<h2>Projects</h2>
				{/* <h2>|</h2>
				<h2>Repos</h2> */}
			</div>
			<Suspense fallback={<LoadingIcon />}>
				{repositoryData && (
					<RepositoryWall data={repositoryData} orientation={orientation} />
				)}
			</Suspense>
		</Element>
	);
}
const projectSectionStyle = css`
	min-height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-items: center;
`;

const projectSectionTitleStyle = css`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 80px 0 120px 0;
	width: 100%;
	/* h2 {
		justify-content: center;
		margin: 0 8px;
		&:first-of-type {
			cursor: pointer;
			flex: 1;
			display: flex;
			justify-content: flex-end;
		}
		&:last-of-type {
			cursor: pointer;
			flex: 1;
			display: flex;
			justify-content: flex-start;
		}
	} */
`;

export default RepositorySection;
