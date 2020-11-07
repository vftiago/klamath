import React, { useEffect } from "react";
import "./App.css";
import Scene from "./Scene";

function App() {
  useEffect(() => {
    Scene();
  });

  return (
    <div className="App">
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default App;
