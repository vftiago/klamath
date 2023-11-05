import React, { Suspense, useEffect } from "react";
import { css } from "@emotion/css";
import { useInView } from "react-intersection-observer";
import { Element } from "react-scroll";
import { UserRepositories } from "../api/octokit-api";
import LoadingIcon from "./icons/LoadingIcon";
import RepositoryList from "./RepositoryList";

type RepositorySectionProps = {
  onVisibilityChange: (pageNumber: number, inview: boolean) => void;
  repositoryData: UserRepositories;
};

function RepositorySection({ onVisibilityChange, repositoryData }: RepositorySectionProps) {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    onVisibilityChange(1, inView);
  }, [inView, onVisibilityChange]);

  return (
    <Element className={repositorySectionContainerStyles} name="repository-section">
      <div
        className={css`
          max-width: 1600px;
          padding: 24px;
          display: grid;
          gap: 24px;
        `}
      >
        <h2 ref={ref}>Dashboard</h2>
        <div className={repositorySectionStyle}>
          <Suspense fallback={<LoadingIcon />}>
            <RepositoryList repositoryData={repositoryData} />
          </Suspense>
        </div>
      </div>
    </Element>
  );
}

const repositorySectionContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 24px;
  gap: 48px;
  max-width: 100%;
`;

const repositorySectionStyle = css`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

export default RepositorySection;
