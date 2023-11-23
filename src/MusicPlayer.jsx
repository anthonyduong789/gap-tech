import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    

    useEffect(() => {
        audioRef.current = new Audio(src);
        audioRef.current.loop = true;

        // Error handling
        audioRef.current.onerror = () => {
            console.error("Error loading audio file:", src);
        };
    }, [src]);

   
    const playAudio = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const stopAudio = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
    };

    return (
        <div>
            <button onClick={playAudio} disabled={isPlaying}>
                Play
            </button>
            <button onClick={stopAudio} disabled={!isPlaying}>
                Stop
            </button>
        </div>
    );
};

export default MusicPlayer;
