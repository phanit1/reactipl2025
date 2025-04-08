import React, { useState } from "react";
import "./IplSchedule.css"; // Include CSS for styling
import MatchInfo from "./MatchInfo"; // Import MatchInfo component

// const formatDate = (dateStr) => {
//     const [day, month, year] = dateStr.split("-"); // Split "10-04-2025" into parts
//     const dateObj = new Date(`${year}-${month}-${day}`); // Convert to Date object

//     return dateObj.toLocaleDateString("en-US", {
//         weekday: "short",
//         month: "short",
//         day: "numeric"
//     });
// };

const IplSchedule = ({ schedule }) => {
    // const [filterDate, setFilterDate] = useState("");
    const [filterTeam, setFilterTeam] = useState("");
    const [filterVenue, setFilterVenue] = useState("");
    const [matchTimingFilter, setMatchTimingFilter] = useState("all");
    const [filterDate, setFilterDate] = useState("");

    // Unique teams and venues for dropdowns
    const allTeams = [...new Set(schedule.flatMap(m => [m.HomeTeamName, m.AwayTeamName]))];
    const allVenues = [...new Set(schedule.map(m => m.GroundName))];

    const filteredSchedule = schedule.filter(match => {
        const teamMatch = !filterTeam || match.HomeTeamName === filterTeam || match.AwayTeamName === filterTeam;
        const venueMatch = !filterVenue || match.GroundName === filterVenue;

        const matchDate = new Date(match.MatchDateNew); // "Wed, Apr 03 2025"
        const today = new Date();
        const isToday = matchDate.toDateString() === today.toDateString();
        const isUpcoming = matchDate > today;
        const isPast = matchDate < today;

        // Handle optional date picker
        let dateMatch = true;
        if (filterDate) {
            const selectedDate = new Date(filterDate);
            dateMatch = matchDate.toDateString() === selectedDate.toDateString();
        }

        // Handle match timing filter
        let timingMatch = true;
        if (!filterDate) {
            if (matchTimingFilter === "today") timingMatch = isToday;
            else if (matchTimingFilter === "upcoming") timingMatch = isUpcoming;
            else if (matchTimingFilter === "past") timingMatch = isPast;
        }

        return teamMatch && venueMatch && dateMatch && timingMatch;
    });


    return (
        <div className="ipl-schedule-container scrollable-container">
            <div className="filters">
                <select value={matchTimingFilter} onChange={(e) => setMatchTimingFilter(e.target.value)}>
                    <option value="all">All Matches</option>
                    <option value="today">Today</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                </select>

                <select value={filterTeam} onChange={(e) => setFilterTeam(e.target.value)}>
                    <option value="">All Teams</option>
                    {allTeams.map(team => (
                        <option key={team} value={team}>{team}</option>
                    ))}
                </select>

                <select value={filterVenue} onChange={(e) => setFilterVenue(e.target.value)}>
                    <option value="">All Venues</option>
                    {allVenues.map(venue => (
                        <option key={venue} value={venue}>{venue}</option>
                    ))}
                </select>

                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    placeholder="Filter by exact date"
                />
            </div>
            {filterDate && (
                <button onClick={() => setFilterDate("")}>Clear Date</button>
            )}

            <div className="cards-container">
                {filteredSchedule.map((match, index) => {
                    return (
                        <div key={index} className="match-card">
                            <div className="team-names">
                                <img src={match.HomeTeamLogo} width={100} height={100} alt={match.HomeTeamName} />
                                <img src={match.AwayTeamLogo} width={100} height={100} alt={match.AwayTeamName} />
                            </div>
                            <h6>{match.MatchName}</h6>
                            <p><strong>Date:</strong> {match.MatchDateNew}</p>
                            <p><strong>Venue:</strong> {match.GroundName}</p>
                            <p><strong>Time:</strong> {match.MatchTime}</p>
                            <p><strong>Result:</strong> {match.MatchStatus === "Post" ? match.Comments : match.MatchStatus}</p>
                            <button
                                onClick={() => window.location.href = `/user/match-info/${match.MatchID}`}
                                // style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
                            >
                                View Match Info
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default IplSchedule;
