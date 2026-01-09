import React, { useState } from 'react';
import { Check, Shield, DollarSign, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PartnerRegistration.css';

const PartnerRegistration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [agreed, setAgreed] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        contentCategory: 'movies',
        bankName: '',
        accountNumber: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContractSubmit = (e) => {
        e.preventDefault();
        if (agreed) setStep(2);
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        // Here you would send data to API
        alert("تم استلام طلبك بنجاح! سيتم مراجعة المحتوى وتفعيل حسابك قريباً.");
        navigate('/partner/dashboard'); // Redirect to dashboard preview
    };

    return (
        <div className="partner-page">
            <div className="partner-container">
                <header className="partner-header">
                    <h1>برنامج شركاء موريتان</h1>
                    <p>شارك إبداعك، وحقق دخلاً مادياً من محتواك</p>
                </header>

                <div className="steps-indicator">
                    <div className={`step ${step >= 1 ? 'active' : ''}`}>١. الشروط والعقد</div>
                    <div className="line"></div>
                    <div className={`step ${step >= 2 ? 'active' : ''}`}>٢. بيانات الشريك</div>
                </div>

                {step === 1 && (
                    <div className="contract-box">
                        <div className="contract-content">
                            <h3>عقد الشراكة وتوزيع الأرباح</h3>
                            <p><strong>الطرف الأول:</strong> منصة موريتان (Moritane Platform)</p>
                            <p><strong>الطرف الثاني:</strong> صانع المحتوى (أنت)</p>

                            <h4>١. حقوق الملكية الفكرية</h4>
                            <p>يحتفظ صانع المحتوى بكامل حقوق الملكية الفكرية لأعماله. يمنح الطرف الثاني المنصة ترخيصاً غير حصري لعرض المحتوى للمستخدمين في جميع أنحاء العالم.</p>

                            <h4>٢. نسبة الأرباح وتوزيع الدخل</h4>
                            <p>يتم توزيع صافي العائدات (بعد خصم الضرائب ورسوم التشغيل) كالتالي:</p>
                            <ul>
                                <li><strong>٧٠٪ (70%)</strong> لصانع المحتوى.</li>
                                <li><strong>٣٠٪ (30%)</strong> للمنصة مقابل الاستضافة والتسويق والدعم التقني.</li>
                            </ul>

                            <h4>٣. آلية الدفع</h4>
                            <p>يتم تحويل الأرباح شهرياً عندما يتجاوز الرصيد الحد الأدنى (20,000 أوقية). يتم الدفع عبر التحويل البنكي أو Paypal.</p>

                            <h4>٤. شروط المحتوى</h4>
                            <p>يلتزم الشريك بعدم نشر أي محتوى يخالف القوانين الموريتانية، أو ينتهك حقوق الآخرين، أو يحتوي على عنف أو كراهية.</p>

                            <h4>٥. مدة العقد</h4>
                            <p>هذا العقد ساري المفعول من تاريخ الموافقة عليه، ويمكن لأي طرف إنهاؤه بإشعار مدته 30 يوماً.</p>
                        </div>

                        <form onSubmit={handleContractSubmit} className="agreement-form">
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    required
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />
                                <span className="checkmark"></span>
                                لقد قرأت بنود العقد أعلاه وأوافق عليها بصفتي المالك الحصري للمحتوى.
                            </label>
                            <button type="submit" className="btn btn-primary btn-block" disabled={!agreed}>
                                الموافقة والمتابعة
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <form onSubmit={handleFinalSubmit} className="registration-form">
                        <div className="form-section">
                            <h3><Shield size={20} /> البيانات الشخصية</h3>
                            <div className="input-group">
                                <label>الاسم الكامل (كما في الهوية)</label>
                                <input type="text" name="fullName" required onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label>البريد الإلكتروني</label>
                                <input type="email" name="email" required onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label>رقم الهاتف</label>
                                <input type="tel" name="phone" required onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label>نوع المحتوى</label>
                                <select name="contentCategory" onChange={handleChange}>
                                    <option value="movies">أفلام قصيرة / طويلة</option>
                                    <option value="series">مسلسلات</option>
                                    <option value="documentary">وثائقيات</option>
                                    <option value="vlog">فلوقات / محتوى إبداعي</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3><DollarSign size={20} /> بيانات استلام الأرباح</h3>
                            <div className="input-group">
                                <label>اسم البنك / طريقة الدفع</label>
                                <input type="text" name="bankName" placeholder="مثلاً: بنكيلي، سوسيتيه جنرال..." required onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label>رقم الحساب (RIB) أو رقم الهاتف</label>
                                <input type="text" name="accountNumber" required onChange={handleChange} />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-gold btn-block">
                            إنشاء الحساب وتوقيع العقد
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PartnerRegistration;
