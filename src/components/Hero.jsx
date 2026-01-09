import React, { useState } from 'react';
import { Play, Info, Plus, Check } from 'lucide-react';
import './Hero.css';

const Hero = ({ movie, onMoreDetails, onPlay }) => {
    const [isAdded, setIsAdded] = useState(false);

    const toggleList = () => {
        setIsAdded(!isAdded);
    };

    return (
        <div className="hero">
            <div className="hero-bg">
                <img
                    src={movie?.image || "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=2600&auto=format&fit=crop"}
                    alt={movie?.title || "Desert Background"}
                />
                <div className="hero-overlay"></div>
            </div>

            <div className="container hero-content">
                <div className="hero-text">
                    <span className="badge">حصري 2025</span>
                    <h1 className="hero-title">{movie?.title || "أصوات الصحراء"}</h1>
                    <p className="hero-description">
                        {movie?.description || "رحلة موسيقية ملحمية عبر الكثبان الذهبية، نستكشف فيها أعمق الألحان الموريتانية الأصيلة وأجمل الأصوات التي تحكي قصص الصحراء والتراث العريق تحت ضوء النجوم."}
                    </p>

                    <div className="hero-meta">
                        <span>{movie?.rating || "9.8"} تقييم</span>
                        <span className="dot">•</span>
                        <span>{movie?.category || "وثائقي"}</span>
                        <span className="dot">•</span>
                        <span>موسيقى، ثقافة</span>
                    </div>

                    <div className="hero-actions">
                        <button className="btn btn-primary" onClick={onPlay}>
                            <Play className="btn-icon" fill="currentColor" />
                            تشغيل الآن
                        </button>
                        <button className="btn btn-secondary" onClick={toggleList}>
                            {isAdded ? <Check className="btn-icon" /> : <Plus className="btn-icon" />}
                            {isAdded ? 'في قائمتي' : 'قائمتي'}
                        </button>
                        <button className="btn btn-secondary" onClick={onMoreDetails} title="المزيد من التفاصيل">
                            <Info className="btn-icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
