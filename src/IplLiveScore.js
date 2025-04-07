import React, { useState, useEffect } from 'react';

// https://crex.com/scoreboard/T3E/1PD/20th-Match/F/K/mi-vs-rcb-20th-match-indian-premier-league-2025/live
// https://crex.com/scoreboard/T3C/1PD/21st-Match/J/KC/kkr-vs-lsg-21st-match-indian-premier-league-2025/live
const IplLiveScore = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await fetch('https://api.example.com/ipl-scores'); // Replace with actual API
                const data = await response.json();
                setScores(data.matches);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching scores:', error);
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>IPL Live Scores</h1>
            <ul>
                {scores.map((match, index) => (
                    <li key={index}>
                        <strong>{match.team1} vs {match.team2}</strong>: {match.score}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IplLiveScore;