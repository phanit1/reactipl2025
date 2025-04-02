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

//   // Fetch match schedule
//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await fetch("https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js?MatchSchedule=_jqjsp&_1742886894491");
//         const result = await response.text();
//         const jsonString = result.replace(/^MatchSchedule\(/, "").replace(/\);$/, "");
//         const jsonData = JSON.parse(jsonString);
//         setSchedule(jsonData.Matchsummary || []);
//       } catch (error) {
//         console.log('error', error);
//       }
//     })();
//   }, []);
  

  useEffect(() => {
    async function fetchIPL2025Matches() {
      try {
        const response = await fetch(
          'https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025/matches'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const matchElements = doc.querySelectorAll('.cb-series-matches');
        const scheduleData = [];

        matchElements.forEach((matchElement) => {
          console.log('matchElement', matchElement);
          const dateElement = matchElement.querySelector('[ng-bind*="date:"]');
          const dateTimestamp = dateElement
            ? dateElement.getAttribute('ng-bind').match(/\d+/)[0]
            : null;

          const timeElement = matchElement.querySelector('[timestamp]');
          const timeTimestamp = timeElement ? timeElement.getAttribute('timestamp') : null;

          if (!dateTimestamp || !timeTimestamp) {
            return null;
          }

          const date = new Date(parseInt(dateTimestamp));
          const time = new Date(parseInt(timeTimestamp));

          const options = {
            month: 'short',
            day: 'numeric',
            weekday: 'short',
          };
          const formattedDate = date.toLocaleDateString('en-US', options);
          console.log('formattedDate', formattedDate);
          const timeOptions = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          };
          const formattedTime = time.toLocaleTimeString('en-US', timeOptions);
          console.log('formattedTime', formattedTime);

          const matchDetailsElement = matchElement.querySelector('.cb-srs-mtchs-tm a span');
          const matchDetails = matchDetailsElement ? matchDetailsElement.textContent.trim() : null;

          const venueElement = matchElement.querySelector('.cb-srs-mtchs-tm .text-gray');
          const venue = venueElement ? venueElement.textContent.trim() : null;

          const resultElement = matchElement.querySelector('.cb-text-complete');
          const result = resultElement ? resultElement.textContent.trim() : null;

          if (matchDetails) {
            scheduleData.push({
              date: formattedDate,
              matchDetails,
              venue,
              result,
              time: formattedTime,
            });
          }
        });

        const ipl2025Matches = scheduleData.map((match) => {
          const teams = match.matchDetails.split(' vs ');
          const matchNumber = teams[1].split(",")[1].trim();
          return {
            date: match.date,
            team1: teams[0],
            team2: teams[1].split(",")[0].trim(),
            matchNumber: matchNumber,
            venue: match.venue,
            time: match.time,
            status: match.result || 'Upcoming',
          };
        }
        );
        // console.log('ipl2025Matches', ipl2025Matches);
        setSchedule(ipl2025Matches);
        // setLoading(false);
      } catch (err) {
        // setError(err);
        // setLoading(false);
      }
    }

    fetchIPL2025Matches();
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
      // console.log("element", element);
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
        {selectedTab === "schedule" && <IplSchedule schedule={schedule} />}
        {selectedTab === "points" && <IplPointsTable />}
        {selectedTab === "prediction" && <IPLPrediction matches={matches} />}
        {selectedTab === "betting" && <IplBetting matches={presentMatches} />}
      </main>
    </div>
  );
}

export default App;
