import React, { useState } from "react";
import "./IplSchedule.css"; // Include CSS for styling


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

    // Unique teams and venues for dropdowns
    const allTeams = [...new Set(schedule.flatMap(m => [m.team1, m.team2]))];
    const allVenues = [...new Set(schedule.map(m => m.venue))];

    // // Filtered matches
    // const filteredSchedule = schedule.filter(match => {
    //     // let dateMatch = !filterDate || match.date === filterDate;
    //     // console.log(formatDate(match.date), "Formatted Date")
    //     // dateMatch = formatDate(dateMatch)
    //     const teamMatch = !filterTeam || match.team1 === filterTeam || match.team2 === filterTeam;
    //     const venueMatch = !filterVenue || match.venue === filterVenue;
    //     return teamMatch && venueMatch;
    // });

    const filteredSchedule = schedule.filter(match => {
        const teamMatch = !filterTeam || match.team1 === filterTeam || match.team2 === filterTeam;
        const venueMatch = !filterVenue || match.venue === filterVenue;

        const matchDate = new Date(match.date + " 2025"); // "Wed, Apr 03 2025"
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
                    const team1Code = teamCodes[match.team1];
                    const team2Code = teamCodes[match.team2];
                    return (
                        <div key={index} className="match-card">
                            <div className="team-names">
                                <img
                                    src={team1Code === "DC"
                                        ? `https://documents.iplt20.com/ipl/${team1Code}/Logos/LogoOutline/${team1Code}outline.png`
                                        : `https://documents.iplt20.com/ipl/${team1Code}/Logos/Logooutline/${team1Code}outline.png`}
                                    width={100}
                                    height={100}
                                    alt={team1Code}
                                />
                                <img
                                    src={team2Code === "DC"
                                        ? `https://documents.iplt20.com/ipl/${team2Code}/Logos/LogoOutline/${team2Code}outline.png`
                                        : `https://documents.iplt20.com/ipl/${team2Code}/Logos/Logooutline/${team2Code}outline.png`}
                                    width={100}
                                    height={100}
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
