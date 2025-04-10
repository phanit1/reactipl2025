import React from "react";
import "./HeadToHead.css";

const HeadToHead = (matchData) => {
  const matchdata = matchData.data;
  const totalMatches = matchdata.headToHead[0].TotalMatches;
  const team1Wins = matchdata.headToHead[0].Team1Won;
  const team2Wins = matchdata.headToHead[0].Team2Won;
  const noResults = matchdata.headToHead[0].NoResult;

  const team1Percent = (team1Wins / totalMatches) * 100;
  const team2Percent = (team2Wins / totalMatches) * 100;
  const noResultPercent = (noResults / totalMatches) * 100;

  return (
    <div className="head-to-head-container">
      <h4>Head to Head</h4>
      <small className="subtext">Since 2008</small>
      <div className="head-to-head-box">
        <div className="total-matches">
          <h2>{totalMatches}</h2>
          <p>Matches Played</p>
        </div>
        <div className="teams-info">
          <div className="team-row">
            <div className="team-name">
              <img
                src={`https://scores.iplt20.com/ipl/teamlogos/${matchdata.matchDetails.FirstBattingTeamCode}.png`}
                alt={matchdata.matchDetails.FirstBattingTeamCode}
              />
              <span>{matchdata.matchDetails.FirstBattingTeamCode}</span>
            </div>
            <div className="progress-bar">
              <div className="bar rcb" style={{ width: `${team1Percent}%` }}></div>
            </div>
            <span className="wins">{team1Wins} Won</span>
          </div>

          <div className="team-row">
            <div className="team-name">
            <img
                src={`https://scores.iplt20.com/ipl/teamlogos/${matchdata.matchDetails.SecondBattingTeamCode}.png`}
                alt={matchdata.matchDetails.SecondBattingTeamCode}
              />
              <span>{matchdata.matchDetails.SecondBattingTeamCode}</span>
            </div>
            <div className="progress-bar">
              <div className="bar dc" style={{ width: `${team2Percent}%` }}></div>
            </div>
            <span className="wins">{team2Wins} Won</span>
          </div>

          <div className="team-row">
            <span className="team-name">No Result</span>
            <div className="progress-bar">
              <div className="bar no-result" style={{ width: `${noResultPercent}%` }}></div>
            </div>
            <span className="wins">{noResults} No Results</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadToHead;
