import React, { useState } from 'react';
import { Upload, DollarSign, BarChart2, Video, Settings, LogOut } from 'lucide-react';
import MovieFormModal from '../../components/admin/MovieFormModal'; // Reusing your modal
import './PartnerDashboard.css';

const PartnerDashboard = () => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    // Mock data for the dashboard
    const stats = {
        totalViews: "125,430",
        totalEarnings: "450,000 UM",
        pendingPayment: "50,000 UM",
        subscribers: "1,240"
    };

    const myContent = [
        { id: 1, title: "فيلم الصحراء", views: "12,000", earnings: "45,000 UM", date: "2024-12-01", status: "Active" },
        { id: 2, title: "رحلة إلى شنقيط", views: "8,500", earnings: "32,000 UM", date: "2024-12-15", status: "Active" },
        { id: 3, title: "موسيقى التقليدية", views: "4,000", earnings: "15,000 UM", date: "2025-01-05", status: "Review" }
    ];

    const handleUpload = (data) => {
        console.log("Upload data:", data);
        alert("تم رفع المحتوى للمراجعة!");
        setIsUploadOpen(false);
    };

    return (
        <div className="partner-dashboard">
            <aside className="partner-sidebar">
                <div className="partner-profile">
                    <div className="avatar">SA</div>
                    <h3>سيدي أحمد</h3>
                    <span>صانع محتوى</span>
                </div>
                <nav>
                    <a href="#" className="active"><BarChart2 size={20} /> لوحة التحكم</a>
                    <a href="#"><Video size={20} /> محتواي</a>
                    <a href="#"><DollarSign size={20} /> الأرباح</a>
                    <a href="#"><Settings size={20} /> الإعدادات</a>
                    <a href="#" className="logout"><LogOut size={20} /> تسجيل الخروج</a>
                </nav>
            </aside>

            <main className="partner-content">
                <header className="dashboard-header">
                    <h2>نظرة عامة</h2>
                    <button className="btn btn-primary" onClick={() => setIsUploadOpen(true)}>
                        <Upload size={18} /> رفع فيديو جديد
                    </button>
                </header>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="icon warning"><DollarSign size={24} /></div>
                        <div className="info">
                            <h3>الأرباح الكلية</h3>
                            <p>{stats.totalEarnings}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="icon primary"><BarChart2 size={24} /></div>
                        <div className="info">
                            <h3>المشاهدات</h3>
                            <p>{stats.totalViews}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="icon success"><DollarSign size={24} /></div>
                        <div className="info">
                            <h3>رصيد للسحب</h3>
                            <p>{stats.pendingPayment}</p>
                        </div>
                    </div>
                </div>

                <div className="content-table-section">
                    <h3>أحدث المحتوى</h3>
                    <table className="partner-table">
                        <thead>
                            <tr>
                                <th>العنوان</th>
                                <th>تاريخ النشر</th>
                                <th>المشاهدات</th>
                                <th>الأرباح المقدرة</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myContent.map(item => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.date}</td>
                                    <td>{item.views}</td>
                                    <td>{item.earnings}</td>
                                    <td>
                                        <span className={`status-badge ${item.status.toLowerCase()}`}>
                                            {item.status === 'Active' ? 'نشط' : 'قيد المراجعة'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Reusing common modal for consistency */}
            <MovieFormModal
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                onSave={handleUpload}
                type="movie" // Default to movie for now
            />
        </div>
    );
};

export default PartnerDashboard;
