import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <a href="/" className="footer-logo">موريتان</a>
                    <p>منصتك الأولى للمحتوى الموريتاني الأصيل. أفلام، مسلسلات، وبرامج وثائقية تعكس ثقافتنا وتراثنا.</p>
                    <div className="footer-social">
                        <a href="#" className="social-icon"><Facebook size={20} /></a>
                        <a href="#" className="social-icon"><Instagram size={20} /></a>
                        <a href="#" className="social-icon"><Twitter size={20} /></a>
                        <a href="#" className="social-icon"><Youtube size={20} /></a>
                    </div>
                </div>

                <div className="footer-column">
                    <h3>اكتشف</h3>
                    <ul className="footer-links">
                        <li><a href="#">أفلام جديدة</a></li>
                        <li><a href="#">مسلسلات حصرية</a></li>
                        <li><a href="#">وثائقيات</a></li>
                        <li><a href="#">البث المباشر</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>مساعدة</h3>
                    <ul className="footer-links">
                        <li><a href="#">الأسئلة الشائعة</a></li>
                        <li><a href="#">مركز المساعدة</a></li>
                        <li><a href="#">اتصل بنا</a></li>
                        <li><a href="#">شروط الاستخدام</a></li>
                        <li><a href="#">سياسة الخصوصية</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>حمل التطبيق</h3>
                    <p>استمتع بتجربة أفضل على هاتفك المحمول</p>
                    <div className="app-stores">
                        <button className="store-btn">
                            <span>App Store</span>
                        </button>
                        <button className="store-btn">
                            <span>Google Play</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} موريتان. جميع الحقوق محفوظة.</p>
            </div>
        </footer>
    );
};

export default Footer;
