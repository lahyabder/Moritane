import React from 'react';
import { trendingMovies } from '../data/mockData';
import MovieCard from '../components/MovieCard';

const Movies = ({ onMovieClick }) => {
    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>الأفلام</h1>
                <p style={{ color: '#a3a3a3' }}>أحدث الأفلام الموريتانية والعالمية</p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '2rem'
            }}>
                {trendingMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        {...movie}
                        onClick={() => onMovieClick(movie)}
                        style={{ width: '100%' }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Movies;
