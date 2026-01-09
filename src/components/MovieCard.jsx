import React from 'react';
import { Play, Star } from 'lucide-react';
import './MovieCard.css';

const MovieCard = ({ title, image, rating, year, isNew, type = 'portrait', onClick, className = '', style = {} }) => {
    return (
        <div className={`movie-card ${type} ${className}`} onClick={onClick} style={style}>
            <img
                src={image}
                alt={title}
                className="card-image"
                loading="lazy"
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(45deg, #1a1a1a, #2a2a2a)';
                    e.target.parentElement.classList.add('no-image');
                }}
            />
            {/* Fallback text if image fails */}
            <div className="fallback-title" style={{ display: 'none' }}>{title}</div>

            {isNew && <span className="card-badge">جديد</span>}

            <div className="play-icon-overlay">
                <Play fill="white" size={24} color="white" style={{ marginLeft: '2px' }} />
            </div>

            <div className="card-overlay">
                <h3 className="card-title">{title}</h3>
                <div className="card-meta">
                    <span>{year}</span>
                    <span>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Star size={12} fill="#fbbf24" stroke="none" />
                        <span className="rating">{rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
