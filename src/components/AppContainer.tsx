import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { css } from "@emotion/css";
import buttonClick from "../assets/audio/button-click.mp3";
import buttonHover from "../assets/audio/button-hover.mp3";
import { screenSize } from "../theme";
import playSound from "../utils/playSound";
import Footer from "./Footer";
import Navbar from "./Navbar";
import RepositorySection from "./RepositorySection";
import { weightedHeaders } from "./weighted-tables/headers";

const ThreeScene = React.lazy(() => import("./scene/ThreeScene"));
const MainSection = React.lazy(() => import("./MainSection"));

export enum Orientation {
	Horizontal = "horizontal",
	Vertical = "vertical",
}

function AppContainer() {
	const [muted, setMuted] = useState<boolean>(true);
	const [largeScreen, setLargeScreen] = useState<boolean>(
		window.innerWidth > screenSize.lg,
	);
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

	const handleResize = () => {
		if (window.innerWidth > screenSize.lg) {
			setLargeScreen(true);
		} else {
			setLargeScreen(false);
		}
	};

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

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const LazyThreeScene = useMemo(() => <ThreeScene />, []);

	const LazyMainSection = useMemo(
		() => (
			<MainSection
				onVisibilityChange={handleVisibilityChange}
				onHeadphonesIconClick={handleHeadphonesIconClick}
				onButtonClick={handleButtonClick}
				onButtonHover={handleButtonHover}
			/>
		),
		[],
	);

	const orientation = largeScreen
		? Orientation.Vertical
		: Orientation.Horizontal;

	return (
		<div className={getAppContainerStyles(orientation)}>
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
			<Suspense fallback={null}>{largeScreen && LazyThreeScene}</Suspense>
			<Navbar
				currentPageHeader={header}
				orientation={orientation}
				muted={muted}
				onHeadphonesIconClick={handleHeadphonesIconClick}
				onButtonClick={handleButtonClick}
				onButtonHover={handleButtonHover}
			/>
			<Suspense fallback={null}>{largeScreen && LazyMainSection}</Suspense>
			<RepositorySection
				onVisibilityChange={handleVisibilityChange}
				orientation={orientation}
			/>
			<Footer />
		</div>
	);
}

const getAppContainerStyles = (orientation: Orientation) => {
	const paddingTop = orientation === Orientation.Vertical ? "0px" : "100px";

	return css`
		display: flex;
		flex-direction: column;
		padding-top: ${paddingTop};
		gap: 120px;
	`;
};

export default AppContainer;
