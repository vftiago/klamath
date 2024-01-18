import React, { Suspense, useEffect, useRef } from "react";
import { Element } from "react-scroll";
import { UserRepositories } from "../api/octokit-api";
import LoadingIcon from "./icons/LoadingIcon";
import RepositoryList from "./RepositoryList";
import { useInView } from "framer-motion";
import { Page } from "./MainApp";

type RepositorySectionProps = {
  onVisibilityChange: (page: Page, isInView: boolean) => void;
  repositoryData: UserRepositories;
};

function RepositorySection({ onVisibilityChange, repositoryData }: RepositorySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    onVisibilityChange(Page.Repository, isInView);
  }, [isInView, onVisibilityChange]);

  return (
    <Element className="flex max-w-full flex-col items-center gap-12 py-6" name="repository-section">
      <div className="grid max-w-[1600px] gap-6 p-6">
        <h2 className="text-xl font-bold" ref={ref}>
          Projects
        </h2>
        <div className="flex max-w-full flex-col">
          <Suspense fallback={<LoadingIcon />}>
            <RepositoryList repositoryData={repositoryData} />
          </Suspense>
        </div>
      </div>
    </Element>
  );
}

export default RepositorySection;
