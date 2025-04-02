import { useState, useEffect } from "react";
import axios from "axios";
import "./IPLPrediction.css";
// import dotenv from "dotenv";
// dotenv.config();
import  API_KEY  from "./config";

export default function IPLPrediction({ matches }) {
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
    // console.log(matches,"Matches")
    const APIKey= API_KEY.API_KEY; // Replace with your actual API key
    console.log(APIKey,"API Key")
    const BASE_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

    useEffect(() => {
        const getPredictions = async () => {
            if (!matches || matches.length === 0) return;

            setLoading(true);
            try {
                console.log(matches,"Matches Before");
                const matchesResult = matches.map((match) => match.split(",")[1]);
                const matchesVenue = matches.map((match) => match.split(",")[2]);
                matches = matches.map((match) => match.split(",")[0]);
                // console.log(matches,"Matches");
                // console.log(matchesResult,"MatchesResult")
                const content = `You are an AI cricket analyst predicting IPL 2025 match outcomes. Here are the upcoming matches: ${matches}.
                For each match, provide a List of JSON objects as response in the following format: 
                [{"team1": "Chennai Super Kings", "team2": "Mumbai Indians", "winner": "Mumbai Indians", "probability": "65%"} , {"team1": "Kolkata Knight Riders", "team2": "Royal Challengers Bengaluru", "winner": "Royal Challengers Bengaluru", "probability": "53%"} ]`;

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
                // console.log(rawOutput,"Raw Output")
                const result = JSON.parse(JSON.stringify(rawOutput)); // Convert to JSON
                const res = result.split("```json")[1].split("```")[0];
                // const res1 = res.map((r) => JSON.parse(r));
                let res1 = JSON.parse(res);
                res1.map((r, index) => {
                    if(r.team1+" vs " + r.team2 === matches[index]) {
                        if(matchesResult[index].includes(" won")) {
                            r.Result = matchesResult[index].split(" won")[0];
                        }
                        else {
                            r.Result = "Upcoming";
                        }
                        r.Venue = matchesVenue[index];
                    // r.Result = matchesResult[index].split(" won")[0];
                } 
            });
            console.log(res1,"Res1")
                setPredictions(res1);

            } catch (error) {
                console.error("Error fetching predictions:", error);
                setPredictions([{ error: "Failed to get prediction. Try again." }]);
            } finally {
                setLoading(false);
            }
        };

        getPredictions();
    }, [matches]); // Fetch predictions when matches update

    return (
        <div className="prediction-container">
            <h1 className="prediction-title">IPL 2025 Predictions</h1>

            {loading && <p className="text-yellow-500">Loading predictions...</p>}

            <table className="prediction-table">
                <thead>
                    <tr>
                        <th>Match</th>
                        <th>Venue</th>
                        <th>Predicted Winner</th>
                        <th>Winning Probability</th>
                        <th>Actual Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {predictions.length > 0 && predictions.map((pred, index) => (
                        <tr key={index}>
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
    );
}
