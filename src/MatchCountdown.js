import React, { useEffect, useState } from 'react';

const MatchCountdown = ({ startTime }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(startTime));

  function getTimeRemaining(start) {
    const total = Date.parse(start) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total, days, hours, minutes, seconds
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTime = getTimeRemaining(startTime);
      setTimeLeft(updatedTime);
      if (updatedTime.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  if (timeLeft.total <= 0) {
    return <div className="match-started">Match Started</div>;
  }

  return (
    <div className="countdown-container">
      Match starts in:{" "}
      <strong>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </strong>
    </div>
  );
};

export default MatchCountdown;
