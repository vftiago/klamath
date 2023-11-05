import { ReactNode, useCallback, useContext, useEffect } from "react";
import React from "react";
import playSound from "../utils/playSound";
import { css } from "@emotion/css";
import { AudioContext } from "./AudioContext";

const Clicky = ({
  children,
  onClick: onClickProp,
  onHover: onHoverProp,
}: {
  onClick?: () => void;
  onHover?: () => void;
  children: ReactNode;
}) => {
  const { isMuted, buttonClickAudioElementRef, buttonHoverAudioElementRef } = useContext(AudioContext);

  const onClick = useCallback(() => {
    onClickProp?.();
    if (isMuted) return;
    playSound(buttonClickAudioElementRef);
  }, [isMuted]);

  const onHover = useCallback(() => {
    onHoverProp?.();
    if (isMuted) return;
    playSound(buttonHoverAudioElementRef);
  }, [isMuted]);

  useEffect(() => {
    console.log("clicky rendered");
  }, [isMuted]);

  return (
    <div id="test" onClick={onClick} onMouseEnter={onHover} className={clickyContainerStyles}>
      {children}
    </div>
  );
};

const clickyContainerStyles = css`
  z-index: 1;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Clicky;
