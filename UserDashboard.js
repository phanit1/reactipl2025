import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import IplSchedule from "./IPLSchedule";
import IplPointsTable from './IPLPointsTable';
import IplBetting from './IplBetting';
import IPLPrediction from './IPLPrediction';
import IplHomePage from './IplHomePage';
import { useNavigate } from "react-router-dom";
import './UserDashboard.css';
import './App1.css';


function UserDashboard() {
    const [content, setContent] = useState(''); // Default to IPL 2025 images
    const [season, setSeason] = useState(() => localStorage.getItem("iplSeason") || "2026");
    const [seasons, setSeasons] = useState([]);
    const [schedule, setSchedule] = useState(null);
    const [pointsTable, setPointsTable] = useState(null);
    const [matches, setMatches] = useState([]);
    const [presentMatches, setPresentMatches] = useState([]);
    const navigate = useNavigate();
    const API_BASE = process.env.REACT_APP_API_BASE || "https://reactipl2025backend.vercel.app";

    useEffect(() => {
        async function fetchSeasons() {
            try {
                const response = await fetch(`${API_BASE}/api/seasons`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data?.seasons?.length) {
                    setSeasons(data.seasons);
                    if (!data.seasons.find((s) => s.key === season)) {
                        setSeason(data.defaultSeason || data.seasons[0].key);
                    }
                }
            } catch (err) {
                // keep default season
            }
        }

        fetchSeasons();
    }, [API_BASE, season]);

    useEffect(() => {
        localStorage.setItem("iplSeason", season);
    }, [season]);

    useEffect(() => {
        async function fetchIPL2025Matches() {
          try {
            const response = await fetch(
              `${API_BASE}/api/iplmatches?season=${encodeURIComponent(season)}`
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
      }, [API_BASE, season]);
    
      useEffect(() => {
        async function fetchPointsTable() {
          try {
            const response = await fetch(
              `${API_BASE}/api/iplpointstable?season=${encodeURIComponent(season)}`
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
      }, [API_BASE, season]);
    
      useEffect(() => {
        if (schedule) {
          let pred = [];
          for (let index = 0; index < schedule.length; index++) {
            // console.log(schedule[index], "Each Match in Scgedule")
            if (schedule[index].MatchStatus === 'Post') {
              const element = schedule[index].MatchName + "," + schedule[index].Comments.split(" Won")[0] + "," + schedule[index].GroundName;
              pred.push(element);
            }
            else if (schedule[index].MatchStatus === 'UpComing') {
              const element = schedule[index].MatchName + "," + schedule[index].MatchStatus + "," + schedule[index].GroundName;
              pred.push(element);
            }
          }
          // console.log(pred, "Predictions")
          setMatches(pred);
        }
      }, [schedule]);
    
      useEffect(() => {
        if (schedule) {
          let presentMatches = [];
          for (let index = 0; index < schedule.length; index++) {
            const element = schedule[index];
            let formattedDate = new Date().toISOString().split("T")[0];
            const formattedDate1 = element.MATCH_COMMENCE_START_DATE.split(" ")[0];
            element["matchName"] = element.MatchName;
            if (formattedDate1 === formattedDate) {
              presentMatches.push(element);
            }
          }
          setPresentMatches(presentMatches);
        }
      }, [schedule]);

    const renderContent = () => {
        switch (content) {
            case 'home':
                return <IplHomePage />;
            case 'schedule':
                return <IplSchedule schedule={schedule} season={season} />;
            case 'points':
                return <IplPointsTable points={pointsTable} />;
            case 'predictions':
                return <IPLPrediction matches={matches} />;
            case 'betting': 
                return <IplBetting presentMatches={presentMatches} />;
            default:
                return <IplHomePage />;
        }
    };

    return (
        <div className="app-shell user-dashboard">
            <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand onClick={() => setContent('home')}>
                    {/* <img 
              src="https://bizacuity.com/wp-content/uploads/2022/12/BizAcuity-Logo-1.png" 
              style={{ width: '150px', height: '30px' }} 
              /> */}
              <span style={{padding:'5px', fontSize:'1rem'}}>IPL {season}</span>
                      </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => setContent('schedule')}>Schedule</Nav.Link>
                            <Nav.Link onClick={() => setContent('points')}>Points Table</Nav.Link>
                            <Nav.Link onClick={() => setContent('predictions')}>Predictions</Nav.Link>
                            <Nav.Link onClick={() => setContent('betting')}>Betting</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto align-items-center">
                            <span style={{ color: "white", marginRight: "8px" }}>Season</span>
                            <select
                                className="form-select form-select-sm season-select"
                                style={{ width: "120px" }}
                                value={season}
                                onChange={(e) => setSeason(e.target.value)}
                            >
                                {(seasons.length ? seasons : [
                                    { key: "2026", label: "IPL 2026" },
                                    { key: "2025", label: "IPL 2025" }
                                ]).map((s) => (
                                    <option key={s.key} value={s.key}>{s.label}</option>
                                ))}
                            </select>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <Nav className='ms-auto'>
                    <Nav.Link onClick={() => navigate("/")}>Logout</Nav.Link>
                </Nav>
            </Navbar>
            <Container className="mt-4 content-shell">
                {renderContent()}
            </Container>
        </div>
    );
}

export default UserDashboard;
