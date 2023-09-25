
import React, { useState, useEffect } from 'react';
import sound from "./sound/emergency-alarm.mp3"



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
        .catch(error => {
          // Handle playback failure
          console.error("Playback failed:", error);
        });
    }
  }

  const [value, setValue] = useState(0);
  useEffect(()=> {
    if(value == 1)
      // play()
      playAudioForOneSecond() 
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
   
   function paused () {
     return (
       
       show?<h1>take a break</h1>:null
     );
   }
   
  
    // plays the sound for a second

   const handleInputMinRange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMin(Number(value));
      // value needed to be converted into number because original was just a string. 
      // console.log(random_duration_time);
    }
   }
   const handleInputMaxRange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMax(Number(value));
    }
   }
  // Below will handle the scenario when the random timer is finished displaying to the 
  // the user a good time to basically to stop. Will last 10 seconds 

   const handleInputChange = (e) => {
   const value = e.target.value;
    // Check if the value is a nuber or empty before setting the state
    if (/^\d*$/.test(value)) {
      setDuration(value);
    }
    
  }

   let duration_time = 10;
  //  will use duration and random duration to store the values of the
  //  total time=> duration
  // random time = > random_duration

   function generate(min, max){
    setRandomDuration(Math.floor(Math.random()*(max-min+1))+min);
   } 
   useEffect(()=> {
    if(session == false){
      generate(min,max);
    }
   },[min, max, session]);

   useEffect(()=> {
    if(!session){
      setSeconds(duration);
    }
   },[duration, session]); 

   useEffect(()=> {
    setRandomSeconds(random_seconds);
   },[random_seconds]);
   
   useEffect(() => {
       let interval;
       duration_time = duration;
       if (isActive) {
           interval = setInterval(() => {
            if (random_seconds == 0 && !show){
              generate(min, max);
              setRandomSeconds(random_duration);
              setShow(true);
              setValue(1);
            }else if (show==false){
              setRandomSeconds(prevSeconds => prevSeconds - 1);
              setValue(0);
            }
            if (show && rest_sec == 0){
              setValue(1);
              setShow(false);
              setRest_Sec(rest_duration);
            }else if(show){
              setValue(0);
              setRest_Sec(prevSeconds => prevSeconds - 1);
            }
            if (seconds == 0 ){
              setIsActive(false);
              setSeconds(duration);
              // const randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
              generate(min, max);
              setRandomSeconds(random_duration);
              setShow(true);
            }else{
              setSeconds(prevSeconds => prevSeconds - 1);
            }
            
           }, 1000);
       } else {
           clearInterval(interval);
       }

       return () => clearInterval(interval);  
   }, [isActive, seconds]);

   const handleStart = () => {

      if(isActive == false && session == false){
        duration_time = duration;
        setRandomSeconds(random_duration);
        setIsActive(true);
        setSession(true);
        // case when running the timer for the first time in the session
      }else if (isActive == false && session == true){
        setIsActive(true);
      }else if (isActive == true && session == true){
        setIsActive(false);
      }
     
   }



   const handleReset = () => {
       setIsActive(false);
       setSession(false);
       setSeconds(duration);
       setShow(false);
       setRest_Sec(rest_duration);
   }

  
   return (
       
       <div>
           <paused/>
           <h1>Total Time Left: {seconds} seconds</h1>
           <p>random interval Timer: {random_seconds} duration</p>
           <p>pause timer: {rest_sec}</p>

           <label>
            <p>interv   al range</p>
           <input 
            type="text" 
            value={min}
            onChange={handleInputMinRange} 
            placeholder="Enter a number"
          />
          <input 
            type="text" 
            value={max}
            onChange={handleInputMaxRange} 
            placeholder="Enter a number"
          />
           </label>
           <label>
            <p>duration</p>
           <input 
            type="text" 
            value={duration} 
            onChange={handleInputChange}
            placeholder="Enter a number"
          />
        
          <br></br>

           </label>
      
           <button onClick={handleStart}>Start/stop</button>
           <button onClick={handleReset}>Reset</button>
           <div>{paused()}</div>


       </div>
   );
}


export default Timer;