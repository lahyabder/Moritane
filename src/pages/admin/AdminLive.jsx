import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, PlayCircle, Signal } from 'lucide-react';

const mockChannels = [
    { id: 1, name: "الموريتانية", url: "https://.../stream1", status: "مباشر", viewers: 1200, category: "عام" },
    { id: 2, name: "الرياضية", url: "https://.../stream2", status: "مباشر", viewers: 3500, category: "رياضة" },
    { id: 3, name: "الثقافية", url: "https://.../stream3", status: "إيقاف", viewers: 0, category: "ثقافة" },
    { id: 4, name: "إذاعة القرآن", url: "https://.../stream4", status: "مباشر", viewers: 800, category: "دين" },
];

const AdminLive = () => {
    const [channels, setChannels] = useState(mockChannels);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem' }}>إدارة البث المباشر</h1>
                <button className="btn btn-primary">
                    <Plus size={18} />
                    إضافة قناة جديدة
                </button>
            </div>

            {/* Channels Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {channels.map((channel) => (
                    <div key={channel.id} style={{
                        background: '#0f0f0f',
                        borderRadius: '12px',
                        border: '1px solid #222',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            height: '160px',
                            background: '#1a1a1a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            {/* Mock Preview */}
                            <PlayCircle size={48} color="#333" />

                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: channel.status === 'مباشر' ? '#dc2626' : '#666',
                                color: 'white',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                {channel.status === "مباشر" && <span style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%', display: 'inline-block' }}></span>}
                                {channel.status}
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{channel.name}</h3>
                                    <span style={{ color: '#666', fontSize: '0.9rem' }}>{channel.category}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button style={{ padding: '8px', borderRadius: '6px', background: '#1a1a1a', color: '#a3a3a3', border: '1px solid #333' }}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button style={{ padding: '8px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a3a3a3', fontSize: '0.9rem' }}>
                                <Signal size={16} color={channel.status === 'مباشر' ? '#22c55e' : '#666'} />
                                <span>{channel.viewers} مشاهد حالياً</span>
                            </div>

                            <div style={{ marginTop: '1rem', background: '#1a1a1a', padding: '0.5rem', borderRadius: '6px', fontSize: '0.8rem', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {channel.url}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Card Placeholder */}
                <div style={{
                    border: '2px dashed #222',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '1rem',
                    minHeight: '200px',
                    cursor: 'pointer',
                    color: '#666',
                    transition: 'all 0.2s'
                }}
                    className="add-new-card-hover"
                >
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Plus size={24} />
                    </div>
                    <span>إضافة قناة جديدة</span>
                </div>
            </div>
        </div>
    );
};

export default AdminLive;
