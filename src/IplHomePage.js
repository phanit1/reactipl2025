import React from 'react';

const IplHomePage = ({ selectedSeason }) => {
    return (
        <section className="home-hero glass-panel">
            <div className="home-hero__copy">
                <span className="section-badge">Season Spotlight</span>
                <h2 className="section-title">IPL {selectedSeason}, redesigned like a live match broadcast.</h2>
                <p className="section-copy">
                    Follow the season with bolder visuals, richer match context, and a fresher fan dashboard built to
                    feel premium on every screen.
                </p>
                <div className="home-hero__metrics">
                    <div className="stat-chip">
                        <strong>High Tempo</strong>
                        <span>Fast navigation between fixtures and live context</span>
                    </div>
                    <div className="stat-chip">
                        <strong>Creative UI</strong>
                        <span>Glass surfaces, depth, and richer motion styling</span>
                    </div>
                </div>
            </div>
            <div className="home-hero__visual">
                <img
                    src='https://triprdx.com/wp-content/uploads/2025/03/IPL-2025-cover-final.jpg'
                    alt={`IPL ${selectedSeason}`}
                />
            </div>
        </section>
    );
};

export default IplHomePage;
