import React from "react";
import { css } from "@emotion/css";
import { ProjectItemNode } from "../api/octokit-api";
import GlassPanel from "../glass-ui/GlassPanel";

type ProjectCardProps = {
  projectTitle: string;
  projectItems: ProjectItemNode[];
};

function ProjectCard({ projectTitle, projectItems }: ProjectCardProps) {
  return (
    <GlassPanel customStyles={projectCardStyle}>
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
    </GlassPanel>
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
