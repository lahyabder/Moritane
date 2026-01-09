import { createClient } from '@supabase/supabase-js';

// Safe configuration for production
const supabaseUrl = 'https://hqsusilwuofzjiptanys.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxc3VzaWx3dW9memppcHRhbnlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4ODk3NDUsImV4cCI6MjA4MzQ2NTc0NX0.DAaeZ4o22n9i8J7kcAZD8F9FWt73eV6-Jm_FBAHABSk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to convert DB format to App format
const mapContent = (item) => ({
    id: item.id,
    title: item.title,
    description: item.description || '',
    image: item.image_url || 'https://via.placeholder.com/300x450?text=No+Image', // Fallback image
    videoUrl: item.video_url || '',
    year: item.year?.toString() || new Date().getFullYear().toString(),
    rating: item.rating || 'N/A',
    category: item.category || 'عام',
    duration: item.duration || '',
    isNew: item.is_new || false,
    seasons: item.seasons,
    type: item.type || 'movie'
});

export const api = {
    // Movies
    getMovies: async () => {
        try {
            console.log("Fetching movies from Supabase...");
            const { data, error } = await supabase
                .from('content')
                .select('*')
                .eq('type', 'movie')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Supabase Error (Movies):", error);
                return [];
            }
            console.log("Movies found:", data?.length);
            return data ? data.map(mapContent) : [];
        } catch (error) {
            console.error("Network Error (Movies):", error);
            return [];
        }
    },

    createMovie: async (movieData) => {
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

        const { data, error } = await supabase.from('content').insert([dbPayload]).select().single();
        if (error) {
            console.error("Create Movie Error:", error.message, error.details);
            throw error;
        }
        return mapContent(data);
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
        const { data, error } = await supabase.from('content').update(dbPayload).eq('id', id).select().single();
        if (error) {
            console.error("Update Movie Error:", error.message, error.details);
            throw error;
        }
        return mapContent(data);
    },

    deleteMovie: async (id) => {
        console.log("Attempting to delete movie:", id);
        const { error } = await supabase.from('content').delete().eq('id', id);
        if (error) {
            console.error("Delete Movie Error:", error.message, error.details);
            throw error;
        }
    },

    // Series
    getSeries: async () => {
        try {
            const { data, error } = await supabase
                .from('content')
                .select('*')
                .eq('type', 'series')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data ? data.map(mapContent) : [];
        } catch (error) {
            console.error("Error fetching series:", error);
            return [];
        }
    },

    createSeries: async (seriesData) => {
        const dbPayload = {
            title: seriesData.title,
            description: seriesData.description,
            image_url: seriesData.image,
            video_url: seriesData.videoUrl,
            year: parseInt(seriesData.year) || 2025,
            rating: seriesData.rating,
            category: seriesData.category,
            seasons: parseInt(seriesData.seasons) || 1, // Ensure int
            is_new: seriesData.isNew,
            type: 'series'
        };
        const { data, error } = await supabase.from('content').insert([dbPayload]).select().single();
        if (error) {
            console.error("Create Series Error:", error.message, error.details);
            throw error;
        }
        return mapContent(data);
    },

    updateSeries: async (id, seriesData) => {
        const dbPayload = {
            title: seriesData.title,
            description: seriesData.description,
            image_url: seriesData.image,
            video_url: seriesData.videoUrl,
            year: parseInt(seriesData.year),
            rating: seriesData.rating,
            category: seriesData.category,
            seasons: parseInt(seriesData.seasons),
            is_new: seriesData.isNew
        };
        const { data, error } = await supabase.from('content').update(dbPayload).eq('id', id).select().single();
        if (error) {
            console.error("Update Series Error:", error.message, error.details);
            throw error;
        }
        return mapContent(data);
    },

    deleteSeries: async (id) => {
        console.log("Attempting to delete series:", id);
        const { error } = await supabase.from('content').delete().eq('id', id);
        if (error) {
            console.error("Delete Series Error:", error.message, error.details);
            throw error;
        }
    },

    // Users
    getUsers: async () => {
        // Return empty until auth is fully linked to admin table
        return [];
    },

    deleteUser: async (id) => {
        return true;
    },

    // Live Channels
    getLiveChannels: async () => {
        return [];
    },

    getHeroContent: async () => {
        // Fetch the newest movie to be the Hero
        const movies = await api.getMovies();
        return movies.length > 0 ? movies[0] : null;
    }
};
