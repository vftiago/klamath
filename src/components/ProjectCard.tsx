import React from "react";
import { css } from "@emotion/css";
import Card from "./Card";
import { ProjectItemNode } from "../api/octokit-api";

type ProjectCardProps = {
  projectTitle: string;
  projectItems: ProjectItemNode[];
};

function ProjectCard({ projectTitle, projectItems }: ProjectCardProps) {
  return (
    <Card size="m" orientation="horizontal" customStyles={projectCardStyle}>
      <h4>{projectTitle}</h4>
      {projectItems && (
        <span className={cardSpanStyle}>
          {projectItems.map(({ content }, index) => {
            return (
              <div key={index}>
                <h5>{content.title}</h5>
                <p>{content.body}</p>
              </div>
            );
          })}
        </span>
      )}
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
