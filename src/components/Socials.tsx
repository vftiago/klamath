import React from "react";
import { css } from "@emotion/css";
import LinkedinIcon from "./icons/LinkedinIcon";
import GithubIcon from "./icons/GithubIcon";
import MailIcon from "./icons/MailIcon";
import Clicky from "./Clicky";
import { motion } from "framer-motion";
import { copyToClipboard } from "../utils/copyToClipboard";
import { EMAIL } from "../constants";
import Typed from "typed.js";
import { DEFAULT_ICON_SIZE, colors } from "../theme";

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

  return (
    <div className={socialIconsStyle}>
      <Clicky>
        <motion.a variants={item} href="https://github.com/vftiago" target="_blank" rel="noreferrer">
          <GithubIcon />
        </motion.a>
      </Clicky>

      <Clicky onClick={handleMailIconClick}>
        <motion.a variants={item} target="_blank" rel="noreferrer">
          <MailIcon />
        </motion.a>
      </Clicky>

      <Clicky>
        <motion.a variants={item} href="https://linkedin.com/in/vftiago" target="_blank" rel="noreferrer">
          <LinkedinIcon />
        </motion.a>
      </Clicky>
    </div>
  );
};

export default Socials;

const socialIconsStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 88px;
  a {
    height: ${DEFAULT_ICON_SIZE + "px"};
    width: ${DEFAULT_ICON_SIZE + "px"};
  }
  svg {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    fill: #333;
    &:hover {
      cursor: pointer;
      fill: ${colors.icon.accent};
    }
  }
`;
