import React, { useState, useMemo, useEffect } from 'react';
import Hero from '../components/Hero';
import CategoryList from '../components/CategoryList';
import SectionRow from '../components/SectionRow';
import MovieCard from '../components/MovieCard';
import { api } from '../services/api';

const Home = ({ onMovieClick, onPlayClick }) => {
    const [selectedCategory, setSelectedCategory] = useState("الكل");
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [heroMovie, setHeroMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Initial data load
                const [moviesData, seriesData, heroData] = await Promise.all([
                    api.getMovies(),
                    api.getSeries(),
                    api.getHeroContent()
                ]);
                setTrendingMovies(moviesData);
                setSeries(seriesData);
                setHeroMovie(heroData);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const allContent = useMemo(() => [...trendingMovies, ...series], [trendingMovies, series]);

    const filteredContent = useMemo(() => {
        if (selectedCategory === "الكل") return allContent;
        return allContent.filter(item => item.category && item.category.includes(selectedCategory));
    }, [selectedCategory, allContent]);

    if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>جاري التحميل...</div>;

    return (
        <>
            {heroMovie && (
                <Hero
                    movie={heroMovie}
                    onMoreDetails={() => onMovieClick(heroMovie)}
                    onPlay={() => onPlayClick(heroMovie)}
                />
            )}

            {/* Content Sections - Pushing up slightly to overlap with hero gradient for seamless look */}
            <div style={{ position: 'relative', marginTop: '-100px', zIndex: 20 }}>
                <CategoryList
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                {selectedCategory === "الكل" ? (
                    <>
                        <SectionRow
                            title="الأكثر مشاهدة هذا الأسبوع"
                            items={trendingMovies}
                            onMovieClick={onMovieClick}
                        />
                        <SectionRow
                            title="مسلسلات موريتانية حصرية"
                            items={series}
                            cardType="landscape"
                            onMovieClick={onMovieClick}
                        />
                        <SectionRow
                            title="أفلام وثائقية"
                            items={trendingMovies.filter(m => m.category === 'وثائقي' || m.year === '2024')}
                            onMovieClick={onMovieClick}
                        />
                    </>
                ) : (
                    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', minHeight: '50vh' }}>
                        <h2 style={{ marginBottom: '2rem' }}>{selectedCategory}</h2>
                        {filteredContent.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
                                {filteredContent.map(item => (
                                    <MovieCard
                                        key={item.id}
                                        {...item}
                                        onClick={() => onMovieClick(item)}
                                        style={{ width: '100%' }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', color: '#666', marginTop: '3rem' }}>
                                <p>لا يوجد محتوى في هذا القسم حالياً</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
