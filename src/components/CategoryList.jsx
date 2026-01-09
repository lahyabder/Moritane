import React from 'react';
import './CategoryList.css';

const categories = [
    "الكل",
    "أفلام",
    "مسلسلات",
    "وثائقي",
    "دراما",
    "كوميديا",
    "موسيقى",
    "تراث",
    "رياضة",
    "للأطفال"
];

const CategoryList = ({ selectedCategory = "الكل", onSelectCategory }) => {
    return (
        <div className="category-list">
            <div className="category-track">
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => onSelectCategory && onSelectCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
