/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useInView } from "react-intersection-observer";
import React, { Suspense, useEffect, useState } from "react";
import { Element } from "react-scroll";
import { getRepos, Repositories } from "../api/octokit-api";
import LoadingIcon from "./icons/LoadingIcon";
const RepositoryWall = React.lazy(() => import("./RepositoryWall"));

type Props = {
	onVisibilityChange: (page: number, inView: boolean) => void;
};

function RepositorySection({ onVisibilityChange }: Props) {
	const [data, setData] = useState<Repositories | null>(null);

	const { ref, inView } = useInView({
		threshold: 1,
	});

	useEffect(() => {
		const loadProjects = async () => {
			if (!data) {
				const repos = await getRepos();

				const data = repos.filter((repo) => !repo.fork && !repo.archived);

				setData(data);
			}
		};

		if (inView && !data) {
			loadProjects();
		}
	}, [inView, data]);

	useEffect(() => {
		onVisibilityChange(1, inView);
	}, [inView]);

	return (
		<Element css={projectSectionStyle} name="repository-section">
			<div
				css={css`
					margin: 80px 0 120px 0;
				`}
			>
				<h2 ref={ref}>Project Wall</h2>
			</div>
			<Suspense fallback={<LoadingIcon />}>
				{data && <RepositoryWall data={data} />}
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
`;

export default RepositorySection;
