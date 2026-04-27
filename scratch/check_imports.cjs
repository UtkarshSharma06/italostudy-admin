const fs = require('fs');
const path = require('path');

const dirsToCheck = [
    'src/pages',
    'src/components/admin',
    'src/components/cms',
    'src/components/seo',
    'src/components/analytics',
    'src/components/store-admin',
    'src/components/auth'
];

console.log('--- Deep Audit: Checking for Broken Connections ---');

const checkFile = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');
    const imports = content.match(/import.*from\s+['"](.*)['"]/g) || [];
    
    imports.forEach(imp => {
        const match = imp.match(/from\s+['"](.*)['"]/);
        if (match) {
            let impPath = match[1];
            if (impPath.startsWith('@/')) {
                const rel = impPath.replace('@/', 'src/');
                const exts = ['', '.tsx', '.ts', '.js', '.mjs', '/index.tsx', '/index.ts'];
                let found = false;
                for (const ext of exts) {
                    if (fs.existsSync(path.resolve(rel + ext))) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    console.log(`[MISSING] ${filePath} -> ${impPath}`);
                }
            }
        }
    });
};

const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            walk(p);
        } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
            checkFile(p);
        }
    });
};

dirsToCheck.forEach(walk);

console.log('--- Audit Complete ---');
