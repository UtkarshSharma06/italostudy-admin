-- Create the table for global ad campaigns
CREATE TABLE store_ad_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    placement_id TEXT NOT NULL UNIQUE,
    product_ids UUID[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE store_ad_campaigns ENABLE ROW LEVEL SECURITY;

-- Allow public read access (so the app can fetch active campaigns without needing a user session)
CREATE POLICY "Allow public read access to active ad campaigns" 
ON store_ad_campaigns FOR SELECT 
USING (is_active = true);

-- Allow authenticated admins to manage all campaigns
CREATE POLICY "Allow authenticated full access to ad campaigns" 
ON store_ad_campaigns FOR ALL 
USING (auth.role() = 'authenticated');

-- Create an trigger to automatically update the 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_store_ad_campaigns_updated_at
BEFORE UPDATE ON store_ad_campaigns
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
