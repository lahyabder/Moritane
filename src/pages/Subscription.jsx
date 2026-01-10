import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Subscription.css';
import { Check, Clock } from 'lucide-react';

const Subscription = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Set deadline to 6 months from now
    const calculateTimeLeft = () => {
        // Hardcoded date for demo: 6 months from launch (approx June 2026)
        // Or dynamic: new Date().setMonth(new Date().getMonth() + 6)
        const difference = +new Date('2026-06-30') - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const plans = [
        {
            id: 'free_launch',
            name: 'عرض الإطلاق',
            price: 'مجاناً',
            period: 'لمدة 6 أشهر',
            features: [
                'وصول كامل لكل المحتوى',
                'جودة عالية FHD & 4K',
                'بدون أي إعلانات'
            ],
            buttonText: 'احصل على العرض الآن',
            active: true,
            highlight: true,
            badge: 'لفترة محدودة'
        }
    ];

    return (
        <div className="subscription-page">
            <div className="container">
                <div className="sub-header">
                    <div className="offer-timer">
                        <span className="timer-label">ينتهي العرض المجاني خلال:</span>
                        <div className="timer-digits">
                            <div className="time-unit">
                                <span className="number">{timeLeft.seconds || 0}</span>
                                <span className="label">ثانية</span>
                            </div>
                            <span className="colon">:</span>
                            <div className="time-unit">
                                <span className="number">{timeLeft.minutes || 0}</span>
                                <span className="label">دقيقة</span>
                            </div>
                            <span className="colon">:</span>
                            <div className="time-unit">
                                <span className="number">{timeLeft.hours || 0}</span>
                                <span className="label">ساعة</span>
                            </div>
                            <span className="colon">:</span>
                            <div className="time-unit">
                                <span className="number">{timeLeft.days || 180}</span>
                                <span className="label">يوم</span>
                            </div>
                        </div>
                    </div>

                    <h1>استمتع بـ 6 أشهر مجانية!</h1>
                    <p>احتفالاً بإطلاق منصة موريتان، نقدم لك اشتراكاً ذهبياً مجانياً بالكامل.</p>
                </div>

                <div className="plans-grid single-plan">
                    {plans.map((plan) => (
                        <div key={plan.id} className={`plan-card ${plan.highlight ? 'highlighted' : ''}`}>
                            {plan.badge && <div className="plan-badge"><Clock size={16} style={{ marginRight: 5 }} /> {plan.badge}</div>}
                            <div className="plan-header">
                                <h3>{plan.name}</h3>
                                <div className="plan-price">
                                    <span className="amount" style={{ color: '#4ade80' }}>{plan.price}</span>
                                </div>
                                <span className="period">{plan.period}</span>
                            </div>

                            <ul className="plan-features">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <Check size={18} className="check-icon" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link to="/signup-offer">
                                <button className="btn-plan btn-primary pulse-anim">
                                    {plan.buttonText}
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Subscription;
