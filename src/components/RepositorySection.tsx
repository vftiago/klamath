import React, { Suspense, useEffect } from "react";
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
    <Element className="flex flex-col items-center max-w-full py-6 gap-12" name="repository-section">
      <div className="max-w-[1600px] p-6 grid gap-6">
        <h2 className="text-xl font-bold" ref={ref}>
          Dashboard
        </h2>
        <div className="flex flex-col max-w-full">
          <Suspense fallback={<LoadingIcon />}>
            <RepositoryList repositoryData={repositoryData} />
          </Suspense>
        </div>
      </div>
    </Element>
  );
}

export default RepositorySection;
