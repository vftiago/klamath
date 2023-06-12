import React, { Suspense, useMemo, useRef, useState } from "react";
import { css } from "@emotion/css";
import buttonClick from "../assets/audio/button-click.mp3";
import buttonHover from "../assets/audio/button-hover.mp3";
import playSound from "../utils/playSound";
import Footer from "./Footer";
import Navbar from "./Navbar";
import MainSection from "./MainSection";
import RepositorySection from "./RepositorySection";
import {
	weightedHeaders,
	weightedPhoneHeaders,
} from "./weighted-tables/headers";
import { useBreakpoints } from "../useBreakpoints";
import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";

const ThreeScene = React.lazy(() => import("./scene/ThreeScene"));

export enum Orientation {
	Horizontal = "horizontal",
	Vertical = "vertical",
}

function AppContainer() {
	const [muted, setMuted] = useState<boolean>(true);

	const { isMdScreen, isLgScreen } = useBreakpoints();

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
	const phoneTitle = weightedPhoneHeaders.pick();

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

	const LazyThreeScene = useMemo(() => <ThreeScene />, []);

	// use Suspense to load the entire application only on md screens and larger
	return isMdScreen ? (
		<div className={getAppContainerStyles(isLgScreen)}>
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
			<Suspense fallback={null}>{isLgScreen && LazyThreeScene}</Suspense>
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
	) : (
		<div className={phoneStytles}>
			{phoneTitle}
			<span>
				<a href="https://github.com/vftiago" target="_blank" rel="noreferrer">
					<GithubIcon size={36}></GithubIcon>
				</a>
				<a
					href="https://linkedin.com/in/vftiago"
					target="_blank"
					rel="noreferrer"
				>
					<LinkedinIcon size={36}></LinkedinIcon>
				</a>
			</span>
		</div>
	);
}

const phoneStytles = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: 100%;
	font-size: 42px;
	font-weight: 700;
	color: #fff;
	background: radial-gradient(circle at center, #111, #000);
	padding: 0 20px;
	span {
		display: flex;
		padding: 32px;
		gap: 36px;
	}
	svg {
		fill: #fff;
	}
`;

const getAppContainerStyles = (isLgScreen: boolean) => {
	const paddingTop = isLgScreen ? "0px" : "100px";

	return css`
		display: flex;
		flex-direction: column;
		padding-top: ${paddingTop};
		gap: 120px;
	`;
};

export default AppContainer;
