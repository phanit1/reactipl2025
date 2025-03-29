import { useState, useEffect } from "react";
import axios from "axios";
import "./IPLPrediction.css";
// import dotenv from "dotenv";
// dotenv.config();
import  API_KEY  from "./config";

export default function IPLPrediction({ matches }) {
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);

    const APIKey= API_KEY.API_KEY; // Replace with your actual API key
    console.log(APIKey,"API Key")
    const BASE_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

    useEffect(() => {
        const getPredictions = async () => {
            if (!matches || matches.length === 0) return;

            setLoading(true);
            try {
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
                const res1 = JSON.parse(res);
                // console.log(result[0],"Result")
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

            <div>
                {predictions.length > 0 && predictions.map((pred, index) => (
                    <div key={index} className="prediction-card">
                        <h2>{pred.team1} vs {pred.team2}</h2>
                        <p>Predicted Winner: <b>{pred.winner}</b></p>
                        <p>Winning Probability: <b>{pred.probability}</b></p>
                    </div>
                ))}
            </div>
        </div>
    );
}
