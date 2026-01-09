import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock login/signup logic
        onLogin({
            name: name || 'مستخدم',
            email: email
        });
        onClose();
    };

    return (
        <div className="auth-modal-overlay">
            <div className="auth-modal-content">
                <button className="auth-close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="auth-header">
                    <h2>{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h2>
                    <p>استمتع بمشاهدة أفضل المحتوى الموريتاني</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <div className="form-group">
                            <User size={18} className="input-icon" />
                            <input
                                type="text"
                                placeholder="الاسم الكامل"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <Mail size={18} className="input-icon" />
                        <input
                            type="email"
                            placeholder="البريد الإلكتروني"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <Lock size={18} className="input-icon" />
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary auth-submit-btn">
                        {isLogin ? 'دخول' : 'تسجيل'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
                        <button
                            className="toggle-auth-btn"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'سجل الآن' : 'سجل الدخول'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
