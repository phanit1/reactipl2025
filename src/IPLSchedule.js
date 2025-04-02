import React from "react";
import "./IplSchedule.css"; // Include CSS for styling

const IplSchedule = (data) => {
    return (
        <div className="ipl-schedule-container scrollable-container">
            <h1 className="schedule-title">IPL 2025 Match Schedule</h1>
            <div className="cards-container">
                {data.schedule.map((match, index) => (
                    <div key={index} className="match-card">
                        <div className="team-names">
                        <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGk7pa6BHgPjWQ29pZFX24vis44K07c0WJig&s" alt = {match.Team1Code} />
                        <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGk7pa6BHgPjWQ29pZFX24vis44K07c0WJig&s" alt = {match.Team2Code} />
                        </div>
                        <h3>{match.team1} vs {match.team2}</h3>
                        <p><strong>Date:</strong> {match.date}</p>
                        <p><strong>Venue:</strong> {match.venue}</p>
                        <p><strong>Time:</strong> {match.time}</p>
                        <p><strong>Result:</strong>{match.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IplSchedule;
