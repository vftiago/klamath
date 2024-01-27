import React from "react";
import LinkedinIcon from "./icons/LinkedinIcon";
import GithubIcon from "./icons/GithubIcon";
import MailIcon from "./icons/MailIcon";
import Clicky from "./Clicky";
import { motion } from "framer-motion";
import { copyToClipboard } from "../utils/copyToClipboard";
import { EMAIL } from "../constants";
import Typed from "typed.js";
import { useBreakpoints } from "../useBreakpoints";

// #region framer-animations
const visible = {
  opacity: 1,
  x: 0,
  transition: {
    delay: 2,
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
// #endregion framer-animations

let typedMail: Typed;

const Socials = () => {
  const handleMailIconClick = () => {
    if (typedMail) typedMail.destroy();

    copyToClipboard(EMAIL);

    typedMail = new Typed("#toast", {
      strings: [`<u>${EMAIL}</u> copied to clipboard.`, ""],
      typeSpeed: 1,
      showCursor: false,
      fadeOut: true,
      backDelay: 5000,
    });
  };

  const { isXsHeight } = useBreakpoints();

  if (isXsHeight) return null;

  return (
    <motion.div className="flex w-full flex-col" initial="hidden" animate="visible" variants={socialIconsVariant}>
      <div className="flex w-[254px] pb-10">
        <span id="toast"></span>
      </div>
      <div className="flex w-full items-center justify-around ">
        <Clicky>
          <motion.a
            className="h-9 hover:cursor-pointer"
            variants={item}
            href="https://github.com/vftiago"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon customStyles="fill-black hover:fill-orange-600 transition duration-500 ease-out-expo" />
          </motion.a>
        </Clicky>

        <Clicky onClick={handleMailIconClick}>
          <motion.a className="h-9 hover:cursor-pointer" variants={item} rel="noreferrer">
            <MailIcon customStyles="fill-black hover:fill-orange-600 transition duration-500 ease-out-expo" />
          </motion.a>
        </Clicky>

        <Clicky>
          <motion.a
            className="h-9 hover:cursor-pointer"
            variants={item}
            href="https://linkedin.com/in/vftiago"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedinIcon customStyles="fill-black hover:fill-orange-600 transition duration-500 ease-out-expo" />
          </motion.a>
        </Clicky>
      </div>
    </motion.div>
  );
};

export default Socials;
