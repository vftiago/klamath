import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import ThreeScene from "./components/3d/ThreeScene";

const root = document.getElementById("root");

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(root!).render(
  <React.StrictMode>
    <ThreeScene />
    <App />
  </React.StrictMode>,
);
