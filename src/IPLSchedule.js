import React from "react";
import "./IplSchedule.css"; // Include CSS for styling

const IplSchedule = (data) => {
    const teamCodes = {
        "Sunrisers Hyderabad": "SRH",
        "Mumbai Indians": "MI",
        "Chennai Super Kings": "CSK",
        "Royal Challengers Bengaluru": "RCB",
        "Kolkata Knight Riders": "KKR",
        "Delhi Capitals": "DC",
        "Punjab Kings": "PBKS",
        "Rajasthan Royals": "RR",
        "Lucknow Super Giants": "LSG",
        "Gujarat Titans": "GT"
    };
    return (
        <div className="ipl-schedule-container scrollable-container">
            <h1 className="schedule-title">IPL 2025 Match Schedule</h1>
            <div className="cards-container">
                {data.schedule.map((match, index) => {
                    console.log(match, "Match"); // Log each match object

                    const team1Code = teamCodes[match.team1];
                    const team2Code = teamCodes[match.team2];
                    return (
                        <div key={index} className="match-card">
                            <div className="team-names">
                                <img
                                    src={team1Code === "DC"
                                        ? `https://documents.iplt20.com/ipl/${team1Code}/Logos/LogoOutline/${team1Code}outline.png`
                                        : `https://documents.iplt20.com/ipl/${team1Code}/Logos/Logooutline/${team1Code}outline.png`}
                                    width={150}
                                    height={150}
                                    alt={team1Code}
                                />
                                <img
                                    src={team2Code === "DC"
                                        ? `https://documents.iplt20.com/ipl/${team2Code}/Logos/LogoOutline/${team2Code}outline.png`
                                        : `https://documents.iplt20.com/ipl/${team2Code}/Logos/Logooutline/${team2Code}outline.png`}
                                    width={150}
                                    height={150}
                                    alt={team2Code}
                                />
                            </div>
                            <h3>{match.team1} vs {match.team2}</h3>
                            <p><strong>Date:</strong> {match.date}</p>
                            <p><strong>Venue:</strong> {match.venue}</p>
                            <p><strong>Time:</strong> {match.time}</p>
                            <p><strong>Result:</strong> {match.status}</p>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default IplSchedule;
