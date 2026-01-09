import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { X } from 'lucide-react';
import './VideoPlayerModal.css';

const VideoPlayerModal = ({ movie, onClose }) => {
    if (!movie) return null;

    // دالة ذكية لاستخراج رقم الفيديو من أي رابط أو كود
    const getVimeoId = (input) => {
        if (!input) return null;

        // 1. البحث عن رقم فيديو في روابط vimeo.com
        // يشمل: vimeo.com/12345, vimeo.com/channels/staffpicks/12345, vimeo.com/manage/videos/12345
        const urlMatch = input.match(/vimeo\.com\/(?:channels\/[\w-]+\/|groups\/[\w-]+\/videos\/|video\/|manage\/videos\/|)(\d+)/);
        if (urlMatch && urlMatch[1]) return urlMatch[1];

        // 2. البحث عن رقم فيديو في روابط player.vimeo.com (مثل أكواد التضمين)
        const playerMatch = input.match(/player\.vimeo\.com\/video\/(\d+)/);
        if (playerMatch && playerMatch[1]) return playerMatch[1];

        // 3. محاولة أخيرة: البحث عن أي سلسلة أرقام طويلة (7 أرقام أو أكثر) قد تكون هي المعرف
        const broadMatch = input.match(/(\d{7,})/);
        return broadMatch ? broadMatch[0] : "76979999"; // العودة للفيديو الافتراضي في حالة الفشل التام
    };

    const videoId = getVimeoId(movie.videoUrl);
    // إذا لم نجد فيديو، نستخدم الافتراضي
    const finalVideoId = videoId || "76979871";

    // بناء رابط التضمين مع تفعيل التشغيل التلقائي
    const embedUrl = `https://player.vimeo.com/video/${finalVideoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1`;

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
