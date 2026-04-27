-- Migration: Seed Pricing Plans
-- Date: 2026-02-04

INSERT INTO public.system_settings (key, value) VALUES 
('pricing_plans', '{
  "plans": [
    {
      "id": "explorer",
      "name": "Explorer",
      "monthlyPrice": 0,
      "quarterlyPrice": 0,
      "description": "Essential daily items.",
      "icon": "Brain",
      "color": "from-slate-400 to-slate-600",
      "isPopular": false,
      "badge": ""
    },
    {
      "id": "pro",
      "name": "Pro",
      "monthlyPrice": 5,
      "quarterlyPrice": 12,
      "description": "Full exam preparation.",
      "icon": "Zap",
      "color": "from-indigo-500 to-violet-600",
      "isPopular": true,
      "badge": "BETA UNLOCKED",
      "regionalPrices": {
        "INR": 499,
        "TRY": 199,
        "USD": 9.99
      }
    },
    {
      "id": "elite",
      "name": "Elite",
      "monthlyPrice": 10,
      "quarterlyPrice": 25,
      "description": "Support to enrollment.",
      "icon": "Sparkles",
      "color": "from-amber-400 to-orange-500",
      "isPopular": false,
      "badge": "ADMISSION PLUS",
      "regionalPrices": {
        "INR": 999,
        "TRY": 399,
        "USD": 19.99
      }
    }
  ],
  "comparison": [
    { "name": "Daily Questions", "explorer": "10-15", "pro": "Unlimited", "elite": "Unlimited" },
    { "name": "Practice Exams", "explorer": false, "pro": true, "elite": true },
    { "name": "Detailed Explanations", "explorer": true, "pro": true, "elite": true },
    { "name": "Mock Simulations", "explorer": false, "pro": true, "elite": true },
    { "name": "Learning Modules", "explorer": "Basic", "pro": "Complete", "elite": "Advanced" },
    { "name": "Exam Analytics", "explorer": "Basic", "pro": "Advanced", "elite": "Full" },
    { "name": "University Selection", "explorer": false, "pro": false, "elite": true },
    { "name": "Visa Support", "explorer": false, "pro": false, "elite": true },
    { "name": "Direct Consultant", "explorer": false, "pro": false, "elite": true },
    { "name": "Multi-Device", "explorer": true, "pro": true, "elite": true }
  ]
}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
