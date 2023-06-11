import React from "react";
import { css } from "@emotion/css";
import { Fragment, useEffect, useState } from "react";
import {
	getProjectColumnCards,
	getProjectColumns,
} from "../../api/octokit-api";
import { marked } from "marked";
import DOMPurify from "dompurify";
import Card from "./Card";

type ProjectCardProps = {
	projectId: number;
	projectName: string;
	projectDescription: string | null;
};

function ProjectCard(props: ProjectCardProps) {
	const { projectId, projectName, projectDescription } = props;

	const [data, setData] = useState<string | null>(null);

	const loadProjectColumns = async () => {
		if (!data) {
			const projectColumns = await getProjectColumns(projectId);

			const inProgressColumn = projectColumns.find(
				(column) => column.name === "In progress",
			);

			if (!inProgressColumn) return;

			const inProgressColumnCards = await getProjectColumnCards(
				inProgressColumn.id,
			);

			if (!inProgressColumnCards.length) return;

			setData(inProgressColumnCards[0].note);
		}
	};

	useEffect(() => {
		loadProjectColumns();
	}, []);

	return (
		<Card size="m" orientation="horizontal" customStyles={projectCardStyle}>
			<h4>{projectName}</h4>
			{projectDescription && <span>{projectDescription}</span>}
			{data ? (
				<Fragment>
					<p>Currently working on:</p>
					<span>
						<ul>
							<li
								className={cardSpanStyle}
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(marked(data)),
								}}
							></li>
						</ul>
					</span>
				</Fragment>
			) : null}
		</Card>
	);
}

const cardSpanStyle = css`
	p {
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
	}
`;

const projectCardStyle = css`
	margin: 0;
`;

export default ProjectCard;
