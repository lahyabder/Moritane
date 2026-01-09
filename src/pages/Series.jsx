import React from 'react';
import { seriesMock } from '../data/mockData';
import MovieCard from '../components/MovieCard';

const Series = ({ onMovieClick }) => {
    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>المسلسلات</h1>
                <p style={{ color: '#a3a3a3' }}>مسلسلات موريتانية حصرية ومميزة</p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {seriesMock.map((item) => (
                    <MovieCard
                        key={item.id}
                        {...item}
                        type="landscape"
                        onClick={() => onMovieClick(item)}
                        style={{ width: '100%' }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Series;
