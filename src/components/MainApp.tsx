import React, { useMemo, useState } from "react";
import { css } from "@emotion/css";
import buttonClick from "./audio/button-click.mp3";
import buttonHover from "./audio/button-hover.mp3";
import Footer from "./Footer";
import { NavbarPosition } from "./Navbar";
import MainSection from "./MainSection";
import RepositorySection from "./RepositorySection";
import ThreeScene from "./3d/ThreeScene";
import { WeightedTable } from "@lrkit/weighted/src/types";
import { v4 } from "uuid";
import Navbar from "./Navbar";
import Logo from "./icons/Logo";
import { useAudio } from "../useAudio";
import { AudioContext } from "./AudioContext";
import AudioToggle from "./AudioToggle";

const MainApp = ({ weightedHeaders }: { weightedHeaders: WeightedTable<string>[] }) => {
  const { isMuted, toggleMuted, buttonClickAudioElementRef, buttonHoverAudioElementRef } = useAudio();

  const uuid = useMemo(() => v4(), []);

  const [pageVisibilityInfo, setPageVisibilityInfo] = useState<Map<number, boolean>>(
    new Map([
      [0, true],
      [1, false],
    ]),
  );

  const [firstVisiblePage, setFirstVisiblePage] = useState<number>(0);
  const [header, setHeader] = useState<string>("Hello World");

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
      <audio src={buttonClick} ref={buttonClickAudioElementRef} muted={isMuted}></audio>
      <audio src={buttonHover} ref={buttonHoverAudioElementRef} muted={isMuted}></audio>
      <ThreeScene />
      <AudioContext.Provider value={{ isMuted, buttonClickAudioElementRef, buttonHoverAudioElementRef }}>
        <Navbar
          leftIcon={<Logo />}
          position={NavbarPosition.Left}
          header={header}
          rightIcon={<AudioToggle isMuted={isMuted} toggleMuted={toggleMuted} />}
        />
        <Navbar position={NavbarPosition.Right} header={uuid} />
        <MainSection onVisibilityChange={handleVisibilityChange} />
        <RepositorySection onVisibilityChange={handleVisibilityChange} />
        <Footer />
      </AudioContext.Provider>
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
