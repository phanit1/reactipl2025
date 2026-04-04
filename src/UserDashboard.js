import React, { useState, useEffect } from 'react';
import IplSchedule from "./IPLSchedule";
import IplPointsTable from './IPLPointsTable';
import IplBetting from './IplBetting';
import IPLPrediction from './IPLPrediction';
import IplHomePage from './IplHomePage';
import { useNavigate } from "react-router-dom";
import './UserDashboard.css';

const API_BASE_URL = "https://reactipl2025backend.vercel.app/api";
const FALLBACK_SEASONS = [
    { key: "2026", label: "IPL 2026" },
    { key: "2025", label: "IPL 2025" }
];
const DEFAULT_SEASON = "2026";

function UserDashboard() {
    const [content, setContent] = useState('home');
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [seasonOptions, setSeasonOptions] = useState(FALLBACK_SEASONS);
    const [selectedSeason, setSelectedSeason] = useState(
        localStorage.getItem("selectedSeason") || DEFAULT_SEASON
    );
    const [schedule, setSchedule] = useState(null);
    const [pointsTable, setPointsTable] = useState(null);
    const [matches, setMatches] = useState([]);
    const [presentMatches, setPresentMatches] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        async function fetchSeasons() {
            try {
                const response = await fetch(`${API_BASE_URL}/seasons`);
                const data = await response.json();

                if (response.ok && isMounted) {
                    const seasons = data.seasons?.length ? data.seasons : FALLBACK_SEASONS;
                    const defaultSeason = data.defaultSeason || DEFAULT_SEASON;
                    const storedSeason = localStorage.getItem("selectedSeason");
                    const nextSeason = seasons.some((season) => season.key === storedSeason)
                        ? storedSeason
                        : defaultSeason;

                    setSeasonOptions(seasons);
                    setSelectedSeason(nextSeason);
                    localStorage.setItem("selectedSeason", nextSeason);
                }
            } catch (err) {
                if (isMounted) {
                    setSeasonOptions(FALLBACK_SEASONS);
                }
            }
        }

        fetchSeasons();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedSeason", selectedSeason);
    }, [selectedSeason]);

    useEffect(() => {
        setIsNavOpen(false);
    }, [content, selectedSeason]);

    useEffect(() => {
        async function fetchSeasonMatches() {
          try {
            const response = await fetch(
              `${API_BASE_URL}/iplmatches?season=${selectedSeason}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSchedule(data.matches);
          } catch (err) {
            setSchedule([]);
          }
        }
    
        fetchSeasonMatches();
      }, [selectedSeason]);
    
      useEffect(() => {
        async function fetchPointsTable() {
          try {
            const response = await fetch(
              `${API_BASE_URL}/iplpointstable?season=${selectedSeason}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPointsTable(data.pointsTable);
          } catch (err) {
            setPointsTable([]);
          }
        }
        fetchPointsTable();
      }, [selectedSeason]);
    
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
                return <IplHomePage selectedSeason={selectedSeason} />;
            case 'schedule':
                return <IplSchedule schedule={schedule} selectedSeason={selectedSeason} />;
            case 'points':
                return <IplPointsTable points={pointsTable} />;
            case 'predictions':
                return <IPLPrediction matches={matches} selectedSeason={selectedSeason} />;
            case 'betting': 
                return <IplBetting presentMatches={presentMatches} />;
            default:
                return <IplHomePage selectedSeason={selectedSeason} />;
        }
    };

    return (
        <div className="dashboard-page page-shell">
            <header className="dashboard-nav glass-panel">
                <button type="button" className="dashboard-brand dashboard-brand--button" onClick={() => setContent('home')}>
                    <span className="dashboard-brand__mark">IPL</span>
                    <span>
                        <strong>2025 Pulse</strong>
                        <small>Modern match intelligence</small>
                    </span>
                </button>
                <button
                    type="button"
                    className="dashboard-nav__toggle"
                    aria-expanded={isNavOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setIsNavOpen((prev) => !prev)}
                >
                    <span />
                    <span />
                    <span />
                </button>
                <div className={`dashboard-nav__panel ${isNavOpen ? 'is-open' : ''}`}>
                <nav className="dashboard-menu" aria-label="Dashboard sections">
                    <button type="button" className={content === 'schedule' ? 'active' : ''} onClick={() => setContent('schedule')}>Schedule</button>
                    <button type="button" className={content === 'points' ? 'active' : ''} onClick={() => setContent('points')}>Points Table</button>
                    <button type="button" className={content === 'predictions' ? 'active' : ''} onClick={() => setContent('predictions')}>Predictions</button>
                    <button type="button" className={content === 'betting' ? 'active' : ''} onClick={() => setContent('betting')}>Betting</button>
                </nav>
                <div className="dashboard-menu dashboard-menu--secondary">
                    <label className="season-select">
                        <span>Season</span>
                        <select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}>
                            {seasonOptions.map((season) => (
                                <option key={season.key} value={season.key}>
                                    {season.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="button" onClick={() => navigate("/")}>Logout</button>
                </div>
                </div>
            </header>

            {/* <section className="dashboard-hero glass-panel">
                <div>
                    <h1 className="section-title">Everything around IPL {selectedSeason}, in one sharper matchday view.</h1>
                    <p className="section-copy">
                        Move across fixtures, table momentum, AI-powered predictions, and betting actions with a
                        cleaner interface built for desktop and mobile.
                    </p>
                </div>
                <div className="dashboard-hero__stats">
                    <div className="stat-chip">
                        <strong>{schedule?.length || 0}</strong>
                        <span>Matches loaded</span>
                    </div>
                    <div className="stat-chip">
                        <strong>{pointsTable?.length || 0}</strong>
                        <span>Teams ranked</span>
                    </div>
                    <div className="stat-chip">
                        <strong>{presentMatches?.length || 0}</strong>
                        <span>Today's fixtures</span>
                    </div>
                </div>
            </section> */}

            <div className="dashboard-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default UserDashboard;
