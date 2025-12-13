const fs = require('fs');
const path = require('path');

const projectId = 'xm3dmjar';
const dataset = 'production';
const apiVersion = '2023-05-03';

// Simple Portable Text to Plain Text converter
function toPlainText(blocks) {
    if (!blocks || !Array.isArray(blocks)) {
        return '';
    }
    return blocks
        .map(block => {
            if (block._type !== 'block' || !block.children) {
                return '';
            }
            return block.children.map(child => child.text).join('');
        })
        .join('\n\n');
}

async function fetchAllPosts() {
    // Query to fetch all posts
    const query = encodeURIComponent(`*[_type == "post"]{
    title,
    slug,
    publishedAt,
    body
  } | order(publishedAt desc)`);
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

    try {
        console.log('Fetching posts from Sanity...');
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

async function main() {
    const posts = await fetchAllPosts();
    console.log(`Found ${posts.length} posts.`);

    let content = '';

    for (const post of posts) {
        content += `Title: ${post.title}\n`;
        content += `Date: ${post.publishedAt}\n`;
        content += `Slug: ${post.slug ? post.slug.current : 'N/A'}\n`;
        content += `\n--- BODY ---\n\n`;
        content += toPlainText(post.body);
        content += `\n\n==================================================\n\n`;
    }

    const outputPath = path.join(__dirname, 'blog_export.txt');
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`Exported blog posts to: ${outputPath}`);
}

main();
