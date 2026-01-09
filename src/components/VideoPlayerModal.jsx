import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { X } from 'lucide-react';
import './VideoPlayerModal.css';

const VideoPlayerModal = ({ movie, onClose }) => {
    if (!movie) return null;

    // Helper to safely extract Vimeo ID from any string
    const getVimeoId = (url) => {
        if (!url) return "76979871"; // Demo ID

        // Try to match just segments of digits, likely the ID
        const matches = url.match(/(\d{5,})/);
        return matches ? matches[0] : "76979871";
    };

    const videoId = getVimeoId(movie.videoUrl);
    const embedUrl = `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1`;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        <div className="video-modal-overlay">
            <button className="video-close-btn" onClick={onClose} style={{ zIndex: 9999 }}>
                <X size={32} />
            </button>

            <div className="video-container">
                <iframe
                    src={embedUrl}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    title={movie.title}
                ></iframe>
            </div>

            {/* Simple Overlay - ensure it doesn't block clicks */}
            <div className="video-info-overlay" style={{ pointerEvents: 'none' }}>
                <h3>{movie.title}</h3>
            </div>
        </div>
    );
};

export default VideoPlayerModal;
