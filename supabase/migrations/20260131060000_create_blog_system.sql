-- Create Blog Categories Table
CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content JSONB NOT NULL,
    featured_image TEXT,
    category_id UUID REFERENCES blog_categories(id),
    author_id UUID REFERENCES auth.users(id),
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Blog Tags Table
CREATE TABLE IF NOT EXISTS blog_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE
);

-- Create Junction Table for Posts and Tags
CREATE TABLE IF NOT EXISTS blog_post_tags (
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Enable RLS
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Categories
CREATE POLICY "Allow public read-only access to blog_categories" ON blog_categories
    FOR SELECT USING (true);
CREATE POLICY "Allow admin to manage blog_categories" ON blog_categories
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- RLS Policies for Posts
CREATE POLICY "Allow public read-only access to published blog_posts" ON blog_posts
    FOR SELECT USING (status = 'published');
CREATE POLICY "Allow admin to manage blog_posts" ON blog_posts
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- RLS Policies for Tags
CREATE POLICY "Allow public read-only access to blog_tags" ON blog_tags
    FOR SELECT USING (true);
CREATE POLICY "Allow admin to manage blog_tags" ON blog_tags
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- RLS Policies for Post-Tag Junction
CREATE POLICY "Allow public read-only access to blog_post_tags" ON blog_post_tags
    FOR SELECT USING (true);
CREATE POLICY "Allow admin to manage blog_post_tags" ON blog_post_tags
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
