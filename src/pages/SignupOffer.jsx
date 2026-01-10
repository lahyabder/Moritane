import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight, Check, Gift } from 'lucide-react';
import './SignupOffer.css';

const SignupOffer = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="signup-offer-page">
                <div className="success-overlay">
                    <div className="success-card">
                        <div className="success-icon-wrapper">
                            <Check size={40} strokeWidth={3} />
                        </div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'white' }}>تم استلام طلبك!</h2>
                        <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '2rem' }}>
                            شكراً لتسجيلك يا <strong>{formData.name}</strong>.<br />
                            طلبك للحصول على 6 أشهر مجانية قيد المراجعة الآن.<br />
                            سنقوم بتفعيل حسابك وإشعارك قريباً.
                        </p>
                        <Link to="/">
                            <button className="btn-submit" style={{ margin: 0 }}>
                                العودة للصفحة الرئيسية
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="signup-offer-page">
            <Link to="/subscription" style={{ position: 'absolute', top: '2rem', right: '2rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 10 }}>
                <ArrowRight size={20} />
                العودة للعرض
            </Link>

            <div className="signup-container">
                <div className="signup-header">
                    <div className="offer-badge">
                        <Gift size={16} />
                        عرض الإطلاق المجاني
                    </div>
                    <h2>أنشئ حسابك الجديد</h2>
                    <p>أدخل بياناتك لتفعيل اشتراكك الذهبي لمدة 6 أشهر</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>الاسم الكامل</label>
                        <div className="input-wrapper">
                            <User size={18} className="input-icon" />
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                placeholder="مثلاً: محمد أحمد"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>البريد الإلكتروني</label>
                        <div className="input-wrapper">
                            <Mail size={18} className="input-icon" />
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>رقم الهاتف</label>
                        <div className="input-wrapper">
                            <Phone size={18} className="input-icon" />
                            <input
                                type="tel"
                                name="phone"
                                className="form-input"
                                placeholder="مثلاً: 44556677"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>كلمة المرور</label>
                        <div className="input-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                name="password"
                                className="form-input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'جاري التسجيل...' : 'تفعيل العرض الآن'}
                    </button>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                        بالتسجيل أنت توافق على شروط الخدمة وسياسة الخصوصية
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupOffer;
