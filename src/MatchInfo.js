import React, { useState, useEffect } from 'react';
import './MatchInfo.css';

const MatchInfo = () => {
    const matchId = window.location.pathname.split('/').pop();
    const [selectedInnings, setSelectedInnings] = useState("Innings1");
    const [matchInfo, setMatchInfo] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            async function fetchMatchData() {
                try {
                    const response = await fetch(`https://reactipl2025backend.vercel.app/api/iplscore/${matchId}`);
                    const data = await response.json();
                    setMatchInfo(data);
                } catch (err) {
                    console.error("Error fetching match data:", err);
                }
            }
    
            fetchMatchData();
        }, 5);
    
        return () => clearInterval(intervalId);
    }, [matchId]);
    

    const innings =
        selectedInnings === 'Innings1'
            ? matchInfo?.scores1?.Innings1 || null
            : matchInfo?.scores2?.Innings2 || null;

    return (
        <div className="match-container">
            <div className="innings-buttons">
                <button
                    className={`team-button ${selectedInnings === 'Innings1' ? 'active' : ''}`}
                    onClick={() => setSelectedInnings('Innings1')}
                >
                    1st Innings
                </button>
                <button
                    className={`team-button ${selectedInnings === 'Innings2' ? 'active' : ''}`}
                    onClick={() => setSelectedInnings('Innings2')}
                >
                    2nd Innings
                </button>
            </div>
            {selectedInnings && (
                <div className="scorecard">
                    <div className="batting-table">
                        <div className="table-header">
                            <div>Batter</div>
                            <div>R</div>
                            <div>B</div>
                            <div>4s</div>
                            <div>6s</div>
                            <div>SR</div>
                        </div>

                        {innings?.BattingCard?.length > 0 ? innings.BattingCard.map((batsman, idx) => (
                            <div className="table-row" key={idx}>
                                <div className="batter-info">
                                    <img src={batsman.PlayerImage} alt={batsman.PlayerName} className="player-img" />
                                    <div>
                                        <div className="player-name">
                                            {batsman.PlayerName}{" "}
                                            <span className="player-role">{batsman.Role}</span>
                                        </div>
                                        <div className="out-desc">{batsman.OutDesc}</div>
                                    </div>
                                </div>
                                <div>{batsman.Runs}</div>
                                <div>{batsman.Balls}</div>
                                <div>{batsman.Fours}</div>
                                <div>{batsman.Sixes}</div>
                                <div>{batsman.StrikeRate}</div>
                            </div>
                        )) : <div>No batting data available</div>}
                    </div>

                    <div className="bowling-table">
                        <div className="table-header">
                            <div>Bowler</div>
                            <div>O</div>
                            <div>M</div>
                            <div>R</div>
                            <div>W</div>
                            <div>Econ</div>
                            <div>Dots</div>
                        </div>

                        {innings?.BowlingCard?.length > 0 ? innings.BowlingCard.map((bowler, idx) => (
                            <div className="table-row" key={idx}>
                                <div className="batter-info">
                                    <img src={bowler.PlayerImage} alt={bowler.PlayerName} className="player-img" />
                                    <div className="player-name">{bowler.PlayerName}</div>
                                </div>
                                <div>{bowler.Overs}</div>
                                <div>{bowler.Maidens}</div>
                                <div>{bowler.Runs}</div>
                                <div>{bowler.Wickets}</div>
                                <div>{bowler.Economy}</div>
                                <div>{bowler.Dots}</div>
                            </div>
                        )) : <div>No bowling data available</div>}
                    </div>
                </div>
            )}

            
        </div>
    );
};

export default MatchInfo;
