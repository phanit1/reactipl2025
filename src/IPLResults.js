import React, { useState, useEffect } from "react";
import axios from "axios";
import "./IplResults.css"; // Include CSS for styling

const IplResults = (results) => {
  console.log("results", results);

  return (
    <div className="ipl-results-container">
      <h1 className="results-title">IPL 2025 Match Results</h1>
      <div className="results-list">
        {results.matchResults.map((result, index) => (
          <div key={index} className="result-card">
            <h3>{result.team1} vs {result.team2}</h3>
            <p><strong>Result:</strong> {result.result}</p>
            <p><strong>Score:</strong> {result.score}</p>
            <p><strong>Man of the Match:</strong> {result.mom}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IplResults;
