import React from "react";
import LinkedinIcon from "./icons/LinkedinIcon";
import GithubIcon from "./icons/GithubIcon";
import MailIcon from "./icons/MailIcon";
import Clicky from "./Clicky";
import { motion } from "framer-motion";
import { copyToClipboard } from "../utils/copyToClipboard";
import { EMAIL } from "../constants";
import Typed from "typed.js";

// #region framer-animations
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

  return (
    <div className={`flex items-center justify-between gap-20`}>
      <Clicky>
        <motion.a
          className="h-9 hover:cursor-pointer"
          variants={item}
          href="https://github.com/vftiago"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon customStyles="fill-neutral-800 hover:fill-orange-600 transition duration-500 ease-out-expo" />
        </motion.a>
      </Clicky>

      <Clicky onClick={handleMailIconClick}>
        <motion.a className="h-9 hover:cursor-pointer" variants={item} target="_blank" rel="noreferrer">
          <MailIcon customStyles="fill-neutral-800 hover:fill-orange-600 transition duration-500 ease-out-expo" />
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
          <LinkedinIcon customStyles="fill-neutral-800 hover:fill-orange-600 transition duration-500 ease-out-expo" />
        </motion.a>
      </Clicky>
    </div>
  );
};

export default Socials;
