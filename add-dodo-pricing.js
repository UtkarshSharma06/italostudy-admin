const DODO_API_KEY = "YOUR_DODO_API_KEY_HERE";

// ⚠️ Replace these with your actual Dodo Product IDs for your Monthly and Quarterly plans
const MONTHLY_PRODUCT_ID = "pdt_monthly_xxxxx"; 
const QUARTERLY_PRODUCT_ID = "pdt_quarterly_xxxxx";

async function addLocalizedPrice(productId, country, currency, amount) {
    const response = await fetch(`https://live.dodopayments.com/products/${productId}/localized-prices`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DODO_API_KEY}`
        },
        body: JSON.stringify({
            country: country,
            currency: currency,
            price: amount * 100 // Multiplying by 100 as APIs typically require amounts in the smallest denomination (cents/paisa)
        })
    });

    const data = await response.json();
    console.log(`✅ Set ${currency} for product ${productId}:`, data);
}

async function run() {
    console.log("Setting up Monthly localized pricing...");
    await addLocalizedPrice(MONTHLY_PRODUCT_ID, "PK", "PKR", 1499); 
    await addLocalizedPrice(MONTHLY_PRODUCT_ID, "BD", "BDT", 799);

    console.log("\nSetting up Quarterly localized pricing...");
    await addLocalizedPrice(QUARTERLY_PRODUCT_ID, "PK", "PKR", 3999);
    await addLocalizedPrice(QUARTERLY_PRODUCT_ID, "BD", "BDT", 2199);
}

run();
