import React, { useEffect, useMemo, useState } from "react";
import buttonClick from "./audio/button-click.mp3";
import buttonHover from "./audio/button-hover.mp3";
import Footer from "./Footer";
import { NavbarPosition } from "./Navbar";
import MainSection from "./MainSection";
import RepositorySection from "./RepositorySection";
import { WeightedTable } from "@lrkit/weighted/src/types";
import { v4 } from "uuid";
import Navbar from "./Navbar";
import Logo from "./icons/Logo";
import { useAudio } from "../useAudio";
import { AudioContext } from "./AudioContext";
import AudioToggle from "./AudioToggle";
import { UserRepositories, getRepositoryData } from "../api/octokit-api";
import LoadingIcon from "./icons/LoadingIcon";
// import { CgOptions } from "react-icons/cg";
import { useBreakpoints } from "../useBreakpoints";
import { About } from "./AboutSection";

export enum Page {
  Main,
  Repository,
  About,
}

const pageVisibilityInfo = new Map([
  [Page.Main, true],
  [Page.Repository, false],
  [Page.About, false],
]);

const MainApp = ({ weightedHeaders }: { weightedHeaders: WeightedTable<string>[] }) => {
  const { isMuted, toggleMuted, buttonClickAudioElementRef, buttonHoverAudioElementRef } = useAudio();
  const [repositoryData, setRepositoryData] = useState<UserRepositories | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [firstVisiblePage, setFirstVisiblePage] = useState<number>(0);
  const [header, setHeader] = useState<string>("Hello World");
  const { isLgScreen } = useBreakpoints();

  const uuid = useMemo(() => v4(), []);

  const handleVisibilityChange = (page: Page, inView: boolean) => {
    pageVisibilityInfo.set(page, inView);

    const firstPageVisibilityInfo = [...pageVisibilityInfo].find((page) => page[1]);

    if (!firstPageVisibilityInfo || firstPageVisibilityInfo[0] === firstVisiblePage) return;

    setFirstVisiblePage(firstPageVisibilityInfo[0]);

    const header = weightedHeaders[firstPageVisibilityInfo[0]].pick();

    setHeader(header);
  };

  useEffect(() => {
    const loadRepositories = async () => {
      const repositoryData = await getRepositoryData();

      setRepositoryData(repositoryData);
      setIsloading(false);
    };

    if (!repositoryData) {
      loadRepositories();
    }
  }, [repositoryData]);

  return (
    <div id="app" className="flex h-full flex-col gap-32 lg:px-20">
      <audio src={buttonClick} ref={buttonClickAudioElementRef} muted={isMuted}></audio>
      <audio src={buttonHover} ref={buttonHoverAudioElementRef} muted={isMuted}></audio>
      <AudioContext.Provider value={{ isMuted, buttonClickAudioElementRef, buttonHoverAudioElementRef }}>
        {isLgScreen && (
          <>
            <Navbar
              leftIcon={<Logo />}
              position={NavbarPosition.Left}
              header={header}
              rightIcon={<AudioToggle isMuted={isMuted} toggleMuted={toggleMuted} />}
            />
            <Navbar
              position={NavbarPosition.Right}
              // leftIcon={<CgOptions size={26} />}
              rightIcon={isLoading && <LoadingIcon />}
              header={uuid}
            />
          </>
        )}
        <MainSection isLoading={isLoading} onVisibilityChange={handleVisibilityChange} />
        {repositoryData && (
          <RepositorySection repositoryData={repositoryData} onVisibilityChange={handleVisibilityChange} />
        )}
        <About onVisibilityChange={handleVisibilityChange} />
        <Footer />
      </AudioContext.Provider>
    </div>
  );
};

export default MainApp;
