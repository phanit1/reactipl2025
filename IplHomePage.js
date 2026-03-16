import React from 'react';
import './IplHomePage.css';

const IplHomePage = () => {
    const season = localStorage.getItem("iplSeason") || "2026";
    return (
        <div className="home-hero">
            <h2>IPL {season}</h2>
            <p>Welcome to the IPL {season} Home Page.</p>
            <p>Explore the latest schedules, points table, and predictions.</p>
            <p>Stay tuned for every match day moment.</p>
            <img
                src='https://triprdx.com/wp-content/uploads/2025/03/IPL-2025-cover-final.jpg'
                alt={`IPL ${season}`}
                className="hero-image"
            />
        </div>
    );
};

export default IplHomePage;
