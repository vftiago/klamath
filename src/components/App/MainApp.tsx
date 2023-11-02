import React, { useRef, useState } from "react";
import { css } from "@emotion/css";
import buttonClick from "./audio/button-click.mp3";
import buttonHover from "./audio/button-hover.mp3";
import playSound from "../../utils/playSound";
import Footer from "../Footer";
import Navbar from "../Navbar";
import MainSection from "../MainSection";
import RepositorySection from "../RepositorySection";
import { useBreakpoints } from "../../useBreakpoints";
import ThreeScene from "../3d/ThreeScene";
import { WeightedTable } from "@lrkit/weighted/src/types";

const MainApp = ({
	weightedHeaders,
}: {
	weightedHeaders: WeightedTable<string>[];
}) => {
	const [muted, setMuted] = useState<boolean>(true);

	const { isMdScreen } = useBreakpoints();

	const [pageVisibilityInfo, setPageVisibilityInfo] = useState<
		Map<number, boolean>
	>(
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

	const handleButtonHover = () => {
		if (muted) return;
		playSound(buttonHoverAudioElement);
	};

	const handleHeadphonesIconClick = () => {
		setMuted(!muted);
	};

	const handleVisibilityChange = (pageNumber: number, inView: boolean) => {
		setPageVisibilityInfo(pageVisibilityInfo.set(pageNumber, inView));

		const firstPageVisibilityInfo = [...pageVisibilityInfo].find(
			(page) => page[1],
		);

		if (
			!firstPageVisibilityInfo ||
			firstPageVisibilityInfo[0] === firstVisiblePage
		)
			return;

		setFirstVisiblePage(firstPageVisibilityInfo[0]);

		const header = weightedHeaders[firstPageVisibilityInfo[0]].pick();

		setHeader(header);
	};

	return (
		<div className={getAppContainerStyles()}>
			<audio
				src={buttonClick}
				ref={buttonClickAudioElement}
				muted={muted}
			></audio>
			<audio
				src={buttonHover}
				ref={buttonHoverAudioElement}
				muted={muted}
			></audio>
			{isMdScreen && <ThreeScene />}
			<Navbar
				currentPageHeader={header}
				muted={muted}
				onHeadphonesIconClick={handleHeadphonesIconClick}
				onButtonClick={handleButtonClick}
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

const getAppContainerStyles = () => {
	return css`
		display: flex;
		flex-direction: column;
		gap: 120px;
	`;
};

export default MainApp;
