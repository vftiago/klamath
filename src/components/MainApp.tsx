import React, { useCallback, useMemo, useRef, useState } from "react";
import { css } from "@emotion/css";
import buttonClick from "./audio/button-click.mp3";
import buttonHover from "./audio/button-hover.mp3";
import playSound from "../utils/playSound";
import Footer from "./Footer";
import { NavbarPosition } from "./Navbar";
import MainSection from "./MainSection";
import RepositorySection from "./RepositorySection";
import ThreeScene from "./3d/ThreeScene";
import { WeightedTable } from "@lrkit/weighted/src/types";
import { v4 } from "uuid";
import Navbar from "./Navbar";
import Logo from "./icons/Logo";
import HeadphonesIcon from "./icons/Headphones";
import { DEFAULT_ICON_SIZE, colors } from "../theme";

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
      <Navbar
        leftIcon={<Logo />}
        position={NavbarPosition.Left}
        header={header}
        rightIcon={
          <div
            className={css([soundIconStyle, muted && mutedStyle])}
            onMouseEnter={handleButtonHover}
            onClick={handleHeadphonesIconClick}
          >
            <HeadphonesIcon />
          </div>
        }
      />
      <Navbar position={NavbarPosition.Right} header={uuid} />
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

const soundIconStyle = css`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    fill: #333;
  }
  &:hover {
    cursor: pointer;
    svg {
      fill: ${colors.icon.accent};
    }
    &::after {
      background-color: ${colors.icon.accent};
    }
  }
  &:after {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    background-color: #666;
    content: "";
    position: absolute;
    left: 50%;
    width: ${Math.sqrt(DEFAULT_ICON_SIZE * DEFAULT_ICON_SIZE + DEFAULT_ICON_SIZE * DEFAULT_ICON_SIZE) + "px"};
    height: 2px;
    margin-top: -1px;
    margin-left: ${-1 * DEFAULT_ICON_SIZE * 0.75 + "px"};
    transform: rotate(-45deg) scaleX(0);
  }
`;

const mutedStyle = css`
  &:after {
    transform: rotate(-45deg) scaleX(1);
  }
`;

export default MainApp;
