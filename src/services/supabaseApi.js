import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fallback mock data structure for seamless transition
import { trendingMovies, seriesMock } from '../data/mockData';

// Helper to convert DB format to App format if needed
const mapMovie = (item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.image_url, // DB column: image_url
    videoUrl: item.video_url, // DB column: video_url
    year: item.year?.toString() || new Date().getFullYear().toString(),
    rating: item.rating,
    category: item.category,
    duration: item.duration,
    isNew: item.is_new,
    type: item.type || 'movie'
});

export const api = {
    // Movies (Unified with Series in 'content' table for simplicity or separate 'movies' table)
    // We will use a unified 'content' table in Supabase

    getMovies: async () => {
        const { data, error } = await supabase
            .from('content')
            .select('*')
            .eq('type', 'movie');

        if (error || !data) {
            console.warn("Supabase Fetch Error (Movies):", error);
            return trendingMovies; // Fallback
        }
        return data.map(mapMovie);
    },

    getSeries: async () => {
        const { data, error } = await supabase
            .from('content')
            .select('*')
            .eq('type', 'series');

        if (error || !data) {
            console.warn("Supabase Fetch Error (Series):", error);
            return seriesMock; // Fallback
        }
        return data.map(mapMovie); // Reuse mapMovie for series too
    },

    createMovie: async (movieData) => {
        // Prepare data for DB
        const dbPayload = {
            title: movieData.title,
            description: movieData.description,
            image_url: movieData.image,
            video_url: movieData.videoUrl,
            year: parseInt(movieData.year) || 2025,
            rating: movieData.rating,
            category: movieData.category,
            duration: movieData.duration,
            is_new: movieData.isNew,
            type: 'movie'
        };

        const { data, error } = await supabase
            .from('content')
            .insert([dbPayload])
            .select()
            .single();

        if (error) throw error;
        return mapMovie(data);
    },

    updateMovie: async (id, movieData) => {
        const dbPayload = {
            title: movieData.title,
            description: movieData.description,
            image_url: movieData.image,
            video_url: movieData.videoUrl,
            year: parseInt(movieData.year),
            rating: movieData.rating,
            category: movieData.category,
            duration: movieData.duration,
            is_new: movieData.isNew
        };

        const { data, error } = await supabase
            .from('content')
            .update(dbPayload)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return mapMovie(data);
    },

    deleteMovie: async (id) => {
        const { error } = await supabase.from('content').delete().eq('id', id);
        if (error) throw error;
    },

    // Series (Reusing create/update logic but with type='series')
    createSeries: async (seriesData) => {
        const dbPayload = {
            title: seriesData.title,
            description: seriesData.description,
            image_url: seriesData.image,
            video_url: seriesData.videoUrl, // Optional for series parent
            year: parseInt(seriesData.year) || 2025,
            rating: seriesData.rating,
            category: seriesData.category,
            // duration: seriesData.duration, // Series usually dont have duration like movies
            is_new: seriesData.isNew,
            type: 'series'
        };

        const { data, error } = await supabase
            .from('content')
            .insert([dbPayload])
            .select()
            .single();

        if (error) throw error;
        return mapMovie(data);
    },

    updateSeries: async (id, seriesData) => {
        // Similar to updateMovie but generic
        const dbPayload = {
            title: seriesData.title,
            description: seriesData.description,
            image_url: seriesData.image,
            // ... other fields
            is_new: seriesData.isNew
        };
        // ... implementation similar to updateMovie
        // For simplicity in this step, we assume updateMovie handles both if ID is unique
        const { data, error } = await supabase
            .from('content')
            .update(dbPayload)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return mapMovie(data);
    },

    deleteSeries: async (id) => {
        const { error } = await supabase.from('content').delete().eq('id', id);
        if (error) throw error;
    }

    // ... Live Channels and Users will follow the same pattern
};
