import React, { useState, useEffect } from 'react';
import { X, Play, Plus, ThumbsUp, Check } from 'lucide-react';
import './DetailsModal.css';

const DetailsModal = ({ movie, onClose, onPlay }) => {
    const [isAdded, setIsAdded] = useState(false);

    if (!movie) return null;

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Handle background click
    const handleBackdropClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-hero">
                    <img
                        src={movie.image || movie.poster}
                        alt={movie.title}
                        className="modal-image"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.style.background = 'linear-gradient(45deg, #111, #333)';
                        }}
                    />
                    <div className="modal-hero-overlay"></div>
                </div>

                <div className="modal-details">
                    <h2 className="modal-title">{movie.title}</h2>

                    <div className="modal-meta">
                        <span className="match-score">98% تطابق</span>
                        <span>{movie.year || '2024'}</span>
                        <span style={{ border: '1px solid #aaa', padding: '0 5px', fontSize: '0.8rem' }}>16+</span>
                        <span>{movie.duration || 'ساعتان و 15 دقيقة'}</span>
                        <span>HD</span>
                    </div>

                    <p className="modal-description">
                        {movie.description || 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.'}
                    </p>

                    <div className="modal-actions">
                        <button className="btn btn-primary" onClick={onPlay}>
                            <Play fill="currentColor" size={20} />
                            <span>تشغيل</span>
                        </button>
                        <button
                            className="btn btn-secondary"
                            style={{ padding: '0.75rem', color: isAdded ? '#22c55e' : 'white' }}
                            onClick={() => setIsAdded(!isAdded)}
                            title={isAdded ? "إزالة من قائمتي" : "إضافة إلى قائمتي"}
                        >
                            {isAdded ? <Check size={24} /> : <Plus size={24} />}
                        </button>
                        <button className="btn btn-secondary" style={{ padding: '0.75rem' }}>
                            <ThumbsUp size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsModal;
