# Supabase Edge Function Deployment Guide

Follow these steps to deploy your payment functions to production.

## Prerequisites
You need the Supabase CLI. If you don't have it, you can run it via `npx` without installing globally:

**Option A: Using npx (Recommended)**
Use `npx supabase` instead of `supabase` in all commands below.

**Option B: Global Installation**
```bash
npm install -g supabase
```

### 1. Link your Project
Run this to link your local folder to your Supabase project:
```bash
npx supabase link --project-ref jyjhpqtqbwtxxgijxetq
```

### 2. Deploy the Function
Run the following command to deploy the Cashfree order creation function:
```bash
npx supabase functions deploy create-cashfree-order --project-ref jyjhpqtqbwtxxgijxetq
```

### 3. Verify Secrets
Your Edge Function uses the `SUPABASE_SERVICE_ROLE_KEY` to access your database settings. This should be automatically available in the Supabase environment, but ensure your `system_settings` table contains the correct Cashfree keys:

```sql
-- Check if keys exist in your Supabase SQL Editor
SELECT value->'cashfree' FROM system_settings WHERE key = 'payment_gateways';
```

## Local Development
If you want to test locally without deploying yet, run:
```bash
supabase functions serve create-cashfree-order --no-verify-jwt
```
> [!NOTE]
> When serving locally, you might need to update the `SUPABASE_URL` in your `.env` to point to `http://localhost:54321`.
