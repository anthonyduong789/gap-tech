import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Timer from "./Timer.js";
import InputBox from "./inputbox.js";
import MusicPlayer from "./MusicPlayer.jsx";
import sound from "./sound/BinuralBeats.mp3";

function App({ startTime }) {
  return (
    <div className="App">
      <Timer />
      <MusicPlayer src = {sound}/>
    </div>
  );
}

export default App;
