import React, { useState } from "react";
import axios from "axios";
import "./IplBetting.css";
import Keys from "./config.json"

const IplBetting = ({ presentMatches }) => {
  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedBetTypes, setSelectedBetTypes] = useState([]);
  const [tossBet, setTossBet] = useState("");
  const [winnerBet, setWinnerBet] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [minScore, setMinScore] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const email = localStorage.getItem("email");

  const handleBetTypeChange = (type) => {
    setSelectedBetTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleBetAmountChange = (value) => {
    let val = value.replace(/[^0-9]/g, "");
    if (parseInt(val, 10) > 1000) {
      alert("Bet amount cannot exceed ₹1000.");
      val = "1000";
    }
    setBetAmount(val);
  };

  const handlePaymentAndPlaceBet = async () => {
    if (!selectedMatch || selectedBetTypes.length === 0 || !betAmount) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      const { data } = await axios.post("https://reactipl2025backend.vercel.app/api/create-order", {
        amount: betAmount,
      });

      const options = {
        key: Keys.REACT_APP_RAZORPAY_KEY,
        amount: betAmount,
        currency: "INR",
        name: "Betting App",
        description: "Betting Credits",
        order_id: data.id,
        handler: function (response) {
          console.log("Payment Success:", response);
          placeBet(); // Place the bet only after successful payment
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong during payment.");
    }
  };

  const placeBet = async() => {
    // let message = `✅ Bet placed:\n• Match: ${selectedMatch}`;
    // if (selectedBetTypes.includes("toss")) message += `\n• Toss Winner: ${tossBet}`;
    // if (selectedBetTypes.includes("winner")) message += `\n• Match Winner: ${winnerBet}`;
    // if (selectedBetTypes.includes("max")) message += `\n• Max Score Prediction: ${maxScore}`;
    // if (selectedBetTypes.includes("min")) message += `\n• Min Score Prediction: ${minScore}`;
    // message += `\n• Bet Amount: ₹${betAmount}`;
    const bets = [];
    console.log("Selected Bet Types:", selectedBetTypes);
    if (selectedBetTypes.includes("toss") && tossBet)
      bets.push({ type: "toss", betOn: tossBet });
    if (selectedBetTypes.includes("winner") && winnerBet)
      bets.push({ type: "winner", betOn: winnerBet });
    console.log("Bets:", bets);
    const betPayload = {
      email,
      matchName: selectedMatch,
      bets,
      amount: parseInt(betAmount),
      createdAt: new Date().toISOString()
    };
    console.log("Bet Payload:", betPayload);
    try {
      if (!betPayload.bets.length) {
      alert("Please select valid bet options.");
      return;
      }

      await axios.post("http://localhost:5000/api/iplbidding", betPayload);
      alert("✅ Bet placed and payment successful!");
    } catch (error) {
      console.error("Error placing bet:", error);
      alert("❌ Failed to place the bet. Please try again.", error.message);
    }

    setSelectedMatch("");
    setSelectedBetTypes([]);
    setTossBet("");
    setWinnerBet("");
    setBetAmount("");
    // alert(message);
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
            {/* Uncomment if needed
            <label>
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
            <select value={tossBet} onChange={(e) => setTossBet(e.target.value)}>
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
            <select value={winnerBet} onChange={(e) => setWinnerBet(e.target.value)}>
              <option value="">Select a team</option>
              {currentTeams?.map((team, index) => (
                <option key={index} value={team.trim()}>
                  {team.trim()}
                </option>
              ))}
            </select>
          </div>
        )}

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
          <button type="submit" onClick={handlePaymentAndPlaceBet}>
            Pay & Place Bet
          </button>
        </div>
      </form>
    </div>
  );
};

export default IplBetting;
