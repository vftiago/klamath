import React from "react";
import Clicky from "./Clicky";
import AnimatedHeadphonesIcon from "./icons/AnimatedHeadphonesIcon";

const AudioToggle = ({ isMuted, toggleMuted }: { isMuted: boolean; toggleMuted: () => void }) => {
  return (
    <Clicky onClick={toggleMuted}>
      <AnimatedHeadphonesIcon active={!isMuted} />
    </Clicky>
  );
};

export default AudioToggle;
