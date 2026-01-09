import { createClient } from '@supabase/supabase-js';

// Hardcoded for the seeding script only
const url = 'https://hqsusilwuofzjiptanys.supabase.co';
// Using the ANON key which we know is working and has INSERT permission via RLS
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxc3VzaWx3dW9memppcHRhbnlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4ODk3NDUsImV4cCI6MjA4MzQ2NTc0NX0.DAaeZ4o22n9i8J7kcAZD8F9FWt73eV6-Jm_FBAHABSk';

const supabase = createClient(url, key);

const trendingMovies = [
    {
        title: "الصحراء الموريتانية",
        description: "رحلة وثائقية مذهلة تستكشف جمال وعمق الصحراء الموريتانية وحياة البدو.",
        image_url: "https://images.unsplash.com/photo-1549303503-455b803f268b?auto=format&fit=crop&q=80",
        video_url: "https://vimeo.com/76979871",
        year: 2024,
        rating: "4.8",
        category: "وثائقي",
        duration: "1h 30m",
        type: "movie",
        is_new: true
    },
    {
        title: "نواكشوط ليلاً",
        description: "دراما اجتماعية تدور أحداثها في أحياء العاصمة نواكشوط.",
        image_url: "https://images.unsplash.com/photo-1518600570419-869c3a2f8b5f?auto=format&fit=crop&q=80",
        video_url: "https://vimeo.com/76979871",
        year: 2023,
        rating: "4.5",
        category: "دراما",
        duration: "2h 00m",
        type: "movie",
        is_new: false
    },
    {
        title: "أصداء الرمال",
        description: "قصة ملهمة عن الموسيقى التقليدية وتأثيرها عبر الأجيال.",
        image_url: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80",
        video_url: "https://vimeo.com/76979871",
        year: 2024,
        rating: "4.9",
        category: "موسيقى",
        duration: "1h 45m",
        type: "movie",
        is_new: true
    },
    {
        title: "المسافر",
        description: "مغامرة مثيرة عبر المدن القديمة.",
        image_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80",
        video_url: "https://vimeo.com/76979871",
        year: 2023,
        rating: "4.2",
        category: "مغامرة",
        duration: "1h 50m",
        type: "movie",
        is_new: false
    }
];

const seriesMock = [
    {
        title: "ليالي الشتاء",
        description: "مسلسل درامي يحكي قصصاً من التراث الشعبي في فصل الشتاء.",
        image_url: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80",
        video_url: "https://vimeo.com/76979871",
        year: 2024,
        rating: "4.7",
        category: "دراما",
        type: "series",
        is_new: true
    },
    {
        title: "جيل المستقبل",
        description: "مسلسل شبابي يعالج قضايا العصر والتعليم.",
        image_url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80",
        video_url: "https://vimeo.com/76979871",
        year: 2023,
        rating: "4.4",
        category: "شبابي",
        type: "series",
        is_new: false
    }
];

async function seed() {
    console.log("🌱 Starting seed...");

    // Insert Movies
    const { error: moviesError } = await supabase.from('content').insert(trendingMovies);
    if (moviesError) console.error("Error inserting movies:", moviesError);
    else console.log("✅ Movies seeded");

    // Insert Series
    const { error: seriesError } = await supabase.from('content').insert(seriesMock);
    if (seriesError) console.error("Error inserting series:", seriesError);
    else console.log("✅ Series seeded");

    console.log("🏁 Done!");
}

seed();
