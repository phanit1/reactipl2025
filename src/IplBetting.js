import React, { useState } from "react";
import "./IplBetting.css";

// const matches = [
//   "Gujarat Titans vs Punjab Kings",
//   "Delhi Capitals vs Lucknow Super Giants",
//   "Chennai Super Kings vs Mumbai Indians",
//   "Sunrisers Hyderabad vs Rajasthan Royals",
//   "Kolkata Knight Riders vs Royal Challengers Bengaluru",
//   "Rajasthan Royals vs Kolkata Knight Riders",
//   "Sunrisers Hyderabad vs Lucknow Super Giants",
//   "Chennai Super Kings vs Royal Challengers Bengaluru",
//   "Gujarat Titans vs Mumbai Indians",
//   "Delhi Capitals vs Sunrisers Hyderabad",
//   "Rajasthan Royals vs Chennai Super Kings",
//   "Mumbai Indians vs Kolkata Knight Riders",
//   "Lucknow Super Giants vs Punjab Kings",
//   "Royal Challengers Bengaluru vs Gujarat Titans",
//   "Kolkata Knight Riders vs Sunrisers Hyderabad",
//   "Lucknow Super Giants vs Mumbai Indians",
//   "Chennai Super Kings vs Delhi Capitals",
//   "Punjab Kings vs Rajasthan Royals",
//   "Kolkata Knight Riders vs Lucknow Super Giants",
//   "Sunrisers Hyderabad vs Gujarat Titans",
//   "Mumbai Indians vs Royal Challengers Bengaluru",
//   "Punjab Kings vs Chennai Super Kings",
//   "Gujarat Titans vs Rajasthan Royals",
//   "Royal Challengers Bengaluru vs Delhi Capitals",
//   "Chennai Super Kings vs Kolkata Knight Riders",
//   "Lucknow Super Giants vs Gujarat Titans",
//   "Sunrisers Hyderabad vs Punjab Kings",
//   "Rajasthan Royals vs Royal Challengers Bengaluru",
//   "Delhi Capitals vs Mumbai Indians",
//   "Lucknow Super Giants vs Chennai Super Kings",
//   "Punjab Kings vs Kolkata Knight Riders",
//   "Delhi Capitals vs Rajasthan Royals",
//   "Mumbai Indians vs Sunrisers Hyderabad",
//   "Royal Challengers Bengaluru vs Punjab Kings",
//   "Gujarat Titans vs Delhi Capitals",
//   "Rajasthan Royals vs Lucknow Super Giants",
//   "Punjab Kings vs Royal Challengers Bengaluru",
//   "Mumbai Indians vs Chennai Super Kings",
//   "Kolkata Knight Riders vs Gujarat Titans",
//   "Lucknow Super Giants vs Delhi Capitals",
//   "Sunrisers Hyderabad vs Mumbai Indians",
//   "Royal Challengers Bengaluru vs Rajasthan Royals",
//   "Chennai Super Kings vs Sunrisers Hyderabad",
//   "Kolkata Knight Riders vs Punjab Kings",
//   "Mumbai Indians vs Lucknow Super Giants",
//   "Delhi Capitals vs Royal Challengers Bengaluru",
//   "Rajasthan Royals vs Gujarat Titans",
//   "Delhi Capitals vs Kolkata Knight Riders",
//   "Chennai Super Kings vs Punjab Kings",
//   "Rajasthan Royals vs Mumbai Indians",
//   "Gujarat Titans vs Sunrisers Hyderabad",
//   "Royal Challengers Bengaluru vs Chennai Super Kings",
//   "Kolkata Knight Riders vs Rajasthan Royals",
//   "Punjab Kings vs Lucknow Super Giants",
//   "Sunrisers Hyderabad vs Delhi Capitals",
//   "Mumbai Indians vs Gujarat Titans",
//   "Kolkata Knight Riders vs Chennai Super Kings",
//   "Punjab Kings vs Delhi Capitals",
//   "Lucknow Super Giants vs Royal Challengers Bengaluru",
//   "Sunrisers Hyderabad vs Kolkata Knight Riders",
//   "Punjab Kings vs Mumbai Indians",
//   "Delhi Capitals vs Gujarat Titans",
//   "Chennai Super Kings vs Rajasthan Royals",
//   "Royal Challengers Bengaluru vs Sunrisers Hyderabad",
//   "Gujarat Titans vs Lucknow Super Giants",
//   "Mumbai Indians vs Delhi Capitals",
//   "Rajasthan Royals vs Punjab Kings",
//   "Royal Challengers Bengaluru vs Kolkata Knight Riders",
//   "Gujarat Titans vs Chennai Super Kings",
//   "Lucknow Super Giants vs Sunrisers Hyderabad"
// ];

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
    console.log(selectedMatch,"selectedMatch");
    alert(`Bet placed:\nMatch: ${selectedMatch | JSON}\nToss: ${tossBet}\nWinner: ${winnerBet}\nAmount: ₹${betAmount}`);
  };

  return (
    <div className="betting-container">
      <h2>Bet on a Match</h2>
      <label>Match:</label>
      <select value={selectedMatch} onChange={(e) => setSelectedMatch(e.target.value)}>
        <option value="">Select a match</option>
        {presentMatches.matches.map((match, index) => (
          <option key={index} value={match}>{match.MatchName}</option>
        ))}
      </select>
      
      <label>Toss Winner:</label>
      <select value={tossBet} onChange={(e) => setTossBet(e.target.value)}>
        <option value="">Select a team</option>
        {presentMatches.matches[0].MatchName.split(" vs ").map((match, index) => (
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
        {presentMatches.matches[0].MatchName.split(" vs ").map((match, index) => (
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