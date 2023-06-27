import React, { Suspense, useEffect, useState } from "react";
import { css } from "@emotion/css";
import { useInView } from "react-intersection-observer";
import { Element } from "react-scroll";
import { getRepos, Repositories } from "../api/octokit-api";
import LoadingIcon from "./icons/LoadingIcon";
import { useBreakpoints } from "../useBreakpoints";
const RepositoryList = React.lazy(() => import("./RepositoryList"));

type Props = {
	onVisibilityChange: (pageNumber: number, inview: boolean) => void;
};

function RepositorySection({ onVisibilityChange }: Props) {
	const [repositoryData, setRepositoryData] = useState<Repositories | null>(
		null,
	);

	const { ref, inView } = useInView({
		threshold: 1,
	});

	const { isLgScreen } = useBreakpoints();

	useEffect(() => {
		const loadRepositories = async () => {
			if (!repositoryData) {
				const repos = await getRepos();

				const repositoryData = repos.filter(
					(repo) => !repo.fork && !repo.archived && repo.name !== "vftiago",
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
	}, [inView, onVisibilityChange]);

	return (
		<Element
			className={getRepositorySectionContainerStyle(isLgScreen)}
			name="repository-section"
		>
			<div ref={ref} />
			<h2>Repositories</h2>
			<div className={repositorySectionStyle}>
				<Suspense fallback={<LoadingIcon />}>
					{repositoryData && <RepositoryList data={repositoryData} />}
				</Suspense>
			</div>
		</Element>
	);
}

const getRepositorySectionContainerStyle = (isLgScreen: boolean) => css`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: ${isLgScreen ? 128 : 24}px;
	gap: 30px;
`;

const repositorySectionStyle = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	width: 100%;
`;

export default RepositorySection;
