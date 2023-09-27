import React, { useState, useEffect } from "react";
import sound from "./sound/emergency-alarm.mp3";
import "./Timer.css";
function Timer() {
  //audio part
  function playAudioForOneSecond() {
    const audio = new Audio(sound); // replace with your audio file path

    // Try to play the audio
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Set a timer to pause the audio after 1 second
          setTimeout(() => {
            audio.pause();
            audio.currentTime = 0; // Reset the audio position to the start
          }, 1000); // 1000 milliseconds = 1 second
        })
        .catch((error) => {
          // Handle playback failure
          console.error("Playback failed:", error);
        });
    }
  }

  const [value, setValue] = useState(0);
  useEffect(() => {
    if (value == 1)
      // play()
      playAudioForOneSecond();
  }, [value]);
  //  this part below is used for the long timer
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(1000);
  const [session, setSession] = useState(false);
  //^session will keep everything running in the same session when paused if off will be able to
  //  reset all the values to the new ones

  // Below will handle the random timer for the gap effect
  const [random_seconds, setRandomSeconds] = useState(0);
  const [min, setMin] = useState(5);
  const [max, setMax] = useState(10);

  const [random_duration, setRandomDuration] = useState(0);

  //  below will handle all 10 second rest break
  let rest_duration = 10;
  const [show, setShow] = useState(false);
  const [rest_sec, setRest_Sec] = useState(rest_duration);

  function paused() {
    return show ? <h1>take a break</h1> : null;
  }

  // plays the sound for a second

  // below handles the values put in before being saved to the actual timer values
  const [min_wait, setMin_wait] = useState(0);
  const [max_wait, setMax_wait] = useState(10);
  const [duration_wait, setDuration_wait] = useState(100);

  const handleInputMinRange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
        setMin_wait(Number(value));
      // value needed to be converted into number because original was just a string.
      // console.log(random_duration_time);
    }
  };
  const handleInputMaxRange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMax_wait(Number(value));
    }
  };
  // Below will handle the scenario when the random timer is finished displaying to the
  // the user a good time to basically to stop. Will last 10 seconds

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Check if the value is a nuber or empty before setting the state
    if (/^\d*$/.test(value)) {
      setDuration_wait(Number(value));
    }
  };

  let duration_time = 10;
  //  will use duration and random duration to store the values of the
  //  total time=> duration
  // random time = > random_duration

  function generate(min, max) {
    setRandomDuration(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  useEffect(() => {
    if (session == false) {
      generate(min, max);
    }
  }, [min, max, session]);

  useEffect(() => {
    if (!session) {
      setSeconds(duration);
    }
  }, [duration, session]);

  useEffect(() => {
    setRandomSeconds(random_seconds);
  }, [random_seconds]);

  useEffect(() => {
    let interval;
    duration_time = duration;
    if (isActive) {
      interval = setInterval(() => {
        if (random_seconds == 0 && !show) {
          generate(min, max);
          setRandomSeconds(random_duration);
          setShow(true);
          setValue(1);
        } else if (show == false) {
          setRandomSeconds((prevSeconds) => prevSeconds - 1);
          setValue(0);
        }
        if (show && rest_sec == 0) {
          setValue(1);
          setShow(false);
          setRest_Sec(rest_duration);
        } else if (show) {
          setValue(0);
          setRest_Sec((prevSeconds) => prevSeconds - 1);
        }
        if (seconds == 0) {
          setIsActive(false);
          setSeconds(duration);
          // const randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
          generate(min, max);
          setRandomSeconds(random_duration);
          setShow(true);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleStart = () => {
    if (isActive == false && session == false) {
      duration_time = duration;
      setRandomSeconds(random_duration);
      setIsActive(true);
      setSession(true);
      // case when running the timer for the first time in the session
    } else if (isActive == false && session == true) {
      setIsActive(true);
    } else if (isActive == true && session == true) {
      setIsActive(false);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setSession(false);
    setSeconds(duration);
    setShow(false);
    setRest_Sec(rest_duration);
  };
  const handlesave = () => {
    if(min_wait < max_wait && max_wait < duration_wait)
      setMin(min_wait);
      setMax(max_wait);
      setDuration(duration_wait);
      
  }

  return (
    <div>
      <div class="homepage-background">
        <h1>Total Time Left: {seconds} seconds</h1>
        <p>random interval Timer: {random_seconds} duration</p>
        <p>pause timer: {rest_sec}</p>
        <button onClick={handleStart}>Start/stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      
      <div class="navigation">
        <input type="checkbox" class="nav__checkbox" id="nav-toggle" />
        <label for="nav-toggle" class="nav__button">
          <span class="nav__icon"></span>
        </label>
        <div class="nav__background">&nbsp;</div>
        <div class="navigation__nav">
          <ul class="navigation__list">
            <li class="navigation__item">
              <div>
              <h1 id ="min_text">Min</h1>
              <h1 id ="min_error" class ="appear">Min_error</h1>
              <input
                  type="text"
                  value={min_wait}
                  onChange={handleInputMinRange}
                  placeholder="Enter a number"
                />
              </div>
              <div>  
              <h1>max</h1>
              <input
                  type="text"
                  value={max_wait}
                  onChange={handleInputMaxRange}
                  placeholder="Enter a number"
                />
              </div>
            </li>
            <li class="navigation__item">
              <div>
              <h1>duration</h1>
                <input
                  type="text"
                  value={duration_wait}
                  onChange={handleInputChange}
                  placeholder="Enter a number"
                />
              </div>
            </li>
            <li class ="navigation__item">
              <div>
                <button onClick={handlesave}>save</button>
              </div>
              
            </li>
          </ul>
        </div>
      </div>

      
    
    </div>
  );
}

export default Timer;
