import React from 'react';
import { TrendingUp, Users, Eye, Film, Activity } from 'lucide-react';

const Dashboard = () => {
    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>لوحة التحكم</h1>

            {/* Stats Grid - Reset to 0 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="إجمالي المشاهدات" value="0" icon={<Eye color="#3b82f6" />} trend="--%" />
                <StatCard title="المستخدمين النشطين" value="0" icon={<Users color="#22c55e" />} trend="--%" />
                <StatCard title="الأفلام والمسلسلات" value="0" icon={<Film color="#a855f7" />} trend="--%" />
                <StatCard title="إيرادات الشهر" value="0 MRU" icon={<TrendingUp color="#eab308" />} trend="--%" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                {/* Main Chart Area Placeholder */}
                <div style={{ background: '#0f0f0f', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222', minHeight: '400px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3>إحصائيات المشاهدة</h3>
                        <select style={{ background: '#1f1f1f', border: '1px solid #333', color: 'white', padding: '5px 10px', borderRadius: '6px' }}>
                            <option>هذا الأسبوع</option>
                        </select>
                    </div>
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                        <p>لا توجد بيانات كافية لعرض الرسم البياني</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={{ background: '#0f0f0f', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Activity size={18} color="#dc2626" />
                        نشاط حديث
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#666' }}>
                        <p>لا يوجد نشاط حديث</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, trend }) => (
    <div style={{ background: '#0f0f0f', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ color: '#a3a3a3', fontSize: '0.9rem' }}>{title}</span>
            <div style={{ padding: '8px', background: '#1a1a1a', borderRadius: '8px' }}>{icon}</div>
        </div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{value}</h3>
        <span style={{ fontSize: '0.8rem', color: '#22c55e' }}>{trend} ارتفاع عن الشهر الماضي</span>
    </div>
);

export default Dashboard;
