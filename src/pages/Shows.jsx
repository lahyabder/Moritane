import React from 'react';
import { seriesMock } from '../data/mockData'; // Reusing series mock for shows for now
import MovieCard from '../components/MovieCard';

const Shows = ({ onMovieClick }) => {
    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>البرامج التلفزيونية</h1>
                <p style={{ color: '#a3a3a3' }}>برامج حوارية، وثائقية، وترفيهية</p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '2rem'
            }}>
                {/* Placeholder Data */}
                {seriesMock.map((item, index) => (
                    <MovieCard
                        key={index}
                        {...item}
                        title={`برنامج ${index + 1}`}
                        category="برامج"
                        onClick={() => onMovieClick(item)}
                        style={{ width: '100%' }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Shows;
