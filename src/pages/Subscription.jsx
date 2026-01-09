import React, { useState } from 'react';
import { Check, Smartphone, CreditCard } from 'lucide-react';
import './Subscription.css';

const plans = [
    {
        id: 'free',
        name: 'مجاني',
        price: '0',
        currency: 'MRU',
        period: '/شهر',
        features: [
            'محتوى محدود',
            'دقة قياسية (SD)',
            'يحتوي على إعلانات',
            'جهاز واحد'
        ],
        recommended: false
    },
    {
        id: 'premium',
        name: 'بريميوم',
        price: '200',
        currency: 'MRU',
        period: '/شهر',
        features: [
            'وصول كامل للمحتوى',
            'دقة عالية (HD)',
            'بدون إعلانات',
            '3 أجهزة في وقت واحد',
            'تحميل للمشاهدة أوفلاين'
        ],
        recommended: true
    },
    {
        id: 'family',
        name: 'عائلي',
        price: '350',
        currency: 'MRU',
        period: '/شهر',
        features: [
            'كل مميزات البريميوم',
            'دقة فائقة (4K)',
            '5 أجهزة في وقت واحد',
            'حسابات منفصلة للأطفال'
        ],
        recommended: false
    }
];

const Subscription = () => {
    const [selectedPlan, setSelectedPlan] = useState('premium');
    const [step, setStep] = useState(1); // 1: Select Plan, 2: Payment
    const [paymentMethod, setPaymentMethod] = useState('bankily');

    const handleSubscribe = () => {
        setStep(2);
    };

    const handlePayment = (e) => {
        e.preventDefault();
        alert('تمت عملية الدفع بنجاح! شكراً لاشتراكك.');
        // In a real app, redirect or update user state here
        window.location.href = '/';
    };

    return (
        <div className="subscription-page">
            <div className="container">
                {step === 1 ? (
                    <>
                        <header className="subscription-header">
                            <h1>اختر الخطة المناسبة لك</h1>
                            <p>إلغاء الاشتراك في أي وقت. استمتع بأفضل المحتوى الموريتاني.</p>
                        </header>

                        <div className="plans-grid">
                            {plans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${plan.recommended ? 'recommended' : ''}`}
                                    onClick={() => setSelectedPlan(plan.id)}
                                >
                                    {plan.recommended && <div className="recommended-badge">الأكثر شيوعاً</div>}
                                    <h3>{plan.name}</h3>
                                    <div className="price">
                                        <span className="amount">{plan.price}</span>
                                        <span className="currency">{plan.currency}</span>
                                        <span className="period">{plan.period}</span>
                                    </div>
                                    <ul className="features-list">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx}>
                                                <Check size={16} className="check-icon" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className={`btn plan-btn ${selectedPlan === plan.id ? 'btn-primary' : 'btn-secondary'}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedPlan(plan.id);
                                            handleSubscribe();
                                        }}
                                    >
                                        {selectedPlan === plan.id ? 'واصل للدفع' : 'اختر هذه الخطة'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="payment-container">
                        <button className="back-btn" onClick={() => setStep(1)}>عودة للخطط</button>
                        <h2>إتمام الدفع</h2>
                        <div className="selected-plan-summary">
                            <p>أنت مشترك في خطة: <strong>{plans.find(p => p.id === selectedPlan)?.name}</strong></p>
                            <p className="total-price">{plans.find(p => p.id === selectedPlan)?.price} MRU / شهرياً</p>
                        </div>

                        <form onSubmit={handlePayment} className="payment-form">
                            <h3>اختر طريقة الدفع</h3>
                            <div className="payment-methods">
                                <div
                                    className={`payment-method ${paymentMethod === 'bankily' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('bankily')}
                                >
                                    <Smartphone size={24} />
                                    <span>بنكيلي / مصروفي</span>
                                </div>
                                <div
                                    className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('card')}
                                >
                                    <CreditCard size={24} />
                                    <span>بطاقة بنكية</span>
                                </div>
                            </div>

                            {paymentMethod === 'bankily' ? (
                                <div className="form-group">
                                    <label>رقم الهاتف</label>
                                    <input type="tel" placeholder="Ex: 22 22 22 22" required style={{ width: '100%', padding: '1rem', background: '#222', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                </div>
                            ) : (
                                <div className="credit-card-inputs">
                                    <div className="form-group">
                                        <label>رقم البطاقة</label>
                                        <input type="text" placeholder="0000 0000 0000 0000" required style={{ width: '100%', padding: '1rem', background: '#222', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label>تاريخ الانتهاء</label>
                                            <input type="text" placeholder="MM/YY" required style={{ width: '100%', padding: '1rem', background: '#222', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                        </div>
                                        <div className="form-group">
                                            <label>CVC</label>
                                            <input type="text" placeholder="123" required style={{ width: '100%', padding: '1rem', background: '#222', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary pay-btn">
                                دفع {plans.find(p => p.id === selectedPlan)?.price} MRU
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Subscription;
