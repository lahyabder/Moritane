import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import './MovieFormModal.css';

const MovieFormModal = ({ isOpen, onClose, onSave, initialData, type = 'movie' }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        videoUrl: '',
        type: type, // Initialize with prop type, but allow changing
        year: new Date().getFullYear().toString(),
        rating: '',
        category: '',
        duration: '',
        seasons: '',
        isNew: true
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: '',
                description: '',
                image: '',
                videoUrl: '',
                type: 'movie', // Default to movie for new
                year: new Date().getFullYear().toString(),
                rating: '',
                category: 'عام',
                duration: '',
                seasons: '1',
                isNew: true
            });
        }
    }, [initialData, type, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type: inputType, checked, files } = e.target;

        if (inputType === 'file') {
            if (files && files[0]) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setFormData(prev => ({ ...prev, [name]: event.target.result }));
                };
                reader.readAsDataURL(files[0]);
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: inputType === 'checkbox' ? checked : value
            }));
        }
    };

    const handleUrlChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="form-modal-content">
                <div className="form-modal-header">
                    <h2>{initialData ? 'تعديل المحتوى' : 'إضافة محتوى جديد'}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="admin-form">

                    {/* Content Type Selector - Only for new entries */}
                    {!initialData && (
                        <div className="form-group" style={{ marginBottom: '1.5rem', background: '#222', padding: '10px', borderRadius: '8px' }}>
                            <label style={{ color: '#4ade80' }}>نوع المحتوى</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', color: 'white', borderRadius: '4px' }}
                            >
                                <option value="movie">فيلم</option>
                                <option value="series">مسلسل</option>
                                <option value="show">برنامج</option>
                                <option value="documentary">وثائقي</option>
                                <option value="theater">مسرحية</option>
                                <option value="kids">أطفال</option>
                                <option value="sports">رياضة</option>
                                <option value="heritage">تراث</option>
                                <option value="music">موسيقى</option>
                            </select>
                        </div>
                    )}

                    {/* Image Upload / URL Section */}
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label>صورة الغلاف</label>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleUrlChange}
                                    placeholder="رابط الصورة (https://...)"
                                    style={{ marginBottom: '0.5rem', width: '100%' }}
                                />
                                <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                                    <button type="button" className="btn" style={{ background: '#333', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                                        أو رفع صورة من الجهاز
                                    </button>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        style={{ position: 'absolute', left: 0, top: 0, opacity: 0, cursor: 'pointer', height: '100%', width: '100%' }}
                                    />
                                </div>
                            </div>
                            {formData.image && (
                                <img src={formData.image} alt="Preview" style={{ width: '60px', height: '90px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #333' }} />
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>العنوان</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="اسم العمل الفني"
                            />
                        </div>
                        <div className="form-group">
                            <label>السنة</label>
                            <input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                placeholder="YYYY"
                            />
                        </div>
                    </div>

                    {/* Video URL Input */}
                    <div className="form-group">
                        <label>رابط الفيديو (Vimeo / YouTube / MP4)</label>
                        <input
                            type="text"
                            name="videoUrl"
                            value={formData.videoUrl}
                            onChange={handleChange}
                            placeholder="https://vimeo.com/..."
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>التقييم</label>
                            <input
                                type="text"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                placeholder="مثلاً 4.5"
                            />
                        </div>

                        <div className="form-group">
                            <label>التصنيف</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">اختر التصنيف</option>
                                <option value="أفلام">أفلام</option>
                                <option value="مسلسلات">مسلسلات</option>
                                <option value="وثائقي">وثائقي</option>
                                <option value="دراما">دراما</option>
                                <option value="كوميديا">كوميديا</option>
                                <option value="موسيقى">موسيقى</option>
                                <option value="تراث">تراث</option>
                                <option value="رياضة">رياضة</option>
                                <option value="للأطفال">للأطفال</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-row">
                            {/* Only show Duration for movies and theatre */}
                            {(formData.type === 'movie' || formData.type === 'theater') && (
                                <div className="form-group">
                                    <label>المدة</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        placeholder="مثلاً 1h 30m"
                                    />
                                </div>
                            )}

                            {/* Only show Seasons for series and shows */}
                            {(formData.type === 'series' || formData.type === 'show') && (
                                <div className="form-group">
                                    <label>عدد المواسم</label>
                                    <input
                                        type="text"
                                        name="seasons"
                                        value={formData.seasons}
                                        onChange={handleChange}
                                        placeholder="مثلاً 2 مواسم"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>الوصف</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="وصف مختصر للعمل..."
                        ></textarea>
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="isNew"
                                checked={formData.isNew}
                                onChange={handleChange}
                            />
                            عرض كـ "جديد"
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>إلغاء</button>
                        <button type="submit" className="btn btn-primary">
                            <Save size={18} />
                            حفظ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MovieFormModal;
