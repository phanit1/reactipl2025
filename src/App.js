import React, { useState, useEffect } from "react";
import IplSchedule from "./IPLSchedule";
import IplPointsTable from "./IPLPointsTable";
import IPLPrediction from "./IPLPrediction";
import IplBetting from "./IplBetting";
import "./App.css";

function App() {
  const [selectedTab, setSelectedTab] = useState(); // Default tab
  const [schedule, setSchedule] = useState(null);
  const [pointsTable, setPointsTable] = useState(null);
  const [matches, setMatches] = useState([]);
  const [presentMatches, setPresentMatches] = useState([]);  

  useEffect(() => {
    async function fetchIPL2025Matches() {
      try {
        const response = await fetch(
          'https://reactipl2025backend.vercel.app/api/iplmatches'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSchedule(data.matches);
      } catch (err) {
        // setError(err);
        // setLoading(false);
      }
    }

    fetchIPL2025Matches();
  }, []);

  useEffect(() => {
    async function fetchPointsTable() { 
      try {
        const response = await fetch(
          'https://reactipl2025backend.vercel.app/api/iplpointstable'  
        );
        if (!response.ok) {   
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPointsTable(data.pointsTable);
      } catch (err) {
        // setError(err);
        // setLoading(false);
      }
    }
    fetchPointsTable();
  }, []);

  useEffect(() => {
    if (schedule) {
      let pred = [];
      for (let index = 0; index < schedule.length; index++) {
        const element = schedule[index].team1 + " vs " + schedule[index].team2+","+schedule[index].status+","+schedule[index].venue;
        pred.push(element);
      }
      setMatches(pred);    }
}, [schedule]);

useEffect(() => {
  if (schedule) {
    let presentMatches = [];

    for (let index = 0; index < schedule.length; index++) {
      const element = schedule[index];
      let formattedDate = new Date().toISOString().split("T")[0];
      if (element.MatchStatus === "UpComing" && element.MatchDate === formattedDate) {
        presentMatches.push(element);
      }
    }
    setPresentMatches(presentMatches);
      }
}, [schedule]);

  return (
    <div className="App">
      {/* Header Navigation */}
      <h1>IPL 2025</h1>
      <header className="header">
        <div
          className={`tab ${selectedTab === "schedule" ? "active" : ""}`}
          onClick={() => setSelectedTab("schedule")}
        >
          Schedule
        </div>
        <div
          className={`tab ${selectedTab === "points" ? "active" : ""}`}
          onClick={() => setSelectedTab("points")}
        >
          Points Table
        </div>
        <div
          className={`tab ${selectedTab === "prediction" ? "active" : ""}`}
          onClick={() => setSelectedTab("prediction")}
        >
          Predictions
        </div>
        <div
          className={`tab ${selectedTab === "betting" ? "active" : ""}`}
          onClick={() => setSelectedTab("betting")}
        >
          Betting
        </div>
      </header>

      {/* Conditional Rendering based on selected tab */}
      <main className="content">
        {selectedTab === "schedule" && schedule && <IplSchedule schedule={schedule} />}
        {selectedTab === "points" && <IplPointsTable points = {pointsTable}/>}
        {selectedTab === "prediction" && matches && <IPLPrediction matches={matches} />}
        {selectedTab === "betting" && presentMatches && <IplBetting matches={presentMatches} />}
      </main>
    </div>
  );
}

export default App;
