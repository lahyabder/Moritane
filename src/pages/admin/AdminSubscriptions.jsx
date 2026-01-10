import React, { useState } from 'react';
import { Search, UserCheck, UserX, AlertCircle, Calendar, RefreshCcw, Clock } from 'lucide-react';

const AdminSubscriptions = () => {
    // Mock Data for demonstration
    const [subscribers, setSubscribers] = useState([
        { id: 1, name: 'محمد أحمد', email: 'mohamed@example.com', phone: '44556677', plan: 'Free Launch (6 Months)', status: 'active', joinDate: '2025-01-10', expiryDate: '2025-07-10' },
        { id: 2, name: 'فاطمة الزهراء', email: 'fatima@example.com', phone: '33445566', plan: 'Free Launch (6 Months)', status: 'pending', joinDate: '2025-01-11', expiryDate: '-' },
        { id: 3, name: 'سيدي عالي', email: 'sidi@example.com', phone: '22334455', plan: 'Free Launch (6 Months)', status: 'expired', joinDate: '2024-06-01', expiryDate: '2024-12-01' },
        { id: 4, name: 'زينب منت علي', email: 'zeineb@example.com', phone: '44112233', plan: 'Free Launch (6 Months)', status: 'pending', joinDate: '2025-01-11', expiryDate: '-' },
    ]);

    const [filter, setFilter] = useState('all'); // all, active, expired, pending
    const [search, setSearch] = useState('');

    const handleAction = (id, action) => {
        setSubscribers(subscribers.map(sub => {
            if (sub.id === id) {
                if (action === 'approve') {
                    // Calculate expiry date (6 months from now)
                    const date = new Date();
                    date.setMonth(date.getMonth() + 6);
                    const expiryDate = date.toISOString().split('T')[0];
                    return { ...sub, status: 'active', expiryDate: expiryDate };
                } else if (action === 'reject') {
                    return { ...sub, status: 'rejected' }; // Or remove it
                } else if (action === 'suspend') {
                    return { ...sub, status: 'suspended' };
                } else if (action === 'activate') {
                    return { ...sub, status: 'active' };
                }
            }
            return sub;
        }));
    };

    const filteredSubscribers = subscribers.filter(sub => {
        const matchesFilter = filter === 'all' || sub.status === filter;
        const matchesSearch = sub.name.includes(search) || sub.email.includes(search);
        return matchesFilter && matchesSearch;
    });

    return (
        <div style={{ padding: '2rem', color: 'white', direction: 'rtl' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>إدارة الاشتراكات</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={20} style={{ position: 'absolute', right: '10px', top: '10px', color: '#888' }} />
                        <input
                            type="text"
                            placeholder="بحث بالاسم أو البريد..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ padding: '0.7rem 2.5rem 0.7rem 1rem', borderRadius: '8px', border: '1px solid #333', background: '#1a1b26', color: 'white', minWidth: '300px' }}
                        />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: '#1e293b', padding: '1.2rem', borderRadius: '12px', border: '1px solid #334155' }}>
                    <h3 style={{ color: '#fbbf24', fontSize: '0.9rem', marginBottom: '0.5rem' }}>بانتظار الموافقة</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24' }}>
                        {subscribers.filter(s => s.status === 'pending').length}
                    </div>
                </div>
                <div style={{ background: '#1e293b', padding: '1.2rem', borderRadius: '12px', border: '1px solid #334155' }}>
                    <h3 style={{ color: '#4ade80', fontSize: '0.9rem', marginBottom: '0.5rem' }}>نشط حالياً</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4ade80' }}>
                        {subscribers.filter(s => s.status === 'active').length}
                    </div>
                </div>
                <div style={{ background: '#1e293b', padding: '1.2rem', borderRadius: '12px', border: '1px solid #334155' }}>
                    <h3 style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '0.5rem' }}>منتهي الصلاحية</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
                        {subscribers.filter(s => s.status === 'expired').length}
                    </div>
                </div>
                <div style={{ background: '#1e293b', padding: '1.2rem', borderRadius: '12px', border: '1px solid #334155' }}>
                    <h3 style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>إجمالي المسجلين</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{subscribers.length}</div>
                </div>
            </div>

            {/* Subscriptions Table */}
            <div style={{ background: '#1e293b', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                    <thead style={{ background: '#0f172a' }}>
                        <tr>
                            <th style={{ padding: '1rem', color: '#94a3b8' }}>المستخدم</th>
                            <th style={{ padding: '1rem', color: '#94a3b8' }}>الهاتف</th>
                            <th style={{ padding: '1rem', color: '#94a3b8' }}>خطة الاشتراك</th>
                            <th style={{ padding: '1rem', color: '#94a3b8' }}>تاريخ الطلب</th>
                            <th style={{ padding: '1rem', color: '#94a3b8' }}>تاريخ الانتهاء</th>
                            <th style={{ padding: '1rem', color: '#94a3b8' }}>الحالة</th>
                            <th style={{ padding: '1rem', color: '#94a3b8' }}>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubscribers.map((sub) => (
                            <tr key={sub.id} style={{ borderBottom: '1px solid #334155', background: sub.status === 'pending' ? 'rgba(251, 191, 36, 0.05)' : 'transparent' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 'bold' }}>{sub.name}</div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{sub.email}</div>
                                </td>
                                <td style={{ padding: '1rem', direction: 'ltr' }}>
                                    {sub.phone}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ background: 'rgba(246, 139, 45, 0.1)', color: '#f68b2d', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                                        {sub.plan}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>{sub.joinDate}</td>
                                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={16} color="#94a3b8" />
                                    {sub.expiryDate}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {sub.status === 'active' && <span style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><UserCheck size={16} /> نشط</span>}
                                    {sub.status === 'expired' && <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><AlertCircle size={16} /> منتهي</span>}
                                    {sub.status === 'pending' && <span style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={16} /> قيد المراجعة</span>}
                                    {sub.status === 'suspended' && <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><UserX size={16} /> معلق</span>}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {sub.status === 'pending' ? (
                                            <>
                                                <button
                                                    onClick={() => handleAction(sub.id, 'approve')}
                                                    style={{ background: '#4ade80', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                                >
                                                    قبول
                                                </button>
                                                <button
                                                    onClick={() => handleAction(sub.id, 'reject')}
                                                    style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}
                                                >
                                                    رفض
                                                </button>
                                            </>
                                        ) : sub.status === 'active' ? (
                                            <button
                                                onClick={() => handleAction(sub.id, 'suspend')}
                                                style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
                                            >
                                                تجميد
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleAction(sub.id, 'activate')}
                                                style={{ background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', border: '1px solid #4ade80', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
                                            >
                                                تنشيط
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminSubscriptions;
