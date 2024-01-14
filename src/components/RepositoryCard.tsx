import React from "react";
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
    <GlassPanel customStyles="flex flex-col justify-between gap-4 p-4 flex-1 min-h-64">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-300">
        <h4 className="text-base font-bold">{name}</h4>

        {homepageUrl && (
          <a className="text-sm text-orange-600" target="_blank" rel="noreferrer" href={homepageUrl}>
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
      <div className="flex flex-1 gap-2 flex-col">
        <p className="text-sm">Latest commits:</p>
        {commitHistory.length ? (
          <ul className="p-0 flex flex-col gap-1">
            {commitHistory.map((commit, index) => {
              return (
                <li className="h-4 grid gap-2 grid-flow-col items-center justify-start list-none p-0" key={index}>
                  <VscGitCommit size="18px" />
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    {commit.node.message}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          "Nothing to see here."
        )}
      </div>
      <div className="flex">
        <a className="text-sm text-neutral-500" target="_blank" rel="noreferrer" href={url}>
          {url}
        </a>
      </div>
    </GlassPanel>
  );
}

export default RepositoryCard;
