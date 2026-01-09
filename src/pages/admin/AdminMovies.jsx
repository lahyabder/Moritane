import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { api } from '../../services/supabaseApi';
import MovieFormModal from '../../components/admin/MovieFormModal';

const AdminMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        try {
            const data = await api.getMovies();
            setMovies(data);
        } catch (error) {
            console.error("Failed to fetch movies:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("هل أنت متأكد من حذف هذا الفيلم؟")) {
            try {
                await api.deleteMovie(id);
                setMovies(movies.filter(m => m.id !== id));
            } catch (error) {
                console.error("Failed to delete movie:", error);
                alert("فشل حذف الفيلم");
            }
        }
    };

    const handleEdit = (movie) => {
        setEditingMovie(movie);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingMovie(null);
        setIsModalOpen(true);
    };

    const handleSave = async (movieData) => {
        try {
            if (editingMovie) {
                // Update existing
                const updated = await api.updateMovie(editingMovie.id, movieData);
                setMovies(movies.map(m => m.id === editingMovie.id ? updated : m));
            } else {
                // Create new
                // Assign a temporary ID if backend doesn't, but json-server usually does.
                // However, json-server uses incremental IDs if not provided, or uuid.
                const created = await api.createMovie(movieData);
                setMovies([...movies, created]);
            }
        } catch (error) {
            console.error("Failed to save movie:", error);
            alert("فشل حفظ التغييرات");
        }
    };

    if (loading) return <div style={{ color: 'white', padding: '2rem' }}>جاري التحميل...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem' }}>إدارة الأفلام</h1>
                <button className="btn btn-primary" onClick={handleAdd}>
                    <Plus size={18} />
                    إضافة فيلم جديد
                </button>
            </div>

            {/* Filters Bar */}
            <div style={{ background: '#0f0f0f', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', color: '#666' }} />
                    <input
                        type="text"
                        placeholder="بحث عن فيلم..."
                        style={{ width: '100%', padding: '0.6rem 2.5rem 0.6rem 1rem', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: 'white' }}
                    />
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '0 1rem', borderRadius: '6px' }}>
                    <Filter size={16} />
                    تصفية
                </button>
            </div>

            {/* Movies Table */}
            <div style={{ background: '#0f0f0f', borderRadius: '12px', border: '1px solid #222', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                    <thead>
                        <tr style={{ background: '#1a1a1a', borderBottom: '1px solid #222' }}>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>الفيلم</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>التصنيف</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>السنة</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>التقييم</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr key={movie.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={movie.image} alt={movie.title} style={{ width: '40px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{movie.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>ID: #{movie.id}</div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.9rem' }}>
                                        {movie.category}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>{movie.year}</td>
                                <td style={{ padding: '1rem', color: '#eab308', fontWeight: 'bold' }}>{movie.rating}</td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => handleEdit(movie)}
                                            style={{ padding: '6px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(movie.id)}
                                            style={{ padding: '6px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {movies.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>لا توجد أفلام</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <MovieFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingMovie}
                type="movie"
            />
        </div>
    );
};
export default AdminMovies;
