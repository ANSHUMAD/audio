import React, { useState, useEffect, useRef } from 'react';

const Lyrics = ({ text, isPlaying }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Split the text into lines of 6 words each
  const lines = text
    .split(' ')
    .reduce((acc, word, index) => {
      const lineIndex = Math.floor(index / 6);
      if (!acc[lineIndex]) acc[lineIndex] = [];
      acc[lineIndex].push(word);
      return acc;
    }, [])
    .map(line => line.join(' '));

  // Manage the interval for updating lines
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 3500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Cleanup interval when the component unmounts
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  // Ensure we display a maximum of 7 lines at a time
  const displayedLines = lines.slice(currentIndex, currentIndex + 7);

  return (
    <div className="lyrics">
      <h3>Audio Transcript: </h3>
      {displayedLines.map((line, index) => {
        const className = index >= 2 && index <= 4 ? 'mid' : 'low';
        return (
          
          <div key={index} className={className}>
            {line}
          </div>
        );
      })}
    </div>
  );
};

export default Lyrics;
