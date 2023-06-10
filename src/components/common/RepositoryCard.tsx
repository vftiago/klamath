import React from "react";
import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import { getRepositoryCommits, RepositoryCommits } from "../../api/octokit-api";
import GlassPane from "../../glass-ui/GlassPane";
import { colors, sizes } from "../../theme";
import GitCommitIcon from "../icons/GitCommitIcon";

type RepositoryCardProps = {
	name: string;
	htmlUrl: string;
	homepage?: string | null;
};

function RepositoryCard(props: RepositoryCardProps) {
	const { name, htmlUrl, homepage } = props;

	const [data, setData] = useState<RepositoryCommits | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchRepositoryCommits = async () => {
			try {
				const commits = await getRepositoryCommits(name);

				setData(commits);
			} catch (e: unknown) {
        if (e instanceof Error) {
          setError(e);
        }
        
        throw new Error(`Unexpected Error: ${e}`);
			}
		};

		if (!data) {
			fetchRepositoryCommits();
		}
	}, [data, name]);

	return (
		<GlassPane
			size="s"
			orientation="horizontal"
			customCss={repositoryCardStyle}
		>
			<div className={repositoryCardTitleStyle}>
				<h4>{name}</h4>

				{homepage && (
					<a target="_blank" rel="noreferrer" href={homepage}>
						{homepage}
					</a>
				)}
			</div>
			<div className={repositoryCardBodyStyle}>
				{data ? (
					<div>
						<p>Latest commits:</p>
						<ul className={commitListStyle}>
							{data.map((commit, index) => {
								return (
									<li key={index}>
										<GitCommitIcon />
										<span className={commitMessageStyle}>
											{commit.commit.message}
										</span>
									</li>
								);
							})}
						</ul>
					</div>
				) : error ? (
					<div>
						<p>Oops!</p>
						<span>{error.message}</span>
					</div>
				) : (
					"Nothing to see here."
				)}
			</div>
			<div className={repositoryCardFooterStyle}>
				<a target="_blank" rel="noreferrer" href={htmlUrl}>
					GitHub
				</a>
			</div>
		</GlassPane>
	);
}

const repositoryCardStyle = css`
	display: flex;
	flex-direction: column;
`;

const repositoryCardTitleStyle = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid ${colors.border.muted};
	a {
		color: ${colors.text.accent};
		font-size: ${sizes.text.s};
	}
`;

const repositoryCardBodyStyle = css`
	flex: 1;
	p {
		font-size: ${sizes.text.s};
	}
`;

const repositoryCardFooterStyle = css`
	display: flex;
	/* align-self: flex-end; */
	a {
		color: ${colors.text.muted};
		font-size: ${sizes.text.xs};
	}
`;

const commitListStyle = css`
	padding: 0;
	li {
		display: grid;
		grid-gap: 8px;
		grid-template-columns: auto auto;
		align-items: center;
		justify-content: flex-start;
		list-style: none;
		padding: 0;
	}
`;

const commitMessageStyle = css`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

export default RepositoryCard;
