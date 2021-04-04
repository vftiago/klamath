/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Typed from "typed.js";
import VisibilitySensor from "react-visibility-sensor";
import { accentColor } from "../common/breakpoints";

let typedMissionStatement: Typed;

function Footer() {
  const handleMissionStatementVisibilityChange = (isVisible: boolean) => {
    if (isVisible) {
      if (typedMissionStatement) return;

      typedMissionStatement = new Typed("#mission-statement", {
        strings: [`take back control of your digital <span>space.</span>`],
        typeSpeed: 10,
        showCursor: false,
      });
    }
  };

  return (
    <VisibilitySensor onChange={handleMissionStatementVisibilityChange}>
      <div css={footerStyle}>
        <div>
          <p id="mission-statement"></p>
        </div>
      </div>
    </VisibilitySensor>
  );
}

const footerStyle = css`
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

export default Footer;
