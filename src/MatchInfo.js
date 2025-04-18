import React, { useState, useEffect } from 'react';
import './MatchInfo.css';
import MatchCountdown from './MatchCountdown';
import HeadToHead from './HeadToHead'; // Adjust path if it's in a different folder

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
        }, 1000);

        return () => clearInterval(intervalId);
    }, [matchId]);


    const innings =
        selectedInnings === 'Innings1'
            ? matchInfo?.scores1?.Innings1 || null
            : matchInfo?.scores2?.Innings2 || null;

    return (
        <>
            {matchInfo?.message === "Match Innings not Started" ? (
                <div className="no-innings-message">
                    <div className="scorecard-box">
                        <div className="team-score">
                            <img
                                src={`https://scores.iplt20.com/ipl/teamlogos/${matchInfo.matchDetails.FirstBattingTeamCode}.png`}
                                alt={matchInfo.matchDetails.FirstBattingTeamCode}
                                className="teamlogo"
                            />
                            <div className="score-details">
                                <h1>{matchInfo.matchDetails.FirstBattingTeamCode}</h1>
                            </div>
                        </div>

                        <div className="match-center">
                            <p className="match-id">{matchInfo.matchDetails.MatchOrder}</p>
                            <p>{matchInfo.matchDetails.GroundName}</p>
                            <p>{matchInfo.matchDetails.MatchDateNew} &bull; {matchInfo.matchDetails.MatchTime} IST</p>
                        </div>

                        <div className="team-score">
                            <div className="score-details">
                                <h1>{matchInfo.matchDetails.SecondBattingTeamCode}</h1>
                            </div>
                            <img
                                src={`https://scores.iplt20.com/ipl/teamlogos/${matchInfo.matchDetails.SecondBattingTeamCode}.png`}
                                alt={matchInfo.matchDetails.SecondBattingTeamCode}
                                className="teamlogo"
                            />
                        </div>
                        <div className="result-banner">
                            {/* <h5>Match yet to start</h5> */}
                            <div className="match-status-box">
                                <MatchCountdown startTime={matchInfo.matchDetails.MATCH_COMMENCE_START_DATE.replace(' ', 'T')} />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <div className="match-info-container">
                                <h2 className="title">Match Info</h2>
                                <div className="info-grid">
                                    <div className="info-label">Venue</div>
                                    <div className="info-value">
                                        <span className="highlight">{matchInfo.matchDetails.GroundName}</span>
                                        <br />
                                        <span className="subtext">{matchInfo.matchDetails.city}</span>
                                    </div>

                                    <div className="info-label">On Field Umpires</div>
                                    <div className="info-value">
                                        <span className="highlight">{matchInfo.matchDetails.GroundUmpire1}</span>
                                        <span className="divider">|</span>
                                        <span className="highlight">{matchInfo.matchDetails.GroundUmpire2}</span>
                                    </div>

                                    <div className="info-label">Third Umpire</div>
                                    <div className="info-value">
                                        <span className="highlight">{matchInfo.matchDetails.ThirdUmpire}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 mb-3'>
                            <HeadToHead data={matchInfo} />
                        </div>
                    </div>

                </div>
            ) : <div className="match-container">
                {matchInfo?.matchDetails && (
                    <div className="scorecard-box">
                        <div className="team-score">
                            <img
                                src={`https://scores.iplt20.com/ipl/teamlogos/${matchInfo.matchDetails.FirstBattingTeamCode}.png`}
                                alt={matchInfo.matchDetails.FirstBattingTeamCode}
                                className="teamlogo"
                            />
                            <div className="score-details">
                                <h1>{matchInfo.matchDetails['1Summary'].split(" ")[0]}</h1>
                                <p>{matchInfo.matchDetails['1FallOvers']} Overs</p>
                            </div>
                        </div>

                        <div className="match-center">
                            <p className="match-id">{matchInfo.matchDetails.MatchOrder}</p>
                            <p>{matchInfo.matchDetails.GroundName}</p>
                            <p>{matchInfo.matchDetails.MatchDateNew} &bull; {matchInfo.matchDetails.MatchTime} IST</p>
                        </div>

                        <div className="team-score">
                            <div className="score-details">
                                <h1>{matchInfo.matchDetails['2Summary'].split(" ")[0]}</h1>
                                <p>{matchInfo.matchDetails['2FallOvers']} Overs</p>
                            </div>
                            <img
                                src={`https://scores.iplt20.com/ipl/teamlogos/${matchInfo.matchDetails.SecondBattingTeamCode}.png`}
                                alt={matchInfo.matchDetails.SecondBattingTeamCode}
                                className="teamlogo"
                            />
                        </div>


                        <div className="result-banner">
                            <h5>{matchInfo.matchDetails.Comments}</h5>
                        </div>
                    </div>
                )}
                <br></br>
                {matchInfo?.matchDetails && (

                    <div className="innings-buttons">
                        <button
                            className={`team-button ${selectedInnings === 'Innings1' ? 'active' : ''}`}
                            onClick={() => setSelectedInnings('Innings1')}
                        >
                            {matchInfo.matchDetails.FirstBattingTeamCode}'s Innings
                        </button>
                        <button
                            className={`team-button ${selectedInnings === 'Innings2' ? 'active' : ''}`}
                            onClick={() => setSelectedInnings('Innings2')}
                        >
                            {matchInfo.matchDetails.SecondBattingTeamCode}'s Innings
                        </button>
                    </div>
                )}
                {matchInfo?.matchDetails && selectedInnings && (
                    <div className="scorecard">
                        <div className="batting-table responsive-table">
                            <div className="table-header">
                                <div>Batter</div>
                                <div>R</div>
                                <div>B</div>
                                <div>4s</div>
                                <div>6s</div>
                                <div>SR</div>
                            </div>

                            {innings?.BattingCard?.length > 0 ? innings.BattingCard.map((batsman, idx) => (
                                batsman.Balls !== 0 && (
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
                                )

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
                                    <div>{bowler.DotBalls}</div>
                                </div>
                            )) : <div>No bowling data available</div>}
                        </div>
                    </div>
                )}


            </div>}
        </>

    );
};

export default MatchInfo;
