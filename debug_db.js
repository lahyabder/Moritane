
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hqsusilwuofzjiptanys.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxc3VzaWx3dW9memppcHRhbnlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4ODk3NDUsImV4cCI6MjA4MzQ2NTc0NX0.DAaeZ4o22n9i8J7kcAZD8F9FWt73eV6-Jm_FBAHABSk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDB() {
    console.log("🔍 Checking Database Connection...");

    // 1. Try to read
    const { data, error } = await supabase.from('content').select('*');

    if (error) {
        console.error("❌ Error reading from DB:", error.message);
    } else {
        console.log(`✅ Connection Successful! Found ${data.length} items.`);
        if (data.length > 0) {
            console.log("Latest Item:", data[data.length - 1].title);
        } else {
            console.log("⚠️ Database is empty. The movie was NOT saved.");
        }
    }
}

checkDB();
