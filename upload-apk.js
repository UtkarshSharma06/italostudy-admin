const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('URL:', supabaseUrl);
console.log('Key exists:', !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadAPK() {
    try {
        console.log('📦 Reading APK file...');
        const apkPath = 'C:\\Users\\Planet pc\\Downloads\\italostudy-v1.0.0-release.apk';

        if (!fs.existsSync(apkPath)) {
            console.error('APK file not found at:', apkPath);
            process.exit(1);
        }

        const fileBuffer = fs.readFileSync(apkPath);
        const fileSizeMB = (fileBuffer.length / (1024 * 1024)).toFixed(2);
        console.log(`File size: ${fileSizeMB} MB`);

        console.log('📤 Uploading to Supabase storage...');
        const fileName = 'italostudy-v1.0.0-release.apk';

        const { data, error } = await supabase.storage
            .from('apk-files')
            .upload(fileName, fileBuffer, {
                contentType: 'application/vnd.android.package-archive',
                upsert: true
            });

        if (error) {
            console.error('❌ Upload error:', error);
            process.exit(1);
        }

        console.log('✅ Upload successful!');

        const { data: urlData } = supabase.storage
            .from('apk-files')
            .getPublicUrl(fileName);

        console.log('\n🔗 Public Download Link:');
        console.log(urlData.publicUrl);
        console.log('\n✅ Done! Share this link for APK downloads.');

    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

uploadAPK();
