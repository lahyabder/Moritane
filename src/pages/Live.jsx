import React, { useState, useEffect } from 'react';
import { Play, Radio, Signal, Info } from 'lucide-react';
import { api } from '../services/api';
import './Live.css'; // We'll create this for specific animations

const Live = () => {
    const [channels, setChannels] = useState([]);
    const [activeChannel, setActiveChannel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadChannels();
    }, []);

    const loadChannels = async () => {
        try {
            const data = await api.getLiveChannels();
            setChannels(data);
            if (data.length > 0) {
                setActiveChannel(data[0]); // Auto-play first channel
            }
        } catch (error) {
            console.error("Failed to load channels", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="live-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-night-blue)' }}>
            <div className="container">

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                    <div className="live-badge-pulse">
                        <Signal size={24} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>البث المباشر</h1>
                    <span style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>LIVE</span>
                </div>

                {/* Main Player Area */}
                <div className="live-player-container" style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    background: '#000',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    position: 'relative',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {activeChannel ? (
                        activeChannel.videoUrl.includes('youtube') || activeChannel.videoUrl.includes('youtu.be') ? (
                            <iframe
                                title={activeChannel.title}
                                src={activeChannel.videoUrl.replace("watch?v=", "embed/") + "?autoplay=1&mute=0"}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            // Generic iframe (Vimeo / HLS / Other)
                            <iframe
                                title={activeChannel.title}
                                src={activeChannel.videoUrl}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                            ></iframe>
                        )
                    ) : (
                        loading ? (
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                <div className="loader"></div>
                            </div>
                        ) : (
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                <Radio size={64} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                                <h3>لا توجد قنوات متاحة حالياً</h3>
                                <p>يتم تحديث القنوات بشكل دوري</p>
                            </div>
                        )
                    )}
                </div>

                {/* Channel Info */}
                {activeChannel && (
                    <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {activeChannel.title}
                            {activeChannel.category && <span style={{ fontSize: '0.8rem', background: 'var(--primary-orange)', padding: '2px 8px', borderRadius: '12px' }}>{activeChannel.category}</span>}
                        </h2>
                        <p style={{ color: '#a3a3a3', lineHeight: '1.6' }}>{activeChannel.description || 'بث مباشر عالي الجودة للقنوات الموريتانية.'}</p>
                    </div>
                )}

                {/* Channel List (Horizontal) */}
                <div style={{ marginTop: '3rem' }}>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Radio size={20} color="var(--primary-orange)" />
                        القنوات المتاحة
                    </h3>

                    {channels.length > 0 ? (
                        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }} className="channel-scroll">
                            {channels.map(channel => (
                                <div
                                    key={channel.id}
                                    onClick={() => setActiveChannel(channel)}
                                    style={{
                                        minWidth: '180px',
                                        cursor: 'pointer',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        background: activeChannel?.id === channel.id ? 'var(--primary-orange)' : '#1a1a1a',
                                        border: activeChannel?.id === channel.id ? '2px solid var(--primary-orange)' : '1px solid #333',
                                        transition: 'all 0.3s ease'
                                    }}
                                    className="channel-card"
                                >
                                    <div style={{ height: '100px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img
                                            src={channel.image}
                                            alt={channel.title}
                                            onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = channel.title[0]; e.target.parentElement.style.color = 'white'; e.target.parentElement.style.fontSize = '2rem'; }}
                                            style={{ maxHeight: '80%', maxWidth: '80%', objectFit: 'contain' }}
                                        />
                                    </div>
                                    <div style={{ padding: '0.8rem', textAlign: 'center' }}>
                                        <h4 style={{ fontSize: '0.9rem', color: activeChannel?.id === channel.id ? 'white' : '#ddd' }}>{channel.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !loading && (
                            <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                <Info size={24} style={{ marginBottom: '0.5rem', opacity: 0.7 }} />
                                <p style={{ color: '#888' }}>نعمل على إضافة القنوات إلى القائمة.</p>
                            </div>
                        )
                    )}
                </div>

            </div>
        </div>
    );
};

export default Live;
