import React, { useState, useEffect } from 'react';
import { MoreVertical, Search, CheckCircle, XCircle, Shield, Trash2 } from 'lucide-react';
import { api } from '../../services/api';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await api.getUsers();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
            try {
                await api.deleteUser(id);
                setUsers(users.filter(u => u.id !== id));
            } catch (error) {
                console.error("Failed to delete user:", error);
            }
        }
    };

    if (loading) return <div style={{ color: 'white' }}>جاري التحميل...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem' }}>إدارة المستخدمين</h1>
                <div style={{ background: '#1a1a1a', padding: '0.5rem 1rem', borderRadius: '8px', color: '#aaa', fontSize: '0.9rem' }}>
                    إجمالي المستخدمين: <span style={{ color: 'white', fontWeight: 'bold' }}>{users.length}</span>
                </div>
            </div>

            {/* Filters Bar */}
            <div style={{ background: '#0f0f0f', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', color: '#666' }} />
                    <input
                        type="text"
                        placeholder="بحث بالاسم أو البريد الإلكتروني..."
                        style={{ width: '100%', padding: '0.6rem 2.5rem 0.6rem 1rem', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: 'white' }}
                    />
                </div>
            </div>

            {/* Users Table */}
            <div style={{ background: '#0f0f0f', borderRadius: '12px', border: '1px solid #222', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                    <thead>
                        <tr style={{ background: '#1a1a1a', borderBottom: '1px solid #222' }}>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>المستخدم</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>الخطة</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>الصلاحية</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>الحالة</th>
                            <th style={{ padding: '1rem', color: '#a3a3a3', fontWeight: '500' }}>أجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontWeight: 'bold' }}>
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '500' }}>{user.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        background: user.plan === 'مجاني' ? 'rgba(255,255,255,0.05)' : 'rgba(234, 179, 8, 0.1)',
                                        color: user.plan === 'مجاني' ? '#aaa' : '#eab308',
                                        padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem'
                                    }}>
                                        {user.plan}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: user.role === 'أدمن' ? '#ef4444' : 'inherit' }}>
                                        {user.role === 'أدمن' && <Shield size={14} />}
                                        <span>{user.role}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: user.status === 'نشط' ? '#22c55e' : '#ef4444' }}>
                                        {user.status === 'نشط' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                        <span>{user.status}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        style={{ background: 'none', color: '#ef4444', padding: '4px' }}
                                        title="حذف المستخدم"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>لا يوجد مستخدمين</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
