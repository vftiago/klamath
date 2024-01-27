import React, { useRef } from "react";
import Typed from "typed.js";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { EMAIL } from "../constants";

let typedMissionStatement: Typed;

const Footer = () => {
  const handleMissionStatementVisibilityChange = () => {
    if (typedMissionStatement) return;

    typedMissionStatement = new Typed("#mission-statement", {
      strings: [`Take back control of your digital <span className="text-orange-500">space.</span>`],
      typeSpeed: 10,
      showCursor: false,
    });
  };

  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      handleMissionStatementVisibilityChange();
    }
  }, [isInView]);

  return (
    <footer ref={ref} className="flex flex-col items-center gap-6 bg-neutral-100 p-6 text-sm md:text-base">
      <div className="flex w-full max-w-[1600px]">
        <div className="flex w-full flex-1 flex-col justify-between gap-6 md:flex-row">
          <div className="flex w-full justify-between gap-6 md:w-auto md:justify-normal">
            <a className="hover:text-orange-600" href="https://github.com/vftiago" target="_blank" rel="noreferrer">
              GitHub Profile
            </a>
            <a
              className="hover:text-orange-600"
              href="https://drive.google.com/file/d/1N9LG-5NWvCo5ryCXtD5cTeNIMuEYyxch/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              Curriculum Vitae
            </a>
            <a
              className="hover:text-orange-600"
              href="https://linkedin.com/in/vftiago"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn Profile
            </a>
          </div>
          <div>
            For specific inquiries contact me at{" "}
            <a href={`mailto:${EMAIL}`} className="hover:text-orange-600" target="_blank">
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-[1600px] items-center md:justify-center">
        <div className="w-[243px]">
          <p className="[&>span]:text-orange-600" id="mission-statement"></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
