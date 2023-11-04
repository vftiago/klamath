import React from "react";
import { css } from "@emotion/css";
import { colors, typography } from "../theme";
import GitCommitIcon from "./icons/GitCommitIcon";
import Card from "./Card";
import { RepositoryNode } from "../api/octokit-api";

type RepositoryCardProps = {
  repositoryNode: RepositoryNode;
};

function RepositoryCard({ repositoryNode }: RepositoryCardProps) {
  const { name, homepageUrl, url, defaultBranchRef } = repositoryNode;

  const commitHistory = defaultBranchRef ? defaultBranchRef.target.history.edges : [];

  return (
    <Card size="s" orientation="horizontal" customStyles={repositoryCardStyle}>
      <div className={repositoryCardTitleContainerStyle}>
        <h4>{name}</h4>

        {homepageUrl && (
          <a target="_blank" rel="noreferrer" href={homepageUrl}>
            {homepageUrl}
          </a>
        )}
      </div>
      <div className={repositoryCardBodyStyle}>
        {commitHistory.length ? (
          <div>
            <p>Latest commits:</p>
            <ul className={commitListStyle}>
              {commitHistory.map((commit, index) => {
                return (
                  <li key={index}>
                    <GitCommitIcon />
                    <span className={commitMessageStyle}>{commit.node.message}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          "Nothing to see here."
        )}
      </div>
      <div className={repositoryCardFooterStyle}>
        <a target="_blank" rel="noreferrer" href={url}>
          {url}
        </a>
      </div>
    </Card>
  );
}

const repositoryCardStyle = css`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
`;

const repositoryCardTitleContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.border.muted};
  a {
    color: ${colors.text.accent};
    font-size: ${typography.text.s};
  }
`;

const repositoryCardBodyStyle = css`
  flex: 1;
  p {
    font-size: ${typography.text.s};
  }
`;

const repositoryCardFooterStyle = css`
  display: flex;
  /* align-self: flex-end; */
  a {
    color: ${colors.text.muted};
    font-size: ${typography.text.xs};
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
    line-height: 1.3;
  }
`;

const commitMessageStyle = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
`;

export default RepositoryCard;
