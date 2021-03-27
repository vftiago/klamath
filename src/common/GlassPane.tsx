/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
};

function GlassPane({ children }: Props) {
  return <div css={quoteWindowStyle}>{children}</div>;
}

const quoteWindowStyle = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 40px;
  background-color: rgba(88, 88, 88, 0.03);
  border: 1px solid rgba(128, 128, 128, 0.1);
  height: 300px;
  width: 600px;
  transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  box-shadow: 3px 3px 3px 0px rgba(88, 88, 88, 0.03);
  h1 {
    line-height: 1.2;
    margin: 0;
  }
  h2 {
    color: #c0c0c0;
    margin: 0;
  }
`;

export default GlassPane;
