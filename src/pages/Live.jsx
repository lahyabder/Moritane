import React from 'react';
import { Play } from 'lucide-react';

const Live = () => {
    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>البث المباشر</h1>
            <p style={{ color: '#a3a3a3', maxWidth: '500px', lineHeight: '1.6' }}>
                خدمة البث المباشر للقنوات الموريتانية ستتوفر قريباً على المنصة.
            </p>
        </div>
    );
};

export default Live;
