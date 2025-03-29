import React, { useEffect, useState } from 'react';
import IplPointsTable from './IPLPointsTable';
import IplSchedule from './IPLSchedule';

function IPLApp() {
  const [matchResults, setMatchResults] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [pointsTable, setPointsTable] = useState(null);

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
      fetch("https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js?MatchSchedule=_jqjsp&_1742886894491")
        .then(response => response.text())
        .then((result) => {
            const jsonString = result.replace(/^MatchSchedule\(/, "").replace(/\);$/, "");
            const jsonData = JSON.parse(jsonString); 
            console.log('jsonData', jsonData);
            setSchedule(jsonData.Matchsummary || []);
            
        })
        .catch(error => console.log('errorR', error));
  }, []);

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

  return (
    <div>
      <h1>IPL 2025</h1>

      {/* Match Results Section */}
      <div>
        <h2>Match Results</h2>
        {matchResults ? (
          <pre>{JSON.stringify(matchResults, null, 2)}</pre>
        ) : (
          <p>Loading match results...</p>
        )}
      </div>

      {/* Schedule Section */}
      <div>
        {schedule ? (
        //   <pre>{JSON.stringify(schedule, null, 2)}</pre>
          <IplSchedule schedule={schedule} />
        ) : (
          <p>Loading schedule...</p>
        )}
      </div>

      {/* Points Table Section */}
      <div>
        {pointsTable ? (
          <IplPointsTable points={pointsTable} />
        ) : (
          <p>Loading points table...</p>
        )}
      </div>
    </div>
  );
}

export default IPLApp;
