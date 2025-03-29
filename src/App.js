import React, { useState, useEffect } from "react";
import IplSchedule from "./IPLSchedule";
import IplPointsTable from "./IPLPointsTable";
import IPLPrediction from "./IPLPrediction";
import IplBetting from "./IplBetting";
import "./App.css";

function App() {
  const [selectedTab, setSelectedTab] = useState(); // Default tab
  const [matchResults, setMatchResults] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [pointsTable, setPointsTable] = useState(null);
  const [matches, setMatches] = useState([]);
  const [presentMatches, setPresentMatches] = useState([]);

  // Fetch match results
  useEffect(() => {
    fetch('https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/2025-matchlinks.js?callback=onMatchLinksBySeason&_=1742887208369')
      .then((response) => response.text())
      .then((data) => {
        const jsonData = JSON.parse(String(data).replace('onMatchLinks(', '').replace(');', '')); // handle the callback format
        setMatchResults(jsonData);
      })
      .catch((error) => console.error('Error fetching match results:', error));
  }, []);

  // Fetch match schedule
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js?MatchSchedule=_jqjsp&_1742886894491");
        const result = await response.text();
        const jsonString = result.replace(/^MatchSchedule\(/, "").replace(/\);$/, "");
        const jsonData = JSON.parse(jsonString);
        setSchedule(jsonData.Matchsummary || []);
      } catch (error) {
        console.log('error', error);
      }
    })();
  }, []);
  // ✅ Use `useEffect` to handle state update after setting prediction
  // useEffect(() => {
  //   if (schedule) {
  //     let pred = [];
  //     let presentMatches = [];
  //     // console.log("Schedule Content:", schedule);
  //     for (let index = 0; index < schedule.length; index++) {
  //       const element = schedule[index];
  //       const matchElement = schedule[index].MatchName;
  //       // console.log("element", element);
  //       let date = new Date();
  //       let formattedDate = date.toISOString().split("T")[0];
  //       console.log(formattedDate);
  //       // Output: "2025-05-25" (or current date)

  //       if (element.MatchStatus === "UpComing" && element.MatchDate === formattedDate) {
  //         presentMatches.push(element);
  //       }
  //       pred.push(matchElement);
  //     }
  //     // for (let index = 0; index < schedule.length; index++) {
  //     //   const element = schedule[index].MatchName;
  //     //   pred.push(element);
  //     // }
  //     if (pred.length !== 0) {
  //       setMatches(pred);
  //     }
  //     if (presentMatches.length !== 0) {
  //       console.log("presentMatches", presentMatches);
  //       setPresentMatches(presentMatches);
  //     }
  //     // setPresentMatches(presentMatches);
  //   }
  // }, [schedule]);
  // Fetch points table
  useEffect(() => {
    fetch('https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js?ongroupstandings=_jqjsp&_1742887309430=')
      .then((response) => response.text())
      .then((data) => {
        const jsonData = JSON.parse(data.replace(/^ongroupstandings\(/, "").replace(/\);$/, "")); // handle the callback format
        setPointsTable(jsonData);
      })
      .catch((error) => console.error('Error fetching points table:', error));
  }, []);

  useEffect(() => {
    if (schedule) {
      let pred = [];
      for (let index = 0; index < schedule.length; index++) {
        const element = schedule[index].MatchName;
        pred.push(element);
      }
      setMatches(pred);    }
}, [schedule]);

useEffect(() => {
  if (schedule) {
    let presentMatches = [];

    for (let index = 0; index < schedule.length; index++) {
      const element = schedule[index];
      // console.log("element", element);
      let formattedDate = new Date().toISOString().split("T")[0];
      if (element.MatchStatus === "UpComing" && element.MatchDate === formattedDate) {
        presentMatches.push(element);
      }
    }
    setPresentMatches(presentMatches);
      }
}, [schedule]);

  // useEffect(() => {
    

  // }, [schedule]);

  // useEffect(() => {
  //   let presentMatches = [];

  //   for (let index = 0; index < schedule.length; index++) {
  //     const element = schedule[index];
  //     console.log("element", element);
  //     let formattedDate = new Date().toISOString().split("T")[0];
  //     if (element.MatchStatus === "UpComing" && element.MatchDate === formattedDate) {
  //       presentMatches.push(element);
  //     }
  //   }
  //   setPresentMatches(presentMatches);
  // }, [presentMatches]);

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
        {selectedTab === "schedule" && <IplSchedule schedule={schedule} />}
        {selectedTab === "points" && <IplPointsTable points={pointsTable} />}
        {selectedTab === "prediction" && <IPLPrediction matches={matches} />}
        {selectedTab === "betting" && <IplBetting matches={presentMatches} />}
      </main>
    </div>
  );
}

export default App;
