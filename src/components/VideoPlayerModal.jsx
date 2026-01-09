import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize, Rewind, FastForward } from 'lucide-react';
import Player from '@vimeo/player';
import './VideoPlayerModal.css';

const VideoPlayerModal = ({ movie, onClose }) => {
    const playerContainerRef = useRef(null);
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false); // Start false, auto-play will toggle
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const controlsTimeoutRef = useRef(null);

    // Extract Vimeo ID strictly
    const getVimeoId = (input) => {
        if (!input) return null;
        const urlString = typeof input === 'string' ? input : String(input);

        const patterns = [
            /(?:vimeo\.com\/|video\/)(\d+)/,
            /^(\d+)$/
        ];

        for (const pattern of patterns) {
            const match = urlString.match(pattern);
            if (match && match[1]) return match[1];
        }
        return null;
    };

    useEffect(() => {
        // Lock Scroll
        document.body.style.overflow = 'hidden';

        // Setup Player
        const videoId = getVimeoId(movie?.videoUrl || movie?.video_url || movie?.link || movie?.url);

        if (videoId && playerContainerRef.current) {
            const options = {
                id: videoId,
                autoplay: true,
                muted: false, // Try unmuted first
                controls: false, // HIDE DEFAULT VIMEO CONTROLS
                responsive: true,
                dnt: true // Do Not Track (Privacy)
            };

            playerRef.current = new Player(playerContainerRef.current, options);

            playerRef.current.ready().then(() => {
                // Auto-play might be blocked, so we catch errors
                playerRef.current.play().catch(error => {
                    console.warn("Autoplay blocked, muting and trying again", error);
                    playerRef.current.setVolume(0);
                    playerRef.current.play();
                    setIsMuted(true);
                });
            });

            // Listeners
            playerRef.current.on('play', () => setIsPlaying(true));
            playerRef.current.on('pause', () => setIsPlaying(false));
            playerRef.current.on('timeupdate', (data) => {
                setProgress((data.seconds / data.duration) * 100);
            });
            playerRef.current.on('loaded', () => {
                playerRef.current.getDuration().then(d => setDuration(d));
            });
            playerRef.current.on('volumechange', (data) => {
                setVolume(data.volume);
                setIsMuted(data.volume === 0);
            });
        }

        return () => {
            document.body.style.overflow = 'unset';
            if (playerRef.current) {
                playerRef.current.destroy().catch(() => { });
            }
        };
    }, [movie]);

    // Cleanup controls timeout
    useEffect(() => {
        return () => {
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        };
    }, []);

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) setShowControls(false);
        }, 3000);
    };

    const togglePlay = () => {
        if (isPlaying) playerRef.current.pause();
        else playerRef.current.play();
    };

    const toggleMute = () => {
        if (isMuted) {
            playerRef.current.setVolume(1);
            setIsMuted(false);
        } else {
            playerRef.current.setVolume(0);
            setIsMuted(true);
        }
    };

    const skipTime = (seconds) => {
        playerRef.current.getCurrentTime().then(current => {
            playerRef.current.setCurrentTime(current + seconds);
        });
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            playerContainerRef.current.requestFullscreen().catch(err => {
                console.warn("Error attempting to enable fullscreen:", err);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleClose = () => {
        document.body.style.overflow = 'unset';
        onClose();
    };

    if (!movie) return null;

    return (
        <div
            className="video-modal-overlay custom-player-wrapper"
            onMouseMove={handleMouseMove}
            onContextMenu={(e) => e.preventDefault()}
        >
            {/* 1. Vimeo Container */}
            <div ref={playerContainerRef} className="vimeo-embed-container"></div>

            {/* 2. Transparent Blocking Layer (Prevents ANY interaction with Vimeo Iframe) */}
            <div
                className="interaction-blocker"
                onClick={togglePlay} // Clicking video toggles play/pause
                onDoubleClick={toggleFullscreen}
            ></div>

            {/* 3. Custom Moritane Controls */}
            <div className={`moritane-controls ${showControls ? 'visible' : 'hidden'}`}>

                {/* Top Bar */}
                <div className="controls-top">
                    <div className="video-title">
                        <h2>{movie.title}</h2>
                        {isPlaying && <div className="live-indicator"></div>}
                    </div>
                    <button className="close-btn-custom" onClick={handleClose}>
                        <X size={28} />
                    </button>
                </div>

                {/* Center Play Button (Only when paused) */}
                {!isPlaying && (
                    <div className="center-play-btn" onClick={togglePlay}>
                        <Play size={64} fill="white" />
                    </div>
                )}

                {/* Bottom Bar */}
                <div className="controls-bottom">
                    {/* Progress Bar */}
                    <div className="progress-container" onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        playerRef.current.setCurrentTime(percent * duration);
                        e.stopPropagation();
                    }}>
                        <div className="progress-bar" style={{ width: `${progress}%` }}>
                            <div className="progress-knob"></div>
                        </div>
                    </div>

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
                            opacity: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}>
                            <img src="/logo_full.png" alt="" style={{ width: '80px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
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

                    <div className="controls-row">
                        <div className="controls-left">
                            <button onClick={togglePlay} className="control-btn">
                                {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
                            </button>
                            <button onClick={() => skipTime(-10)} className="control-btn">
                                <Rewind size={24} />
                            </button>
                            <button onClick={() => skipTime(10)} className="control-btn">
                                <FastForward size={24} />
                            </button>

                            <div className="volume-control">
                                <button onClick={toggleMute} className="control-btn">
                                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                                </button>
                                {/* Volume Slider could be added here */}
                            </div>

                            <span className="time-display">
                                {new Date(duration * (progress / 100) * 1000).toISOString().substr(14, 5)} /
                                {new Date(duration * 1000).toISOString().substr(14, 5)}
                            </span>
                        </div>

                        <div className="controls-right">
                            <img src="/logo_icon.png" alt="Moritane" className="player-logo" />
                            <button onClick={toggleFullscreen} className="control-btn">
                                {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Watermark (Always Visible) */}
            <div className="security-watermark">
                ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
        </div>
    );
};

export default VideoPlayerModal;
