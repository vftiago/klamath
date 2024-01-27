import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scroller } from "react-scroll";
import Clicky from "./Clicky";

// #region framer-animations
const visible = {
  opacity: 1,
  transition: {
    delay: 4,
    duration: 1,
    ease: "backInOut",
  },
};

const hidden = { opacity: 0 };

const waterFallVariant = {
  visible,
  hidden,
};
// #endregion framer-animations

type WaterfallProps = {
  isLoading: boolean;
};

const Waterfall = ({ isLoading }: WaterfallProps) => {
  const [hasUserScrolled, setHasUserScrolled] = useState(false);

  const handleWindowScroll = () => {
    setHasUserScrolled(true);
  };

  const handleWaterfallClick = () => {
    scroller.scrollTo("repository-section", {
      smooth: true,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  return (
    <Clicky>
      <AnimatePresence>
        {!isLoading && !hasUserScrolled && (
          <motion.div
            className="absolute bottom-0 flex flex-col items-center justify-center pb-32"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={waterFallVariant}
          >
            <div
              className="absolute bottom-0 h-14 w-[17px] overflow-hidden transition delay-500 ease-out-expo [&>span]:hover:bg-orange-600"
              onClick={handleWaterfallClick}
            >
              {["left-0", "left-1/2 ml-[-1px] animation-delay-300", "right-0 animation-delay-150"].map(
                (spanClass, index) => {
                  return (
                    <span
                      className={`${spanClass} absolute top-0 h-full w-[1px] animate-waterfall bg-black transition duration-500 ease-out-expo`}
                      key={index}
                    ></span>
                  );
                },
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Clicky>
  );
};

export default Waterfall;
