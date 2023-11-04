import React, { Suspense } from "react";
import { css } from "@emotion/css";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import { UserProjectsV2, getProjectData } from "../api/octokit-api";
import ProjectList from "./ProjectList";
import { useBreakpoints } from "../useBreakpoints";
import LoadingIcon from "./icons/LoadingIcon";

type Props = {
  onVisibilityChange: (page: number, inView: boolean) => void;
};

function ProjectSection({ onVisibilityChange }: Props) {
  const [projectData, setProjectData] = useState<UserProjectsV2 | null>(null);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  const { isLgScreen } = useBreakpoints();

  useEffect(() => {
    const loadRepositories = async () => {
      if (!projectData) {
        const projectData = await getProjectData();

        console.log(projectData);

        setProjectData(projectData);
      }
    };

    if (inView && !projectData) {
      loadRepositories();
    }
  }, [inView, projectData]);

  useEffect(() => {
    onVisibilityChange(1, inView);
  }, [inView]);

  return (
    <Element className={getProjectSectionContainerStyle(isLgScreen)} name="projectSection">
      <h2 ref={ref}>Projects</h2>
      <div className={projectSectionStyle}>
        <Suspense fallback={<LoadingIcon />}>{projectData && <ProjectList projectData={projectData} />}</Suspense>
      </div>
    </Element>
  );
}

const getProjectSectionContainerStyle = (isLgScreen: boolean) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${isLgScreen ? 128 : 24}px;
  gap: 30px;
`;

const projectSectionStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default ProjectSection;
