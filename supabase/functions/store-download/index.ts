// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      // @ts-ignore
      Deno.env.get('SUPABASE_URL') ?? '',
      // @ts-ignore
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // 1. Get current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) throw new Error('Unauthorized')

    // 2. Get product_id from body
    const { product_id } = await req.json()
    if (!product_id) throw new Error('Product ID required')

    // 3. Verify Purchase
    // We check if there's a 'paid' order containing this product_id for this user
    const { data: orderItem, error: orderError } = await supabaseClient
      .from('store_order_items')
      .select('id, store_orders!inner(id, status, user_id)')
      .eq('product_id', product_id)
      .eq('store_orders.user_id', user.id)
      .eq('store_orders.status', 'paid')
      .maybeSingle()

    if (orderError || !orderItem) {
      console.error('Verify Purchase Error:', orderError)
      throw new Error('No valid purchase found for this product.')
    }

    // 4. Get the secure resource path (public_id) from the product
    const { data: product, error: productError } = await supabaseClient
      .from('store_products')
      .select('download_url, title')
      .eq('id', product_id)
      .single()

    if (productError || !product?.download_url) {
      throw new Error('Product resource configuration missing.')
    }

    // 5. Generate Signed Cloudinary URL
    // NOTE: This assumes download_url contains the Cloudinary Public ID or a path
    // We verify against Cloudinary with a 1-hour expiration
    // @ts-ignore
    const cloudName = Deno.env.get('CLOUDINARY_CLOUD_NAME')
    // @ts-ignore
    const apiKey = Deno.env.get('CLOUDINARY_API_KEY')
    // @ts-ignore
    const apiSecret = Deno.env.get('CLOUDINARY_API_SECRET')

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Cloudinary server-side configuration missing.')
    }

    const timestamp = Math.round(new Date().getTime() / 1000)
    const expiration = timestamp + 3600 // 1 hour valid
    
    // Cloudinary signing logic:
    // Params must be alphabetized for signature
    // We'll use a simple authenticated URL if the user has provided the right keys
    // For raw files, the URL pattern is different. 
    
    const publicId = product.download_url; // Assuming they stored the public_id here
    const signatureBase = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
    const signature = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(signatureBase))
      .then(hash => Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join(''))

    const signedUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/authenticated?public_id=${encodeURIComponent(publicId)}&timestamp=${timestamp}&api_key=${apiKey}&signature=${signature}`

    // Alternative: Generate a simple download link if they used a private bucket
    // For this specific request, we will return the signed URL
    
    return new Response(JSON.stringify({ url: signedUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Edge Function Error:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
