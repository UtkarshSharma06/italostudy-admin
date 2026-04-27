-- ==========================================
-- ITALOSTUDY STORE SCHEMA
-- ==========================================

-- 1. Store Categories
CREATE TABLE IF NOT EXISTS public.store_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT, -- Lucide icon name
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Store Products
CREATE TABLE IF NOT EXISTS public.store_products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    discount_price DECIMAL(10,2),
    currency TEXT DEFAULT 'EUR', -- 'EUR' or 'INR'
    stock_quantity INTEGER DEFAULT -1, -- -1 for unlimited (digital)
    type TEXT CHECK (type IN ('digital', 'physical')) NOT NULL,
    category_id UUID REFERENCES public.store_categories(id),
    images TEXT[] DEFAULT '{}', -- URLs to images
    file_url TEXT, -- For digital downloads (Supabase Storage path)
    is_active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}', -- For variants, weight, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Store Orders
CREATE TABLE IF NOT EXISTS public.store_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    status TEXT CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
    shipping_address JSONB DEFAULT '{}',
    tracking_number TEXT,
    payment_intent_id TEXT, -- Stripe/Razorpay reference
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Store Order Items
CREATE TABLE IF NOT EXISTS public.store_order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.store_orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.store_products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE public.store_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_order_items ENABLE ROW LEVEL SECURITY;

-- Categories
CREATE POLICY "Public Categories Access" ON public.store_categories FOR SELECT USING (true);
CREATE POLICY "Admin Categories Management" ON public.store_categories FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'sub_admin'))
);

-- Products
CREATE POLICY "Public Products Access" ON public.store_products FOR SELECT USING (is_active = true);
CREATE POLICY "Admin Products Management" ON public.store_products FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'sub_admin'))
);

-- Orders (Users see their own, Admins see all)
CREATE POLICY "User Orders Access" ON public.store_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin Orders Access" ON public.store_orders FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'sub_admin'))
);

-- Order Items
CREATE POLICY "User Order Items Access" ON public.store_order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM store_orders WHERE id = order_id AND user_id = auth.uid())
);
CREATE POLICY "Admin Order Items Access" ON public.store_order_items FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'sub_admin'))
);

-- ==========================================
-- TRIGGERS
-- ==========================================

CREATE TRIGGER set_store_products_updated_at BEFORE UPDATE ON public.store_products FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_store_orders_updated_at BEFORE UPDATE ON public.store_orders FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==========================================
-- DYNAMIC LAYOUT TABLES
-- ==========================================

-- 5. Store Banners (Hero slider managed by admin)
CREATE TABLE IF NOT EXISTS public.store_banners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,
    badge_text TEXT,           -- e.g. "NEW", "HOT"
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Store Home Sections (Category rows/sections on homepage)
CREATE TABLE IF NOT EXISTS public.store_home_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,              -- e.g. "Best IMAT Guides", "TIL Exam Books"
    subtitle TEXT,                    -- Optional subtitle shown below title
    category_id UUID REFERENCES public.store_categories(id) ON DELETE SET NULL,
    section_type TEXT CHECK (section_type IN ('scroll', 'grid', 'hero_grid')) DEFAULT 'scroll',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for Banners
ALTER TABLE public.store_banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Banners Access" ON public.store_banners FOR SELECT USING (is_active = true);
CREATE POLICY "Admin Banners Management" ON public.store_banners FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'sub_admin'))
);

-- RLS for Home Sections
ALTER TABLE public.store_home_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Sections Access" ON public.store_home_sections FOR SELECT USING (is_active = true);
CREATE POLICY "Admin Sections Management" ON public.store_home_sections FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'sub_admin'))
);

