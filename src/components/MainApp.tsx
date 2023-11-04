import React, { useCallback, useMemo, useRef, useState } from "react";
import { css } from "@emotion/css";
import buttonClick from "./audio/button-click.mp3";
import buttonHover from "./audio/button-hover.mp3";
import playSound from "../utils/playSound";
import Footer from "./Footer";
import LeftNavbar from "./LeftNavbar";
import MainSection from "./MainSection";
import RepositorySection from "./RepositorySection";
import ThreeScene from "./3d/ThreeScene";
import { WeightedTable } from "@lrkit/weighted/src/types";
import RightNavbar from "./RightNavbar";
import { v4 } from "uuid";

const MainApp = ({ weightedHeaders }: { weightedHeaders: WeightedTable<string>[] }) => {
  const [muted, setMuted] = useState<boolean>(true);

  const uuid = useMemo(() => v4(), []);

  const [pageVisibilityInfo, setPageVisibilityInfo] = useState<Map<number, boolean>>(
    new Map([
      [0, true],
      [1, false],
    ]),
  );

  const [firstVisiblePage, setFirstVisiblePage] = useState<number>(0);
  const [header, setHeader] = useState<string>("Hello World");

  const buttonClickAudioElement = useRef(null);
  const buttonHoverAudioElement = useRef(null);

  const handleButtonClick = () => {
    if (muted) return;
    playSound(buttonClickAudioElement);
  };

  const handleButtonHover = useCallback(() => {
    if (muted) return;
    playSound(buttonHoverAudioElement);
  }, [muted]);

  const handleHeadphonesIconClick = useCallback(() => {
    setMuted(!muted);
  }, [muted]);

  const handleVisibilityChange = (pageNumber: number, inView: boolean) => {
    setPageVisibilityInfo(pageVisibilityInfo.set(pageNumber, inView));

    const firstPageVisibilityInfo = [...pageVisibilityInfo].find((page) => page[1]);

    if (!firstPageVisibilityInfo || firstPageVisibilityInfo[0] === firstVisiblePage) return;

    setFirstVisiblePage(firstPageVisibilityInfo[0]);

    const header = weightedHeaders[firstPageVisibilityInfo[0]].pick();

    setHeader(header);
  };

  return (
    <div className={appContainerStyles}>
      <audio src={buttonClick} ref={buttonClickAudioElement} muted={muted}></audio>
      <audio src={buttonHover} ref={buttonHoverAudioElement} muted={muted}></audio>
      <ThreeScene />
      <LeftNavbar header={header} onHeadphonesIconClick={handleHeadphonesIconClick} onButtonHover={handleButtonHover} />
      <RightNavbar
        header={uuid}
        muted={muted}
        onHeadphonesIconClick={handleHeadphonesIconClick}
        onButtonHover={handleButtonHover}
      />
      <MainSection
        onVisibilityChange={handleVisibilityChange}
        onHeadphonesIconClick={handleHeadphonesIconClick}
        onButtonClick={handleButtonClick}
        onButtonHover={handleButtonHover}
      />
      <RepositorySection onVisibilityChange={handleVisibilityChange} />
      <Footer />
    </div>
  );
};

const appContainerStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 120px;
  padding: 0 80px;
`;

export default MainApp;
