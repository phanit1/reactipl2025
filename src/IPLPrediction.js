import { useState, useEffect } from "react";
import axios from "axios";
import "./IPLPrediction.css";
import API_KEY from "./config";

export default function IPLPrediction({ matches }) {
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
    let APIKey = API_KEY.API_KEY;
    const BASE_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

    useEffect(() => {
        const getPredictions = async () => {
            if (!matches || matches.length === 0) return;

            setLoading(true);
            try {
                const matchWinners = matches.map((match) => match.split(",")[1]);
                const matchesVenue = matches.map((match) => match.split(",")[2]);
                const matchNames = matches.map((match) => match.split(",")[0]);
                const content = `You are an AI cricket analyst predicting IPL 2025 match outcomes. Here are the upcoming matches: ${matches}.
                For each match, provide a List of JSON objects as response in the following format: 
                [{"team1": "Chennai Super Kings", "team2": "Mumbai Indians", "winner": "Mumbai Indians", "probability": "65%"}]`;

                const response = await axios.post(
                    BASE_URL,
                    {
                        contents: [{ role: "user", parts: [{ text: content }] }]
                    },
                    {
                        params: { key: APIKey },
                        headers: { "Content-Type": "application/json" }
                    }
                );

                const rawOutput = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
                const result = JSON.parse(JSON.stringify(rawOutput));
                const res = result.split("```json")[1].split("```")[0];
                let res1 = JSON.parse(res);
                res1.forEach((r, index) => {
                    if (r.team1 + " vs " + r.team2 === matchNames[index]) {
                        r.Venue = matchesVenue[index];
                        r.Result = matchWinners[index];
                    }
                });
                setPredictions(res1);
            } catch (error) {
                console.error("Error fetching predictions:", error);
                setPredictions([{ error: "Failed to get prediction. Try again." }]);
            } finally {
                setLoading(false);
            }
        };

        getPredictions();
    }, [matches]);

    return (
        <div className="prediction-container">
            {loading && <p className="loading-text">Loading predictions...</p>}
            {!loading && predictions.length === 0 && <p className="no-data-text">No predictions available.</p>}

            {/* Desktop Table View */}
            <div className="table-view">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>SNO</th>
                            <th>Match</th>
                            <th>Venue</th>
                            <th>Predicted Winner</th>
                            <th>Winning Probability</th>
                            <th>Actual Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {predictions.map((pred, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{pred.team1} vs {pred.team2}</td>
                                <td>{pred.Venue}</td>
                                <td>{pred.winner}</td>
                                <td>{pred.probability}</td>
                                <td>{pred.Result}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="card-view">
                {predictions.map((pred, index) => (
                    <div className="prediction-card" key={index}>
                        <div><strong>SNO:</strong> {index + 1}</div>
                        <div><strong>Match:</strong> {pred.team1} vs {pred.team2}</div>
                        <div><strong>Venue:</strong> {pred.Venue}</div>
                        <div><strong>Predicted Winner:</strong> {pred.winner}</div>
                        <div><strong>Winning Probability:</strong> {pred.probability}</div>
                        <div><strong>Actual Winner:</strong> {pred.Result}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
