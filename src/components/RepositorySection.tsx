import React, { Suspense, useEffect, useState } from "react";
import { css } from "@emotion/css";
import { useInView } from "react-intersection-observer";
import { Element } from "react-scroll";
import { getRepositoryData, UserRepositories } from "../api/octokit-api";
import LoadingIcon from "./icons/LoadingIcon";
const RepositoryList = React.lazy(() => import("./RepositoryList"));

type Props = {
  onVisibilityChange: (pageNumber: number, inview: boolean) => void;
};

function RepositorySection({ onVisibilityChange }: Props) {
  const [repositoryData, setRepositoryData] = useState<UserRepositories | null>(null);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    const loadRepositories = async () => {
      if (!repositoryData) {
        const repositoryData = await getRepositoryData();

        setRepositoryData(repositoryData);
      }
    };

    if (inView && !repositoryData) {
      loadRepositories();
    }
  }, [inView, repositoryData]);

  useEffect(() => {
    onVisibilityChange(1, inView);
  }, [inView, onVisibilityChange]);

  return (
    <Element className={getRepositorySectionContainerStyle()} name="repository-section">
      <h2 ref={ref}>Dashboard</h2>
      <div className={repositorySectionStyle}>
        <Suspense fallback={<LoadingIcon />}>
          {repositoryData && <RepositoryList repositoryData={repositoryData} />}
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
  height: 100%;
`;

const repositorySectionStyle = css`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  min-height: 1200px;
`;

export default RepositorySection;
