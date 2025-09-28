const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ASSETS_TO_VERSION = [
    { original: 'style.css', type: 'css' },
    { original: 'script.js', type: 'js' }
];

async function getFileHash(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('md5');
        const stream = fs.createReadStream(filePath);
        stream.on('data', chunk => hash.update(chunk));
        stream.on('end', () => resolve(hash.digest('hex').substring(0, 8))); // Short hash
        stream.on('error', reject);
    });
}

async function findHtmlFiles(dir) {
    let htmlFiles = [];
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = path.resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            // Skip common non-source directories
            if (['node_modules', '.git', '.github', 'dist', 'nekomasa-blog-studio', 'nekomasa-next-blog'].includes(dirent.name)) {
                continue;
            }
            htmlFiles = htmlFiles.concat(await findHtmlFiles(res));
        } else if (dirent.isFile() && res.endsWith('.html')) {
            htmlFiles.push(res);
        }
    }
    return htmlFiles;
}

async function versionAssets() {
    const renames = {};

    // 1. Rename asset files and store new names
    for (const asset of ASSETS_TO_VERSION) {
        const originalPath = path.join(process.cwd(), asset.original);
        if (fs.existsSync(originalPath)) {
            const hash = await getFileHash(originalPath);
            const newName = `${path.parse(asset.original).name}.${hash}${path.parse(asset.original).ext}`;
            const newPath = path.join(process.cwd(), newName);

            fs.renameSync(originalPath, newPath);
            renames[asset.original] = newName;
            console.log(`Renamed ${asset.original} to ${newName}`);
        } else {
            console.warn(`Asset not found: ${asset.original}. Skipping.`);
        }
    }

    // 2. Update HTML files
    const htmlFiles = await findHtmlFiles(process.cwd());
    for (const htmlFile of htmlFiles) {
        let content = fs.readFileSync(htmlFile, 'utf8');
        let changed = false;

        for (const originalName in renames) {
            const newName = renames[originalName];
            // Create a regex that matches the original filename, but not if it's already versioned
            // This regex tries to match the original name only if it's not followed by .<8-char-hash>
            const regex = new RegExp(`(?<!\.[0-9a-fA-F]{8})${originalName.replace('.', '\.')}`, 'g');
            
            if (content.match(regex)) {
                content = content.replace(regex, newName);
                changed = true;
            }
        }

        if (changed) {
            fs.writeFileSync(htmlFile, content, 'utf8');
            console.log(`Updated references in ${htmlFile}`);
        }
    }
}

versionAssets().catch(console.error);
