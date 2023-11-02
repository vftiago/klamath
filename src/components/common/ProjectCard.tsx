import React from "react";
import { css } from "@emotion/css";
import Card from "./Card";

type ProjectCardProps = {
  name: string;
  description: string | null;
  issues: {
    name: string;
    status: string;
  }[];
};

function ProjectCard({ name, description }: ProjectCardProps) {
  return (
    <Card size="m" orientation="horizontal" customStyles={projectCardStyle}>
      <h4>{name}</h4>
      {description && <span>{description}</span>}
    </Card>
  );
}

// const cardSpanStyle = css`
// 	p {
// 		margin: 0;
// 		display: -webkit-box;
// 		-webkit-line-clamp: 5;
// 		-webkit-box-orient: vertical;
// 	}
// `;

const projectCardStyle = css`
  margin: 0;
`;

export default ProjectCard;
