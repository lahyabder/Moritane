import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { Bell, Search, User } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div className="admin-search">
                        <Search size={20} className="search-icon" />
                        <input type="text" placeholder="بحث..." />
                    </div>

                    <div className="admin-header-actions">
                        <button className="icon-btn-admin">
                            <Bell size={20} />
                            <span className="badge">3</span>
                        </button>
                        <div className="admin-profile">
                            <div className="avatar">A</div>
                            <span>المدير</span>
                        </div>
                    </div>
                </header>

                <div className="admin-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
