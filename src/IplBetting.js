import React, { useState } from "react";
import "./IplBetting.css";

const IplBetting = ({ presentMatches }) => {
  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedBetTypes, setSelectedBetTypes] = useState([]);
  const [tossBet, setTossBet] = useState("");
  const [winnerBet, setWinnerBet] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [minScore, setMinScore] = useState("");
  const [betAmount, setBetAmount] = useState("");

  const handleBetTypeChange = (type) => {
    setSelectedBetTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleBetAmountChange = (e) => {
    let value = e.replace(/[^0-9]/g, "");
    if (parseInt(value, 10) > 1000) {
      alert("Bet amount cannot exceed ₹1000. We care about our customers' safety and money.");
      value = "1000";
    }
    setBetAmount(value);
  };

  const handleBet = () => {
    if (!selectedMatch || selectedBetTypes.length === 0 || !betAmount) {
      alert("Please complete all required fields.");
      return;
    }

    let message = `✅ Bet placed:\n• Match: ${selectedMatch}`;
    if (selectedBetTypes.includes("toss")) message += `\n• Toss Winner: ${tossBet}`;
    if (selectedBetTypes.includes("winner")) message += `\n• Match Winner: ${winnerBet}`;
    if (selectedBetTypes.includes("max")) message += `\n• Max Score Prediction: ${maxScore}`;
    if (selectedBetTypes.includes("min")) message += `\n• Min Score Prediction: ${minScore}`;
    message += `\n• Bet Amount: ₹${betAmount}`;

    alert(message);
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
          <label>Select Bet Types:</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={selectedBetTypes.includes("toss")}
                onChange={() => handleBetTypeChange("toss")}
              />
              Toss Winner
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedBetTypes.includes("winner")}
                onChange={() => handleBetTypeChange("winner")}
              />
              Match Winner
            </label>
            {/* <label>
              <input
                type="checkbox"
                checked={selectedBetTypes.includes("max")}
                onChange={() => handleBetTypeChange("max")}
              />
              Maximum Score
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedBetTypes.includes("min")}
                onChange={() => handleBetTypeChange("min")}
              />
              Minimum Score
            </label> */}
          </div>
        </div>

        {selectedBetTypes.includes("toss") && (
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
        )}

        {selectedBetTypes.includes("winner") && (
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
        )}

        {/* {selectedBetTypes.includes("max") && (
          <div>
            <label>Max Score Prediction:</label>
            <input
              type="number"
              placeholder="e.g. 220"
              value={maxScore}
              onChange={(e) => setMaxScore(e.target.value)}
            />
          </div>
        )} */}

        {/* {selectedBetTypes.includes("min") && (
          <div>
            <label>Min Score Prediction:</label>
            <input
              type="number"
              placeholder="e.g. 120"
              value={minScore}
              onChange={(e) => setMinScore(e.target.value)}
            />
          </div>
        )} */}

        <div>
          <label>Bet Amount (₹):</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={betAmount}
            onChange={(e) => handleBetAmountChange(e.target.value)}
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
