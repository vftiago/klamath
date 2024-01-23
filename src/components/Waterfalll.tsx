import React from "react";
import { motion } from "framer-motion";
import { scroller } from "react-scroll";
import Clicky from "./Clicky";

// #region framer-animations
const item = {
  visible: {
    opacity: 1,
    cursor: "pointer",
    transition: {
      delay: 4,
      duration: 4,
      ease: "backInOut",
    },
  },
  hidden: { opacity: 0 },
};
// #endregion framer-animations

const Waterfall = () => {
  const handleWaterfallClick = () => {
    scroller.scrollTo("repository-section", {
      smooth: true,
    });
  };

  return (
    <Clicky>
      <motion.div
        className="absolute bottom-0 h-14 w-[17px] overflow-hidden transition delay-500 ease-out-expo [&>span]:hover:bg-orange-600"
        variants={item}
        onClick={handleWaterfallClick}
      >
        {["left-0", "left-1/2 ml-[-1px] animation-delay-300", "right-0 animation-delay-150"].map((spanClass, index) => {
          return (
            <span
              className={`${spanClass} absolute top-0 h-full w-[1px] animate-waterfall bg-black transition duration-500 ease-out-expo`}
              key={index}
            ></span>
          );
        })}
      </motion.div>
    </Clicky>
  );
};

export default Waterfall;
