import React from "react";
import Typed from "typed.js";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Waterfall from "./Waterfalll";
import Socials from "./Socials";

// #region framer-animations
const visible = {
  opacity: 1,
  x: 0,
  transition: {
    delay: 0.2,
    duration: 0.8,
    when: "beforeChildren",
    staggerChildren: 0.2,
    ease: "backInOut",
  },
};

const socialIconsVariant = {
  visible,
  hidden: { opacity: 0 },
};
// #endregion framer-animations

let typedName: Typed;
let typedJob: Typed;

const HEADING_1_START_DELAY = 1800;
const HEADING_2_START_DELAY = 0;

const defaultTypedOptions = {
  typeSpeed: 20,
  showCursor: true,
  cursorChar: "_",
};

const typedJobCallback = (self: Typed) => {
  typedJob = new Typed("#typed-job", {
    ...defaultTypedOptions,
    strings: [`Software developer`],
    startDelay: HEADING_2_START_DELAY,
  });

  self.cursor.remove();
};

type MainSectionProps = {
  isLoading: boolean;
  onVisibilityChange: (pageNumber: number, inview: boolean) => void;
};

const MainSection = ({ isLoading, onVisibilityChange }: MainSectionProps) => {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    typedName = new Typed("#typed-name", {
      ...defaultTypedOptions,
      strings: [`Tiago Fernandes`],
      startDelay: HEADING_1_START_DELAY,
      onComplete: typedJobCallback,
    });

    return () => {
      typedName?.destroy();
      typedJob?.destroy();
    };
  }, []);

  useEffect(() => {
    onVisibilityChange(0, inView);
  }, [inView]);

  return (
    <main className="flex min-h-full w-full flex-col items-center justify-center">
      <div className="h-20 w-[349px]">
        <h1 className="text-3xl font-bold" ref={ref}>
          <span id="typed-name"></span>
        </h1>
        <h2>
          <span className="text-xl" id="typed-job"></span>
        </h2>
      </div>
      <motion.div
        className="absolute bottom-0 flex flex-col items-center justify-center pb-32"
        initial="hidden"
        animate="visible"
        variants={socialIconsVariant}
      >
        <div className="h-5 w-[254px] pb-12">
          <span id="toast"></span>
        </div>
        <Socials />
        {!isLoading && <Waterfall />}
      </motion.div>
    </main>
  );
};

export default MainSection;
