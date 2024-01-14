import React from "react";
import Typed from "typed.js";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

let typedMissionStatement: Typed;

function Footer() {
  const handleMissionStatementVisibilityChange = () => {
    if (typedMissionStatement) return;

    typedMissionStatement = new Typed("#mission-statement", {
      strings: [`take back control of your digital <span className="text-orange-500">space.</span>`],
      typeSpeed: 10,
      showCursor: false,
    });
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      handleMissionStatementVisibilityChange();
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <div className={`h-20 w-full flex items-center justify-center`}>
        <div className="w-[241px]">
          <p className="[&>span]:text-orange-600" id="mission-statement"></p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
