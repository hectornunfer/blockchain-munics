import React from 'react';
import '../styles/TopBarStyles.css';

const TopBar = () => {
    // Meteorology data placeholders
    const temperature = '9°C';
    const weatherDescription = 'Sunny|Rain|Cloudy';
    const location = 'City, Country';

    return (
        <div className="top-bar">
            <div className="weather-info">
                <span>Temperature: {temperature}</span>
                <span>Description: {weatherDescription}</span>
                <span>Location: {location}</span>
            </div>
        </div>
    );
};

export default TopBar;
