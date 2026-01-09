import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Film, Tv, Radio, Users, Settings, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <h2 className="sidebar-logo">موريتان <span>أدمن</span></h2>
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
