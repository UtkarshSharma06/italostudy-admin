-- Debug: Check what's in the FIRST20 coupon
SELECT code, discount_type, discount_value, is_active 
FROM coupons 
WHERE code = 'FIRST20';
