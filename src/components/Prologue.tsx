/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fragment, MutableRefObject, useEffect, useRef } from "react";
import Typed from "typed.js";
import { motion } from "framer-motion";

type Props = {
  onButtonClick: () => void;
  onButtonHover: () => void;
};

function Prologue(props: Props) {
  const { onButtonClick, onButtonHover } = props;

  let typedMurakamiQuote: Typed;
  let typedAttribution: Typed;

  const handleButtonClick = () => {
    onButtonClick();
  };

  const handleButtonHover = () => {
    onButtonHover();
  };

  // const typeAttribution = () => {
  //   typedAttribution = new Typed("#murakami-attribution", {
  //     strings: ["— Haruki Murakami"],
  //     startDelay: 100,
  //     typeSpeed: 10,
  //     showCursor: false,
  //     fadeOut: true,
  //     onComplete: () => {
  //       onTypeAttributionComplete();
  //     },
  //   });
  // };

  // const typeQuote = () => {
  //   typedMurakamiQuote = new Typed("#murakami-quote", {
  //     strings: [
  //       "Unfortunately, the clock is ticking, the hours are going by. The past increases, the future recedes. Possibilities decreasing, regrets mounting.",
  //     ],
  //     startDelay: 800,
  //     typeSpeed: 10,
  //     showCursor: false,
  //     fadeOut: true,
  //     onComplete: () => {
  //       if (document.getElementById("murakami-attribution")) typeAttribution();
  //     },
  //   });
  // };

  useEffect(() => {
    if (typedMurakamiQuote) typedMurakamiQuote.destroy();
    if (typedAttribution) typedAttribution.destroy();
    // typeQuote();
  }, []);

  return (
    <Fragment>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        exit={{ opacity: 0 }}
        css={prologueContainerStyle}
      >
        <div css={quoteWindowStyle}>
          <motion.h1 variants={item} id="murakami-quote">
            Unfortunately, the clock is ticking, the hours are going by. The
            past increases, the future recedes. Possibilities decreasing,
            regrets mounting.
          </motion.h1>
          <motion.h2 variants={item} id="murakami-attribution">
            — Haruki Murakami
          </motion.h2>
          <div css={buttonContainerStyles}>
            <motion.button
              variants={item}
              css={buttonStyles}
              onClick={handleButtonClick}
              onMouseEnter={handleButtonHover}
            >
              I Understand
            </motion.button>
            <motion.button
              variants={item}
              css={buttonStyles}
              onClick={handleButtonClick}
              onMouseEnter={handleButtonHover}
            >
              Remain ignorant
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}
// ar" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate"

const variants = {
  visible: {
    opacity: 1,
    cursor: "arrow",
    transition: {
      delay: 0.8,
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.4,
      ease: "backInOut",
    },
  },
  hidden: { opacity: 0 },
};

const item = {
  visible: {
    opacity: 1,
    cursor: "pointer",
    transition: {
      duration: 0.8,
      ease: "backInOut",
    },
  },
  hidden: { opacity: 0 },
};

const accentColor = "#fa8072";

const prologueContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const quoteWindowStyle = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 60px;
  background-color: rgba(88, 88, 88, 0.02);
  border: 1px solid rgba(128, 128, 128, 0.1);
  height: 300px;
  width: 600px;
  transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  h1 {
    line-height: 1.2;
    margin: 0;
  }
  h2 {
    color: #dfdfdf;
    margin: 0;
  }
`;

const buttonContainerStyles = css`
  display: flex;
  justify-content: flex-end;
`;

const hoverButtonStyles = css`
  border: 1px solid ${accentColor};
  background-color: rgba(250, 128, 114, 0.2);
`;

const buttonStyles = css`
  font-size: 16px;
  background-color: rgba(240, 240, 240, 0.7);
  border: 1px solid rgba(128, 128, 128, 0.1);
  margin-left: 16px;
  padding: 10px 20px;
  transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  &:focus {
    outline: none;
  }
  &:hover {
    ${hoverButtonStyles}
  }
`;

export default Prologue;
