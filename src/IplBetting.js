import React, { useState } from "react";
import "./IplBetting.css";

const IplBetting = ({ presentMatches }) => {
  const [selectedMatch, setSelectedMatch] = useState("");
  const [tossBet, setTossBet] = useState("");
  const [winnerBet, setWinnerBet] = useState("");
  const [betAmount, setBetAmount] = useState("");

  const handleBet = () => {
    if (!selectedMatch || !tossBet || !winnerBet || !betAmount) {
      alert("Please complete all fields");
      return;
    }

    alert(`✅ Bet placed:
• Match: ${selectedMatch}
• Toss Winner: ${tossBet}
• Match Winner: ${winnerBet}
• Bet Amount: ₹${betAmount}`);
  };

  const currentTeams = selectedMatch
    ? selectedMatch.split(" vs ")
    : presentMatches[0]?.matchName.split(" vs ");

  return (
    <div className="betting-container">
      <h2>Bet on a Match</h2>
      <form className="betting-form" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Match:</label>
          <select
            value={selectedMatch}
            onChange={(e) => setSelectedMatch(e.target.value)}
          >
            <option value="">Select a match</option>
            {presentMatches.map((match, index) => (
              <option key={index} value={match.matchName}>
                {match.matchName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Toss Winner:</label>
          <select
            value={tossBet}
            onChange={(e) => setTossBet(e.target.value)}
          >
            <option value="">Select a team</option>
            {currentTeams?.map((team, index) => (
              <option key={index} value={team.trim()}>
                {team.trim()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Match Winner:</label>
          <select
            value={winnerBet}
            onChange={(e) => setWinnerBet(e.target.value)}
          >
            <option value="">Select a team</option>
            {currentTeams?.map((team, index) => (
              <option key={index} value={team.trim()}>
                {team.trim()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Bet Amount (₹):</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" onClick={handleBet}>
            Place Bet
          </button>
        </div>
      </form>
    </div>
  );
};

export default IplBetting;
