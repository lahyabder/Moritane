-- 1. Enable RLS (Row Level Security) - this is good practice, but we'll make the policies open
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid conflicts (clean slate)
DROP POLICY IF EXISTS "Enable read access for all users" ON content;
DROP POLICY IF EXISTS "Enable insert for all users" ON content;
DROP POLICY IF EXISTS "Enable update for all users" ON content;
DROP POLICY IF EXISTS "Enable delete for all users" ON content;

DROP POLICY IF EXISTS "Enable read access for anon" ON content;
DROP POLICY IF EXISTS "Enable insert for anon" ON content;
DROP POLICY IF EXISTS "Enable update for anon" ON content;
DROP POLICY IF EXISTS "Enable delete for anon" ON content;

-- 3. Create PERMISSIVE policies for ALL operations (Select, Insert, Update, Delete)
-- This allows the Admin Dashboard to work fully without complex authentication setups for now.

-- Allow Reading (Everyone can see content)
CREATE POLICY "Enable read access for anon" ON content
FOR SELECT USING (true);

-- Allow Inserting (Adding new movies/series)
CREATE POLICY "Enable insert for anon" ON content
FOR INSERT WITH CHECK (true);

-- Allow Updating (Editing existing movies/series)
CREATE POLICY "Enable update for anon" ON content
FOR UPDATE USING (true);

-- Allow Deleting (Removing movies/series)
CREATE POLICY "Enable delete for anon" ON content
FOR DELETE USING (true);
