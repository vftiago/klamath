import React, { useRef } from "react";
import Typed from "typed.js";
import { useEffect } from "react";
import { useInView } from "framer-motion";

let typedMissionStatement: Typed;

const Footer = () => {
  const handleMissionStatementVisibilityChange = () => {
    if (typedMissionStatement) return;

    typedMissionStatement = new Typed("#mission-statement", {
      strings: [`take back control of your digital <span className="text-orange-500">space.</span>`],
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
    <div ref={ref}>
      <div className="flex h-20 w-full items-center justify-center">
        <div className="w-[241px]">
          <p className="[&>span]:text-orange-600" id="mission-statement"></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
