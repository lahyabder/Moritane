import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import './SectionRow.css';

const SectionRow = ({ title, items, cardType = 'portrait', onMovieClick }) => {
    const rowRef = useRef(null);

    const scroll = (direction) => {
        const { current } = rowRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -500 : 500;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="section-row">
            <div className="section-header">
                <h2 className="section-title">{title}</h2>
                <a href="#" className="see-more">عرض الكل</a>
            </div>

            <div style={{ position: 'relative' }}>
                <button className="scroll-btn scroll-right" onClick={() => scroll('right')}>
                    <ChevronRight />
                </button>

                <div className="row-container" ref={rowRef}>
                    {items.map((item, index) => (
                        <MovieCard
                            key={index}
                            {...item}
                            type={cardType}
                            onClick={() => onMovieClick && onMovieClick(item)}
                        />
                    ))}
                </div>

                <button className="scroll-btn scroll-left" onClick={() => scroll('left')}>
                    <ChevronLeft />
                </button>
            </div>
        </div>
    );
};

export default SectionRow;
