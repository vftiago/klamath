import { useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { Element } from "react-scroll";
import { Page } from "./MainApp";

type AboutSectionProps = {
  onVisibilityChange: (page: Page, isInView: boolean) => void;
};

export const About = ({ onVisibilityChange }: AboutSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    onVisibilityChange(Page.About, isInView);
  }, [isInView, onVisibilityChange]);

  return (
    <Element className="flex flex-col items-center py-6" name="about-section">
      <div className="grid max-w-[1600px] gap-6 p-6">
        <h2 className="text-xl font-bold" ref={ref}>
          About
        </h2>
        <div className="flex flex-col gap-6 text-lg">
          <p>
            I'm a <b>software engineer</b> by trade. The web is my domain, frontend is my speciality (although I don't
            shy away from the backend), React and TypeScript are my main tools.
          </p>
          <p>
            For better or worse, I did not follow the beaten path. After a brief career in international management I
            decided to pivot to software development by creating my own brand, taking on projects as a freelancer, and
            crafting a robust personal portfolio. I bring a unique blend of business and technical expertise to the
            table. During my years in management I have honed my ability to communicate effectively within global
            business structures, and internationally connected organizations.
          </p>
          <p>
            I'm a quick learner and very adaptable; new skills, languages and environments are never an issue. I'm also
            an experienced expat, having studied, worked and lived in China, The Netherlands, Mexico, Poland and
            Portugal, where I currently reside.
          </p>
        </div>
      </div>
    </Element>
  );
};
