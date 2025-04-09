import React from 'react';

const IplHomePage = () => {
    return (
        <div style={{ padding: '1rem', textAlign: 'center', marginTop: '-1rem',borderRadius: '8px', color: 'white' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>IPL 2025</h2>
            <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Welcome to the IPL 2025 Home Page!</p>
            <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Here you can find the latest updates, schedules, and more about the IPL 2025 season.</p>
            <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Stay tuned for exciting matches and thrilling moments!</p>
            <img 
                src='https://triprdx.com/wp-content/uploads/2025/03/IPL-2025-cover-final.jpg' 
                alt='IPL 2025' 
                style={{ width: '100%', maxWidth: '600px', height: 'auto', borderRadius: '8px' }} 
            />
        </div>
    );
};

export default IplHomePage;