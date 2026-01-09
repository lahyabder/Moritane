import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { X } from 'lucide-react';
import './VideoPlayerModal.css';

const VideoPlayerModal = ({ movie, onClose }) => {
    if (!movie) return null;

    // دالة ذكية لاستخراج رقم الفيديو من أي رابط أو كود
    const getVimeoId = (input) => {
        if (!input) return null;

        // Ensure input is a string
        const urlString = typeof input === 'string' ? input : String(input);


        // 1. البحث عن رقم فيديو في روابط vimeo.com
        // يشمل: vimeo.com/12345, vimeo.com/channels/staffpicks/12345, vimeo.com/manage/videos/12345
        const urlMatch = urlString.match(/vimeo\.com\/(?:channels\/[\w-]+\/|groups\/[\w-]+\/videos\/|video\/|manage\/videos\/|)(\d+)/);
        if (urlMatch && urlMatch[1]) return urlMatch[1];

        // 2. البحث عن رقم فيديو في روابط player.vimeo.com (مثل أكواد التضمين)
        const playerMatch = urlString.match(/player\.vimeo\.com\/video\/(\d+)/);
        if (playerMatch && playerMatch[1]) return playerMatch[1];

        // 3. محاولة أخيرة: البحث عن أي سلسلة أرقام طويلة (7 أرقام أو أكثر) قد تكون هي المعرف
        const broadMatch = urlString.match(/(\d{7,})/);
        return broadMatch ? broadMatch[0] : "76979999"; // العودة للفيديو الافتراضي في حالة الفشل التام
    };

    const targetUrl = movie.videoUrl || movie.video_url || movie.link || movie.url;
    const videoId = getVimeoId(targetUrl);
    // إذا لم نجد فيديو، نستخدم الافتراضي
    const finalVideoId = videoId || "76979871";

    // بناء رابط التضمين مع تفعيل التشغيل التلقائي وكتم الصوت (لتجاوز حظر المتصفحات)
    const embedUrl = `https://player.vimeo.com/video/${finalVideoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1`;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    // If no valid ID found, show error state instead of black screen
    if (!videoId) {
        return (
            <div className="video-modal-overlay">
                <button className="video-close-btn" onClick={() => {
                    document.body.style.overflow = 'unset'; // Force unlock
                    onClose();
                }} style={{ zIndex: 9999 }}>
                    <X size={32} />
                </button>
                <div style={{ color: 'white', textAlign: 'center', direction: 'ltr', maxWidth: '80%' }}>
                    <h2>⚠️ Video Error</h2>
                    <p>Could not extract Vimeo ID from URL:</p>
                    <code style={{ background: '#333', padding: '10px', display: 'block', margin: '10px 0', wordBreak: 'break-all' }}>
                        {movie.videoUrl || "No URL provided"}
                    </code>
                </div>
            </div>
        );
    }

    return (
        <div className="video-modal-overlay">
            <button className="video-close-btn" onClick={() => {
                document.body.style.overflow = 'unset'; // Force unlock
                onClose();
            }} style={{ zIndex: 9999 }}>
                <X size={32} />
            </button>

            {/* Container with Right-Click Protection */}
            <div className="video-container" onContextMenu={(e) => e.preventDefault()}>
                <iframe
                    src={embedUrl}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    title={movie.title}
                ></iframe>

                {/* Security Watermark System */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none', // Allows clicks to pass through to play/pause
                    zIndex: 2,
                    overflow: 'hidden'
                }}>
                    {/* Floating Brand Watermark */}
                    <div style={{
                        position: 'absolute',
                        top: '5%',
                        right: '5%',
                        opacity: 0.3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <img src="/logo.png" alt="" style={{ width: '30px', filter: 'grayscale(100%)' }} />
                        <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>MORITANE Protected</span>
                    </div>

                    {/* Random Position Floating ID (The 'Netflix' way to trace leakers) */}
                    <div style={{
                        position: 'absolute',
                        bottom: '10%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        opacity: 0.1,
                        fontSize: '12px',
                        color: 'white',
                        fontFamily: 'monospace'
                    }}>
                        ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </div>
                </div>
            </div>

            <div className="video-info-overlay" style={{ pointerEvents: 'none' }}>
                <h3>{movie.title}</h3>
                <span style={{ fontSize: '10px', opacity: 0.5 }}>Source: {movie.videoUrl?.substring(0, 30)}...</span>
            </div>
        </div>
    );
};

export default VideoPlayerModal;
