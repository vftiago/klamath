import React from "react";
import { css } from "@emotion/css";
import { colors, typography } from "../theme";
import { RepositoryNode } from "../api/octokit-api";
import { VscGitCommit } from "react-icons/vsc";
import GlassPanel from "../glass-ui/GlassPanel";

type RepositoryCardProps = {
  repositoryNode: RepositoryNode;
};

function RepositoryCard({ repositoryNode }: RepositoryCardProps) {
  const { name, homepageUrl, url, defaultBranchRef } = repositoryNode;

  const commitHistory = defaultBranchRef ? defaultBranchRef.target.history.edges : [];

  // const issueItems = issues.nodes;

  return (
    <GlassPanel customStyles={repositoryCardStyle}>
      <div className={repositoryCardTitleContainerStyle}>
        <h4>{name}</h4>

        {homepageUrl && (
          <a target="_blank" rel="noreferrer" href={homepageUrl}>
            {homepageUrl}
          </a>
        )}
      </div>
      {/* <div className={repositoryCardStyle}>
        {issueItems.length ? (
          <div>
            <ul className={cardListStyle}>
              {issueItems.map(({ title, state }, index) => {
                return (
                  <li key={index}>
                    <GoIssueOpened size="18px" />
                    <span className={messageStyle}>{title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          "No open issues."
        )}
      </div> */}
      <div
        className={css`
          display: flex;
          gap: 8px;
          flex: 1;
          flex-direction: column;
        `}
      >
        <p>Latest commits:</p>
        {commitHistory.length ? (
          <ul className={cardListStyle}>
            {commitHistory.map((commit, index) => {
              return (
                <li key={index}>
                  <VscGitCommit size="18px" />
                  <span className={messageStyle}>{commit.node.message}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          "Nothing to see here."
        )}
      </div>
      <div className={repositoryCardFooterStyle}>
        <a target="_blank" rel="noreferrer" href={url}>
          {url}
        </a>
      </div>
    </GlassPanel>
  );
}

const repositoryCardStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  flex: 1;
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

const repositoryCardFooterStyle = css`
  display: flex;
  a {
    color: ${colors.text.muted};
    font-size: ${typography.text.xs};
  }
`;

const cardListStyle = css`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  li {
    height: 18px;
    display: grid;
    grid-gap: 8px;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
    padding: 0;
  }
`;

const messageStyle = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
`;

export default RepositoryCard;
