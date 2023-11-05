import React, { Suspense, useEffect } from "react";
import { css } from "@emotion/css";
import { useInView } from "react-intersection-observer";
import { Element } from "react-scroll";
import { UserRepositories } from "../api/octokit-api";
import LoadingIcon from "./icons/LoadingIcon";
const RepositoryList = React.lazy(() => import("./RepositoryList"));

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
    <Element className={getRepositorySectionContainerStyle()} name="repository-section">
      <h2 ref={ref}>Dashboard</h2>
      <div className={repositorySectionStyle}>
        <Suspense fallback={<LoadingIcon />}>
          <RepositoryList repositoryData={repositoryData} />
        </Suspense>
      </div>
    </Element>
  );
}

const getRepositorySectionContainerStyle = () => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 24px;
  gap: 48px;
`;

const repositorySectionStyle = css`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

export default RepositorySection;
