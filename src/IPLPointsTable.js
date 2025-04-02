import "./IplPointsTable.css";
import React, { useEffect, useState } from 'react';
const IplPointsTable = () => {
      const [pointsTableData, setPointsTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
      const fetchPointsTable = async () => {
        try {
          const response = await fetch(
            'https://reactipl2025backend.vercel.app/api/iplpoints'
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const html = await response.text();
          const parsedData = parsePointsTable(html);
          setPointsTableData(parsedData);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
  
      fetchPointsTable();
    }, []);
  
    function parsePointsTable(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const tableRows = doc.querySelectorAll('table.cb-srs-pnts tbody tr');
      let tableData = [];
  
      if (tableRows && tableRows.length > 0) {
        tableRows.forEach((row) => {
          const cells = row.querySelectorAll('td');
          if (cells && cells.length >= 8) {
            const teamName = cells[0]?.textContent?.trim() || '';
            const teamImg = cells[0].querySelector('img');
            const teamLogo = teamImg?.getAttribute('src') || '';
            const matches = cells[1]?.textContent?.trim() || '';
            const wins = cells[2]?.textContent?.trim() || '';
            const losses = cells[3]?.textContent?.trim() || '';
            const ties = cells[4]?.textContent?.trim() || '';
            const points = cells[6]?.textContent?.trim() || '';
            const nrr = cells[7]?.textContent?.trim() || '';
  
            tableData.push({
              team: teamName,
              teamLogo,
              matches,
              wins,
              losses,
              ties,
              nrr,
              points,
            });
          }
        });
      }
      tableData = tableData.filter((item, index) => index % 2 === 0);
      return tableData;
    }
    return (
      <div className="container">
        <h2 className="heading">IPL Points Table</h2>
        <table className="points-table">
          <thead>
            <tr>
              <th>POS</th>
              <th>TEAM</th>
              <th>P</th>
              <th>W</th>
              <th>L</th>
              <th>T</th>
              <th>NRR</th>
              <th>PTS</th>
              {/* <th>RECENT FORM</th> */}
            </tr>
          </thead>
          <tbody>
            {pointsTableData.map((team, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td className="team-cell">
                  <img src={team.teamLogo} alt={team.team} className="team-logo" />
                  <span>{team.team}</span>
                </td>
                <td>{team.matches}</td>
                <td>{team.wins}</td>
                <td>{team.losses}</td>
                <td>{team.ties}</td>
                {/* <td>{team.Ties}</td> */}
                {/* <td>{team.TeamLogo}</td> */}
                <td>{team.nrr}</td>
                {/* <td>{team.ForTeams}</td>
                <td>{team.AgainstTeam}</td> */}
                <td className="points">{team.points}</td>
                {/* {team.Performance.includes(",") ? (
                  <td>
                    {team.Performance.split(",").map((performance, index) => (
                      <span key={index} className="performance">{performance === "W" ? "✅ " : "❌ "}</span>
                    ))}
                  </td>
                ) : (
                  <td className="performance">{team.Performance === "W" ? "✅" : "❌"}</td>
                )} */}
                {/* <td>{team.Performance}</td> */}
                {/* <td>{team.Performance === "W" ? "✅" : "❌"}</td> */}
                {/* <td>{team.Performance === "W" ? "✅" : "❌"}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default IplPointsTable;