/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import VisibilitySensor from "react-visibility-sensor";
import { accentColor } from "../common/breakpoints";
import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";
import { OctokitResponse } from "@octokit/types";

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_AUTH_TOKEN,
});

function Projects() {
  const [data, setData] = useState<OctokitResponse<any, number> | null>(null);

  let projectList: any;

  const loadCrap = async () => {
    const response = await octokit.request("GET /repos/vftiago/klamath/events");

    setData(response.data);
    buildProjectSection(response.data);
  };

  //   useEffect(() => {}, []);

  const buildProjectSection = (data: any[]) => {
    // data.map();
    return <div></div>;
  };

  const handleVisibilityChange = (isVisible: boolean) => {
    console.log(isVisible);
    if (isVisible) {
      loadCrap();
    }
  };

  return (
    <VisibilitySensor onChange={handleVisibilityChange}>
      <div css={projectSectionStyle}>{}</div>
    </VisibilitySensor>
  );
}

const projectSectionStyle = css`
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 241px;
  }
  span {
    color: ${accentColor};
  }
`;

export default Projects;
