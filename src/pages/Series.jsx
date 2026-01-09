import React from 'react';
import { api } from '../services/api';
import MovieCard from '../components/MovieCard';

const Series = ({ onMovieClick }) => {
    const [series, setSeries] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchSeries = async () => {
            try {
                const data = await api.getSeries();
                setSeries(data);
            } catch (error) {
                console.error("Failed to fetch series:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSeries();
    }, []);

    if (loading) return <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>جاري التحميل...</div>;

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>المسلسلات</h1>
                <p style={{ color: '#a3a3a3' }}>مسلسلات موريتانية حصرية ومميزة</p>
            </header>

            {series.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {series.map((item) => (
                        <MovieCard
                            key={item.id}
                            {...item}
                            type="landscape"
                            onClick={() => onMovieClick(item)}
                            style={{ width: '100%' }}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '4rem', color: '#666' }}>
                    <h3>لا توجد مسلسلات حالياً</h3>
                </div>
            )}
        </div>
    );
};

export default Series;
