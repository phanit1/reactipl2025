import "./IplPointsTable.css";
const IplPointsTable = (data) => {
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
              <th>NRR</th>
              {/* <th>FOR</th>
              <th>AGAINST</th> */}
              <th>PTS</th>
              <th>RECENT FORM</th>
            </tr>
          </thead>
          <tbody>
            {data.points.points.map((team, index) => (
              <tr key={index}>
                <td>{team.OrderNo}</td>
                <td className="team-cell">
                  <img src={team.TeamLogo} alt={team.TeamCode} className="team-logo" />
                  <span>{team.TeamCode}</span>
                </td>
                <td>{team.Matches}</td>
                <td>{team.Wins}</td>
                <td>{team.Loss}</td>
                <td>{team.NetRunRate}</td>
                {/* <td>{team.ForTeams}</td>
                <td>{team.AgainstTeam}</td> */}
                <td className="points">{team.Points}</td>
                {team.Performance.includes(",") ? (
                  <td>
                    {team.Performance.split(",").map((performance, index) => (
                      <span key={index} className="performance">{performance === "W" ? "✅ " : "❌ "}</span>
                    ))}
                  </td>
                ) : (
                  <td className="performance">{team.Performance === "W" ? "✅" : "❌"}</td>
                )}
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