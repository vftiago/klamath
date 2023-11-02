import React from "react";
import { css } from "@emotion/css";
import Typed from "typed.js";
import { colors } from "../theme";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

let typedMissionStatement: Typed;

function Footer() {
  const handleMissionStatementVisibilityChange = () => {
    if (typedMissionStatement) return;

    typedMissionStatement = new Typed("#mission-statement", {
      strings: [`take back control of your digital <span>space.</span>`],
      typeSpeed: 10,
      showCursor: false,
    });
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      handleMissionStatementVisibilityChange();
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <div className={footerStyle}>
        <div>
          <p id="mission-statement"></p>
        </div>
      </div>
    </div>
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
    color: ${colors.text.accent};
  }
`;

export default Footer;
