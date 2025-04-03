import React, { useState } from "react";
import "./IplBetting.css";

const IplBetting = (presentMatches) => {
    console.log("presentMatches", presentMatches);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [tossBet, setTossBet] = useState("");
  const [winnerBet, setWinnerBet] = useState("");
  const [betAmount, setBetAmount] = useState("");

  const handleBet = () => {
    if (!selectedMatch || !tossBet || !winnerBet || !betAmount) {
      alert("Please complete all fields");
      return;
    }
    alert(`Bet placed:\nMatch: ${selectedMatch}\nToss: ${tossBet}\nWinner: ${winnerBet}\nAmount: ₹${betAmount}`);
  };

  return (
    <div className="betting-container">
      <h2>Bet on a Match</h2>
      <label>Match:</label>
      <select value={selectedMatch} onChange={(e) => setSelectedMatch(e.target.value)}>
        <option value="">Select a match</option>
        {presentMatches.matches.map((match, index) => (
          <option key={index} value={match.matchName}>{match.matchName}</option>
        ))}
      </select>
      
      <label>Toss Winner:</label>
      <select value={tossBet} onChange={(e) => setTossBet(e.target.value)}>
        <option value="">Select a team</option>
        {presentMatches.matches[0].matchName.split(" vs ").map((match, index) => (
          <option key={index} value={match}>{match}</option>
        ))}
      </select>
      {/* <div>
        <button className={tossBet === "Heads" ? "selected" : ""} onClick={() => setTossBet("Heads")}>Heads</button>
        <button className={tossBet === "Tails" ? "selected" : ""} onClick={() => setTossBet("Tails")}>Tails</button>
      </div> */}
      
      <label>Match Winner:</label>
      <select value={winnerBet} onChange={(e) => setWinnerBet(e.target.value)}>
        <option value="">Select a team</option>
        {presentMatches.matches[0].matchName.split(" vs ").map((match, index) => (
          <option key={index} value={match}>{match}</option>
        ))}
      </select>
      {/* <input type="text" placeholder="Enter team name" value={winnerBet} onChange={(e) => setWinnerBet(e.target.value)} /> */}
      
      <label>Bet Amount (₹):</label>
      <input type="number" placeholder="Enter amount" value={betAmount} onChange={(e) => setBetAmount(e.target.value)} />
      
      <button onClick={handleBet}>Place Bet</button>
    </div>
  );
};

export default IplBetting;