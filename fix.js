const fs = require('fs');

function processFile(filename) {
    let content = fs.readFileSync(filename, 'utf-8');
    
    // We need to remove the inline script that starts with <script id="static-interactivity">
    // and ends with </script>
    
    const startPattern = '<script id="static-interactivity">';
    const endPattern = '</script>';
    
    let startIndex = content.indexOf(startPattern);
    if (startIndex !== -1) {
        let endIndex = content.indexOf(endPattern, startIndex);
        if (endIndex !== -1) {
            endIndex += endPattern.length;
            content = content.substring(0, startIndex) + content.substring(endIndex);
            
            // Also append the redirect logic right after the DOMContentLoaded to ensure it runs
            
            fs.writeFileSync(filename, content, 'utf-8');
            console.log(`Removed inline static-interactivity from ${filename}`);
        } else {
            console.log(`Could not find end of script in ${filename}`);
        }
    } else {
        console.log(`Could not find inline script in ${filename}`);
    }
}

['index-seo.html', 'index-tr.html', 'index-it.html'].forEach(processFile);
