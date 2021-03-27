/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fragment, useState } from "react";
// import Typed from "typed.js";
import { motion } from "framer-motion";
import GlassPane from "../common/GlassPane";

type Props = {
  onButtonClick: () => void;
  onButtonHover: () => void;
  onModalVisible: () => void;
  onReady: () => void;
};

function Prologue(props: Props) {
  const { onButtonClick, onButtonHover, onModalVisible, onReady } = props;

  const [userHasClicked, setUserHasClicked] = useState(false);

  // let typedMurakamiQuote: Typed;
  // let typedAttribution: Typed;

  const handleButtonClick = () => {
    setUserHasClicked(true);
    onButtonClick();
  };

  const handleButtonHover = () => {
    onButtonHover();
  };

  // const onTypeAttributionComplete = () => {
  //   setTypeAttributionComplete(true);
  // };

  // const typeAttribution = () => {
  //   typedAttribution = new Typed("#murakami-attribution", {
  //     strings: ["— Haruki Murakami"],
  //     startDelay: 100,
  //     typeSpeed: 10,
  //     showCursor: false,
  //     fadeOut: true,
  //     onComplete: onTypeAttributionComplete,
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

  // useEffect(() => {
  //   if (typedMurakamiQuote) typedMurakamiQuote.destroy();
  //   if (typedAttribution) typedAttribution.destroy();
  //   typeQuote();
  // }, []);

  return (
    <Fragment>
      <motion.div
        initial="hidden"
        animate={userHasClicked ? "hidden" : "visible"}
        variants={modalVariants}
        css={prologueContainerStyle}
        onAnimationComplete={(definition: string) => {
          if (definition === "visible") {
            onModalVisible();
          }
          if (definition === "hidden") {
            onReady();
          }
        }}
      >
        <GlassPane>
          <h1 id="murakami-quote">
            Unfortunately, the clock is ticking, the hours are going by. The
            past increases, the future recedes. Possibilities decreasing,
            regrets mounting.
          </h1>
          <motion.h2 variants={headerVariants} id="murakami-attribution">
            — Haruki Murakami
          </motion.h2>
          <div
            // animate={typeAttributionComplete && "visible"}
            css={buttonContainerStyles}
          >
            <motion.button
              variants={buttonVariants}
              css={buttonStyles}
              onClick={handleButtonClick}
              onMouseEnter={handleButtonHover}
            >
              I Understand
            </motion.button>
            <motion.button
              variants={buttonVariants}
              css={buttonStyles}
              onClick={handleButtonClick}
              onMouseEnter={handleButtonHover}
            >
              Remain Ignorant
            </motion.button>
          </div>
        </GlassPane>
      </motion.div>
    </Fragment>
  );
}

const transitionIn = {
  delay: 0.6,
  duration: 0.8,
  staggerChildren: 0.2,
  when: "beforeChildren",
  ease: "backInOut",
};

const transitionOut = {
  ease: "backInOut",
};

const modalVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionIn,
  },
  hidden: {
    opacity: 0,
    y: -24,
    transition: transitionOut,
  },
};

const headerVariants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "backInOut",
    },
  },
  hidden: { opacity: 0, transition: transitionOut },
};

const buttonVariants = {
  visible: {
    opacity: 1,
    cursor: "pointer",
    transition: {
      duration: 0.8,
      ease: "backInOut",
    },
  },
  hidden: { opacity: 0, transition: transitionOut },
};

// const accentColor = "#ff7200";

const prologueContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

const buttonContainerStyles = css`
  display: flex;
  justify-content: flex-end;
`;

const hoverButtonStyles = css`
  border: 1px solid rgba(255, 114, 0, 0.3);
  background-color: rgba(250, 128, 114, 0.7);
`;

const buttonStyles = css`
  font-size: 16px;
  background-color: rgba(240, 240, 240, 0.7);
  border: 1px solid rgba(128, 128, 128, 0.1);
  margin-left: 16px;
  padding: 10px 20px;
  transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  box-shadow: 3px 3px 3px 0px rgba(88, 88, 88, 0.06);
  &:focus {
    outline: none;
  }
  &:hover {
    ${hoverButtonStyles}
  }
`;

export default Prologue;
