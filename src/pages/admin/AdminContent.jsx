import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, Film, Tv, PlayCircle, Theater, Baby } from 'lucide-react';
import { api, supabase } from '../../services/api';
import MovieFormModal from '../../components/admin/MovieFormModal';

const AdminContent = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [filterType, setFilterType] = useState('all'); // all, movie, series, show, theater, kids
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            setLoading(true);
            // Fetch everything from 'content' table
            const { data, error } = await supabase
                .from('content')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Map to app format
            const formattedData = data.map(item => ({
                id: item.id,
                title: item.title,
                description: item.description,
                image: item.image_url,
                videoUrl: item.video_url,
                year: item.year,
                rating: item.rating,
                category: item.category,
                type: item.type || 'movie',
                seasons: item.seasons,
                duration: item.duration,
                isNew: item.is_new
            }));

            setContent(formattedData);
        } catch (error) {
            console.error("Failed to fetch content:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("هل أنت متأكد من حذف هذا العمل؟")) {
            try {
                await api.deleteMovie(id); // Since it's all in the same table, deleteMovie works generically
                setContent(content.filter(i => i.id !== id));
            } catch (error) {
                console.error("Failed to delete:", error);
                alert("فشل الحذف");
            }
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleSave = async (formData) => {
        try {
            if (editingItem) {
                await api.updateMovie(editingItem.id, formData); // Generic update
            } else {
                await api.createMovie(formData); // Generic create
            }
            loadContent(); // Reload to get fresh data
        } catch (error) {
            console.error("Failed to save:", error);
            alert("فشل الحفظ");
        }
    };

    // Filter logic
    const filteredContent = content.filter(item => {
        const matchesType = filterType === 'all' || item.type === filterType;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    const getTypeIcon = (type) => {
        switch (type) {
            case 'movie': return <Film size={16} />;
            case 'series': return <Tv size={16} />;
            case 'show': return <PlayCircle size={16} />;
            case 'theater': return <Theater size={16} />;
            case 'kids': return <Baby size={16} />;
            default: return <Film size={16} />;
        }
    };

    const getTypeLabel = (type) => {
        const labels = {
            movie: 'فيلم',
            series: 'مسلسل',
            show: 'برنامج',
            documentary: 'وثائقي',
            theater: 'مسرحية',
            kids: 'أطفال',
            sports: 'رياضة',
            heritage: 'تراث',
            music: 'موسيقى'
        };
        return labels[type] || type;
    };

    if (loading) return <div style={{ color: 'white', padding: '2rem' }}>جاري التحميل...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem' }}>مكتبة المحتوى</h1>
                <button className="btn btn-primary" onClick={handleAdd}>
                    <Plus size={18} />
                    إضافة محتوى جديد
                </button>
            </div>

            {/* Filters Bar */}
            <div style={{ background: '#0f0f0f', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* Search */}
                <div style={{ position: 'relative', width: '100%' }}>
                    <Search size={18} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', color: '#666' }} />
                    <input
                        type="text"
                        placeholder="بحث بالاسم..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '0.8rem 2.5rem 0.8rem 1rem', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: 'white' }}
                    />
                </div>

                {/* Type Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '5px' }}>
                    {[
                        { id: 'all', label: 'الكل' },
                        { id: 'movie', label: 'أفلام' },
                        { id: 'series', label: 'مسلسلات' },
                        { id: 'show', label: 'برامج' },
                        { id: 'documentary', label: 'وثائقي' },
                        { id: 'theater', label: 'مسرحيات' },
                        { id: 'kids', label: 'أطفال' },
                        { id: 'sports', label: 'رياضة' },
                        { id: 'heritage', label: 'تراث' },
                        { id: 'music', label: 'موسيقى' },
                    ].map(type => (
                        <button
                            key={type.id}
                            onClick={() => setFilterType(type.id)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                background: filterType === type.id ? '#e50914' : '#1a1a1a',
                                color: 'white',
                                border: '1px solid #333',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Table */}
            <div style={{ background: '#0f0f0f', borderRadius: '12px', border: '1px solid #222', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                    <thead>
                        <tr style={{ background: '#1a1a1a', borderBottom: '1px solid #222' }}>
                            <th style={{ padding: '1rem', color: '#a3a3a3' }}>العنوان</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3' }}>النوع</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3' }}>السنة</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3' }}>الرابط</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3' }}>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContent.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={item.image} alt={item.title} style={{ width: '40px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>ID: #{item.id}</div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#222', width: 'fit-content', padding: '4px 8px', borderRadius: '4px' }}>
                                        {getTypeIcon(item.type)}
                                        <span style={{ fontSize: '0.9rem' }}>{getTypeLabel(item.type)}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>{item.year}</td>
                                <td style={{ padding: '1rem', direction: 'ltr', color: item.videoUrl ? '#4ade80' : '#ef4444', fontSize: '0.9rem' }}>
                                    {item.videoUrl ? '✅ Linked' : '❌ Missing'}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => handleEdit(item)} style={{ padding: '6px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} style={{ padding: '6px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredContent.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                                    لا توجد نتائج مطابقة
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <MovieFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingItem}
                type={editingItem?.type || "movie"} // Pass existing type or default
            />
        </div>
    );
};

export default AdminContent;
