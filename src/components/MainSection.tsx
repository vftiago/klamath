import React, { useRef } from "react";
import Typed from "typed.js";
import { useInView } from "framer-motion";
import { useEffect } from "react";
import Waterfall from "./Waterfalll";
import Socials from "./Socials";
import { Page } from "./MainApp";

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
  onVisibilityChange: (page: Page, isInView: boolean) => void;
};

const MainSection = ({ isLoading, onVisibilityChange }: MainSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

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
    onVisibilityChange(Page.Main, isInView);
  }, [isInView, onVisibilityChange]);

  return (
    <main className="flex min-h-full w-full flex-col items-center justify-center">
      <div className="flex h-48 w-[306px] flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold" ref={ref}>
            <span id="typed-name"></span>
          </h1>
          <h2>
            <span className="text-xl" id="typed-job"></span>
          </h2>
        </div>
        <Socials />
      </div>
      <Waterfall isLoading={isLoading} />
    </main>
  );
};

export default MainSection;
