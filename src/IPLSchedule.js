import React from "react";
import "./IplSchedule.css"; // Include CSS for styling

const IplSchedule = (data) => {
    // console.log("data", data);
    return (
        <div className="ipl-schedule-container scrollable-container">
            <h1 className="schedule-title">IPL 2025 Match Schedule</h1>
            <div className="cards-container">
                {data.schedule.map((match, index) => (
                    <div key={index} className="match-card">
                        <div className="team-names">
                        <img src = {match.AwayTeamLogo} alt = {match.Team1Code} />
                        <img src = {match.HomeTeamLogo} alt = {match.Team2Code} />
                        </div>
                        <h3>{match.MatchName}</h3>
                        <p><strong>Date:</strong> {new Date(match.GMTMatchDate).toLocaleDateString()}</p>
                        <p><strong>Venue:</strong> {match.GroundName}</p>
                        <p><strong>Time:</strong> {match.MatchTime}</p>
                        <p><strong>Result:</strong>
                            {match.MatchStatus === "UpComing" ? "Not played yet" : match.Comments}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IplSchedule;
