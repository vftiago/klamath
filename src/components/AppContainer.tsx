/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import buttonClick from "../assets/audio/button-click.mp3";
import buttonHover from "../assets/audio/button-hover.mp3";
import playSound from "../utils/playSound";
import Footer from "./Footer";
import RepositorySection from "./RepositorySection";
import MainSection from "./MainSection";
import NavigationBars from "./NavigationBars";
import debounce from "../utils/debounce";
import { screenSize } from "../theme";
import ThreeScene from "./scene/ThreeScene";

const Scene = React.lazy(() => import("./scene/Scene"));

export type Page = {
	inView: boolean;
	headers: string[];
};

const pages: Page[] = [
	{ inView: true, headers: ["Hello World"] },
	{
		inView: true,
		headers: ["Stuff I've been working on lately"],
	},
];

function AppContainer() {
	const [muted, setMuted] = useState<boolean>(true);
	const [showScene, setShowScene] = useState<boolean>(
		window.innerWidth > screenSize.lg,
	);
	const [currentPageHeader, setCurrentPageHeader] = useState<string>(
		pages[0].headers[0],
	);
	const pageVisibilityRef = useRef<Partial<Page>[]>([
		{ inView: true },
		{ inView: false },
	]);

	const buttonClickAudioElement = useRef(null);
	const buttonHoverAudioElement = useRef(null);

	// useEffect(() => {
	// 	const handleVisibilityChange = () => {
	// 		if (muted) return;
	// 		document.hidden ? setMuted(true) : setMuted(false);
	// 	};

	// 	document.addEventListener("visibilitychange", handleVisibilityChange);

	// 	return () => {
	// 		document.removeEventListener("visibilitychange", handleVisibilityChange);
	// 	};
	// }, [muted]);

	const handleResize = () => {
		if (window.innerWidth > screenSize.lg) {
			setShowScene(true);
		} else {
			setShowScene(false);
		}
	};

	const handleHeadphonesIconClick = () => {
		setMuted(!muted);
	};

	const handleVisibilityChange = (page: number, inView: boolean) => {
		pageVisibilityRef.current.splice(page, 1, { inView });

		const firstVisiblePage = pageVisibilityRef.current.findIndex(
			(page) => page.inView,
		);

		if (firstVisiblePage > -1) {
			setCurrentPageHeader(
				pages[firstVisiblePage].headers[
					Math.ceil(Math.random() * pages[firstVisiblePage].headers.length - 1)
				],
			);
		}
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const backgroundScene = useMemo(() => <ThreeScene />, []);

	return (
		<div css={appContainerStyles}>
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
			<Suspense fallback={null}>{showScene && backgroundScene}</Suspense>
			<NavigationBars
				currentPageHeader={currentPageHeader}
				muted={muted}
				onHeadphonesIconClick={handleHeadphonesIconClick}
				onButtonClick={() => {
					if (muted) return;
					playSound(buttonClickAudioElement);
				}}
				onButtonHover={() => {
					if (muted) return;
					playSound(buttonHoverAudioElement);
				}}
			/>
			<MainSection
				onVisibilityChange={handleVisibilityChange}
				onHeadphonesIconClick={handleHeadphonesIconClick}
				onButtonClick={() => {
					if (muted) return;
					playSound(buttonClickAudioElement);
				}}
				onButtonHover={() => {
					if (muted) return;
					playSound(buttonHoverAudioElement);
				}}
			/>
			<RepositorySection onVisibilityChange={handleVisibilityChange} />
			<Footer />
		</div>
	);
}

const appContainerStyles = css`
	display: flex;
	flex-direction: column;
	gap: 200px;
`;

export default AppContainer;
