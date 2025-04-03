import "./IplPointsTable.css";
const IplPointsTable = (pointsTable) => {
    const pointsTableData = pointsTable.points;
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
                  {/* <img src={team.teamLogo} alt={team.team} className="team-logo" /> */}
                  <span>{team.team}</span>
                </td>
                <td>{team.matchesPlayed}</td>
                <td>{team.matchesWon}</td>
                <td>{team.matchesLost}</td>
                <td>{team.matchesTied}</td>
                {/* <td>{team.Ties}</td> */}
                {/* <td>{team.TeamLogo}</td> */}
                <td>{team.netRunRate}</td>
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