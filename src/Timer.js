
import React, { useState, useEffect } from 'react';



function Timer() {
   const [seconds, setSeconds] = useState(0);
   const [isActive, setIsActive] = useState(false);
   const [duration, setDuration] = useState(10);


   // Below will handle the random timer for the gap effect   
   const [random_seconds, setRandomSeconds] = useState(0);
   const [random_duration, setRandomDuration] = useState(0);
   

   const handleInputChange_1 = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setRandomDuration(value);
      // console.log(random_duration_time);
    }
   }
  // Below will handle the scenario when the random timer is finished displaying to the 
  // the user a good time to basically to stop. Will last 10 seconds 

   const handleInputChange = (e) => {
   const value = e.target.value;
    // Check if the value is a number or empty before setting the state
    if (/^\d*$/.test(value)) {
      setDuration(value);
    }
    
  }

   let duration_time = 10;
  //  will use duration and random duration to store the values of the
  //  total time=> duration
  // random time = > random_duration

   useEffect(()=> {
    setSeconds(duration);
   },[duration]); 

   useEffect(()=> {
    setRandomSeconds(random_duration);
   },[random_duration]);

   useEffect(() => {
    
       let interval;
       duration_time = duration;
       if (isActive) {
           interval = setInterval(() => {
            if (random_seconds == 0 ){
              console.log("hey");
              setRandomSeconds(random_duration);
            }else{
              setRandomSeconds(prevSeconds => prevSeconds - 1);
            }
            
              if (seconds == 0 ){
                setIsActive(false);
                setSeconds(duration);
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
      duration_time = duration;
      setIsActive(true);
   }

   const handlePause = () => {
       setIsActive(false);
   }


   const handleReset = () => {
       setIsActive(false);
       setSeconds(duration);
   }

   return (
       <div>
           <p>Elapsed time: {seconds} seconds</p>
           <p>Elapsed time: {random_seconds} duration</p>

           <label>
            <h1>repeat</h1>
           <input 
            type="text" 
            value={random_duration}
            onChange={handleInputChange_1} 
            placeholder="Enter a number"
          />
           </label>
           <label>
           <input 
            type="text" 
            value={duration} 
            onChange={handleInputChange}
            placeholder="Enter a number"
          />
        
          <br></br>

           </label>
      
           <button onClick={handleStart}>Start</button>
           <button onClick={handlePause}>Pause</button>
           <button onClick={handleReset}>Reset</button>

       </div>
   );
}


export default Timer;