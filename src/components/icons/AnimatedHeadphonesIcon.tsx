import React from "react";
import { css } from "@emotion/css";
import HeadphonesIcon from "./Headphones";
import { DEFAULT_ICON_SIZE, colors } from "../../theme";

const AnimatedHeadphonesIcon = ({ active }: { active: boolean }) => {
  return (
    <div className={css([soundIconStyle, !active && mutedStyle])}>
      <HeadphonesIcon />
    </div>
  );
};

export default AnimatedHeadphonesIcon;

const soundIconStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${DEFAULT_ICON_SIZE + "px"};
  width: ${DEFAULT_ICON_SIZE + "px"};
  svg {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    fill: #333;
    &:hover {
      fill: ${colors.icon.accent};
    }
  }
  &:hover {
    svg {
      fill: ${colors.icon.accent};
    }
    &::after {
      background-color: ${colors.icon.accent};
    }
  }
  &:after {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    background-color: #333;
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
