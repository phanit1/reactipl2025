import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import IplSchedule from "./IPLSchedule";
import { format, parse, isValid } from 'date-fns';
import IplPointsTable from './IPLPointsTable';
import IplBetting from './IplBetting';
import IPLPrediction from './IPLPrediction';
import IplHomePage from './IplHomePage';
import MatchInfo from './MatchInfo';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import './App1.css';

function App() {
    const [content, setContent] = useState(''); // Default to IPL 2025 images
    const [season, setSeason] = useState(() => localStorage.getItem("iplSeason") || "2026");
    const [seasons, setSeasons] = useState([]);
    const [schedule, setSchedule] = useState(null);
    const [pointsTable, setPointsTable] = useState(null);
    const [matches, setMatches] = useState([]);
    const [presentMatches, setPresentMatches] = useState([]);
    const API_BASE = process.env.REACT_APP_API_BASE || "https://reactipl2025backend.vercel.app";
    const navigate = useNavigate();
    const location = useLocation();

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
            const element = schedule[index].team1 + " vs " + schedule[index].team2 + "," + schedule[index].status + "," + schedule[index].venue;
            pred.push(element);
          }
          setMatches(pred);
        }
      }, [schedule]);
    
      useEffect(() => {
        if (schedule) {
          let presentMatches = [];
          for (let index = 0; index < schedule.length; index++) {
            const element = schedule[index];
            const formattedDate = format(new Date(), "yyyy-MM-dd");
            let formattedDate1 = "";

            if (element.MATCH_COMMENCE_START_DATE) {
              formattedDate1 = element.MATCH_COMMENCE_START_DATE.split(" ")[0];
            } else if (element.MatchDateNew) {
              const parsedDate = new Date(element.MatchDateNew);
              if (isValid(parsedDate)) {
                formattedDate1 = format(parsedDate, "yyyy-MM-dd");
              }
            } else if (element.date) {
              const parsedDate = parse(element.date + " " + season, "EEE, MMM dd yyyy", new Date());
              if (isValid(parsedDate)) {
                formattedDate1 = format(parsedDate, "yyyy-MM-dd");
              }
            }

            element["matchName"] = element.team1 && element.team2
              ? element.team1 + " vs " + element.team2
              : element.MatchName || "";

            if (formattedDate1 && formattedDate1 === formattedDate) {
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
            case 'livescore':
                return <div><h2>Live Score</h2></div>;
            default:
                return <IplHomePage />;
        }
    };

    const handleNav = (nextContent) => {
        if (location.pathname.startsWith("/user/match-info")) {
            navigate("/");
        }
        setContent(nextContent);
    };

    const Layout = ({ children, contentClassName }) => (
        <div className="app-shell">
            <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand onClick={() => handleNav('home')}>
                    {/* <img 
              src="https://bizacuity.com/wp-content/uploads/2022/12/BizAcuity-Logo-1.png" 
              style={{ width: '150px', height: '30px' }} 
              /> */}
              <span style={{padding:'10px', fontSize:'0.75em'}}>IPL {season}</span>
                      </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => handleNav('schedule')}>Schedule</Nav.Link>
                            <Nav.Link onClick={() => handleNav('points')}>Points Table</Nav.Link>
                            <Nav.Link onClick={() => handleNav('predictions')}>Predictions</Nav.Link>
                            <Nav.Link onClick={() => handleNav('betting')}>Betting</Nav.Link>
                            <Nav.Link onClick={() => handleNav('livescore')}>Live Score</Nav.Link>

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
            </Navbar>
            <Container className={`mt-4 content-shell ${contentClassName || ""}`}>
                {children}
            </Container>
        </div>
    );

    const MainLayout = () => (
        <Layout>
            {renderContent()}
        </Layout>
    );

    return (
        <Routes>
            <Route path="/user/match-info/:matchId" element={<Layout contentClassName="matchinfo-shell"><MatchInfo /></Layout>} />
            <Route path="*" element={<MainLayout />} />
        </Routes>
    );
}

export default App;
