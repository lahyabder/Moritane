import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Film, Tv, Radio, Users, Settings, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/logo.png" alt="Logo" style={{ height: '32px' }} />
                    <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'white' }}>
                        موريتان <span style={{ color: '#e50914', fontSize: '0.8em' }}>أدمن</span>
                    </h2>
                </div>
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
