import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Timer from "./Timer.js";
import InputBox from "./inputbox.js";

function App({ startTime }) {
  return (
    <div className="App">
      <Timer />
    </div>
  );
}

export default App;
