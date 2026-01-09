import React from 'react';
import { api } from '../services/api';
import MovieCard from '../components/MovieCard';

const Movies = ({ onMovieClick }) => {
    const [movies, setMovies] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await api.getMovies();
                setMovies(data);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    if (loading) return <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>جاري التحميل...</div>;

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>الأفلام</h1>
                <p style={{ color: '#a3a3a3' }}>أحدث الأفلام الموريتانية والعالمية</p>
            </header>

            {movies.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '2rem'
                }}>
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            {...movie}
                            onClick={() => onMovieClick(movie)}
                            style={{ width: '100%' }}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '4rem', color: '#666' }}>
                    <h3>لا يوجد أفلام حالياً</h3>
                </div>
            )}
        </div>
    );
};

export default Movies;
