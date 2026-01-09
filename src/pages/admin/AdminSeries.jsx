import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, Layers } from 'lucide-react';
import { api } from '../../services/api';
import MovieFormModal from '../../components/admin/MovieFormModal';

const AdminSeries = () => {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSeries, setEditingSeries] = useState(null);

    useEffect(() => {
        loadSeries();
    }, []);

    const loadSeries = async () => {
        try {
            const data = await api.getSeries();
            setSeries(data);
        } catch (error) {
            console.error("Failed to fetch series:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("هل أنت متأكد من حذف هذا المسلسل؟")) {
            try {
                await api.deleteSeries(id);
                setSeries(series.filter(s => s.id !== id));
            } catch (error) {
                console.error("Failed to delete series:", error);
                alert("فشل حذف المسلسل");
            }
        }
    };

    const handleEdit = (item) => {
        setEditingSeries(item);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingSeries(null);
        setIsModalOpen(true);
    };

    const handleSave = async (seriesData) => {
        try {
            if (editingSeries) {
                // Update existing
                const updated = await api.updateSeries(editingSeries.id, seriesData);
                setSeries(series.map(s => s.id === editingSeries.id ? updated : s));
            } else {
                // Create new
                const created = await api.createSeries(seriesData);
                setSeries([...series, created]);
            }
        } catch (error) {
            console.error("Failed to save series:", error);
            alert("فشل حفظ التغييرات");
        }
    };

    if (loading) return <div style={{ color: 'white', padding: '2rem' }}>جاري التحميل...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem' }}>إدارة المسلسلات</h1>
                <button className="btn btn-primary" onClick={handleAdd}>
                    <Plus size={18} />
                    إضافة مسلسل جديد
                </button>
            </div>

            {/* Filters Bar */}
            <div style={{ background: '#0f0f0f', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', color: '#666' }} />
                    <input
                        type="text"
                        placeholder="بحث عن مسلسل..."
                        style={{ width: '100%', padding: '0.6rem 2.5rem 0.6rem 1rem', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: 'white' }}
                    />
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '0 1rem', borderRadius: '6px' }}>
                    <Filter size={16} />
                    تصفية
                </button>
            </div>

            {/* Series Table */}
            <div style={{ background: '#0f0f0f', borderRadius: '12px', border: '1px solid #222', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                    <thead>
                        <tr style={{ background: '#1a1a1a', borderBottom: '1px solid #222' }}>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>المسلسل</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>المواسم</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>السنة</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>التقييم</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {series.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={item.image} alt={item.title} style={{ width: '40px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>ID: #{item.id}</div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Layers size={16} color="#666" />
                                        <span>{item.seasons}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>{item.year}</td>
                                <td style={{ padding: '1rem', color: '#eab308', fontWeight: 'bold' }}>{item.rating}</td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => handleEdit(item)}
                                            style={{ padding: '6px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            style={{ padding: '6px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <MovieFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingSeries}
                type="series"
            />
        </div>
    );
};
export default AdminSeries;
