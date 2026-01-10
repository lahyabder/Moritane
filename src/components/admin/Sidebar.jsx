import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Film, Tv, Radio, Users, Settings, LogOut, CreditCard } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="admin-sidebar">
            <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="/logo_full.png" alt="Logo" style={{ height: '45px', filter: 'drop-shadow(0 0 1px #ffffff) drop-shadow(0 0 3px rgba(255,255,255,0.2))' }} />
                <span style={{ fontSize: '0.9rem', color: '#F68B2D', fontWeight: 'bold', alignSelf: 'flex-end', marginBottom: '5px' }}>أدمن</span>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''}>
                            <LayoutDashboard size={20} />
                            <span>لوحة التحكم</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/content" className={({ isActive }) => isActive ? 'active' : ''}>
                            <Film size={20} />
                            <span>مكتبة المحتوى</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/live" className={({ isActive }) => isActive ? 'active' : ''}>
                            <Radio size={20} />
                            <span>البث المباشر</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>
                            <Users size={20} />
                            <span>المستخدمين</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/subscriptions" className={({ isActive }) => isActive ? 'active' : ''}>
                            <CreditCard size={20} />
                            <span>الاشتراكات</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/settings" className={({ isActive }) => isActive ? 'active' : ''}>
                            <Settings size={20} />
                            <span>الإعدادات</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn">
                    <LogOut size={20} />
                    <span>تسجيل الخروج</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
