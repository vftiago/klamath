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
        <div className="flex flex-col gap-3 text-lg">
          <p>
            I'm a <b>software developer</b>. The web is my domain, frontend is my speciality although I feel comfortable
            on both ends, and TypeScript is my main tool.
          </p>
          <p>
            I did not follow the beaten path. I bring a unique blend of business and technical expertise to the table. I
            found my passion for programming as soon as I got my first programmable calculator, and I've been
            continuously refining my technical skills ever since. After a brief career in international management I
            decided to pivot to software development by creating my own brand, taking on client projects as a
            freelancer, and crafting a robust personal portfolio.
          </p>
          <p>
            During my years in management I have honed my ability to communicate effectively within{" "}
            <b>global business structures</b>, and internationally connected organizations.
          </p>
          <p>
            I'm a quick learner and very adaptable; new skills, languages and environments are never an issue. I'm also
            an experienced expat, having studied, worked and lived in China, The Netherlands, Mexico, Poland and{" "}
            <b>Portugal</b>, where I currently reside.
          </p>
        </div>
      </div>
    </Element>
  );
};
