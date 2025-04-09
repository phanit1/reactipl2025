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


function UserDashboard() {
    const [content, setContent] = useState(''); // Default to IPL 2025 images
    const [schedule, setSchedule] = useState(null);
    const [pointsTable, setPointsTable] = useState(null);
    const [matches, setMatches] = useState([]);
    const [presentMatches, setPresentMatches] = useState([]);
    const navigate = useNavigate();


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
                return <IplSchedule schedule={schedule} />;
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

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand onClick={() => setContent('home')}>
                    {/* <img 
              src="https://bizacuity.com/wp-content/uploads/2022/12/BizAcuity-Logo-1.png" 
              style={{ width: '150px', height: '30px' }} 
              /> */}
              <span style={{padding:'5px', fontSize:'1rem'}}>IPL 2025</span>
                      </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => setContent('schedule')}>Schedule</Nav.Link>
                            <Nav.Link onClick={() => setContent('points')}>Points Table</Nav.Link>
                            <Nav.Link onClick={() => setContent('predictions')}>Predictions</Nav.Link>
                            <Nav.Link onClick={() => setContent('betting')}>Betting</Nav.Link>
                            <Nav.Link onClick={() => setContent('livescore')}>Live Score</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <Nav className=''>
                    <Nav.Link onClick={() => navigate("/")}>Logout</Nav.Link>
                </Nav>
            </Navbar>
            <Container className="mt-4">
                {renderContent()}
            </Container>
        </>
    );
}

export default UserDashboard;