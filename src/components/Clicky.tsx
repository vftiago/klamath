import { ReactNode, useCallback, useContext } from "react";
import React from "react";
import playSound from "../utils/playSound";
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

  return (
    <div
      onClick={onClick}
      onMouseEnter={onHover}
      className="z-10 flex cursor-pointer flex-col items-center justify-center"
    >
      {children}
    </div>
  );
};

export default Clicky;
