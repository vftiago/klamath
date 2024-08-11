import React, { useEffect, useState } from "react";
import buttonClick from "./audio/button-click.mp3";
import buttonHover from "./audio/button-hover.mp3";
import Footer from "./Footer";
import MainSection from "./MainSection";
import RepositorySection from "./RepositorySection";
import { WeightedTable } from "@lrkit/weighted/src/types";
import Logo from "./icons/Logo";
import { useAudio } from "../useAudio";
import { AudioContext } from "./AudioContext";
import AudioToggle from "./AudioToggle";
import { UserRepositories, getRepositoryData } from "../api/octokit-api";
// import { CgOptions } from "react-icons/cg";
import { useBreakpoints } from "../useBreakpoints";
import { About } from "./AboutSection";
import Navbar from "./Navbar";

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
    <div className="flex h-full flex-col gap-32 lg:px-20">
      {isLgScreen && (
        <Navbar
          leftIcon={<Logo />}
          header={header}
          isTyped
          rightIcon={<AudioToggle isMuted={isMuted} toggleMuted={toggleMuted} />}
        />
      )}
      <audio src={buttonClick} ref={buttonClickAudioElementRef} muted={isMuted}></audio>
      <audio src={buttonHover} ref={buttonHoverAudioElementRef} muted={isMuted}></audio>
      <AudioContext.Provider value={{ isMuted, buttonClickAudioElementRef, buttonHoverAudioElementRef }}>
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
