import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    const handleCategoryClick = (cat) => {
        if (cat === "أفلام") {
            navigate('/movies');
        } else if (cat === "مسلسلات") {
            navigate('/series');
        } else {
            if (onSelectCategory) {
                onSelectCategory(cat);
            }
        }
    };

    return (
        <div className="category-list">
            <div className="category-track">
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
