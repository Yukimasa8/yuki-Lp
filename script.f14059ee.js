document.addEventListener('DOMContentLoaded', async () => {
    const projectId = 'xm3dmjar';
    const dataset = 'production';
    const apiVersion = '2023-05-03';
    const postGrid = document.querySelector('.post-grid');

    if (!postGrid) {
        console.error('Post grid not found');
        return;
    }

    async function fetchPosts() {
        const query = encodeURIComponent(`*[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            slug,
            publishedAt,
            "mainImageUrl": mainImage.asset->url,
            "categories": categories[]->{_id, title, "slug": slug.current}
        }`);
        const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

        try {
            postGrid.innerHTML = '<p>記事を読み込んでいます...</p>';
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error("Error fetching posts from Sanity:", error);
            postGrid.innerHTML = '<p>記事の読み込みに失敗しました。</p>';
            return [];
        }
    }

    function renderPosts(posts) {
        if (!posts || posts.length === 0) {
            postGrid.innerHTML = '<p>まだ記事がありません。</p>';
            return;
        }

        const postsHtml = posts.map(post => {
            const postUrl = `article.html?slug=${post.slug.current}`;
            const imageUrl = post.mainImageUrl ? `${post.mainImageUrl}?w=400&h=250&fit=crop` : '';

            // Re-implement categories, using the existing 'tag' class for styling.
            const categoriesHtml = post.categories && post.categories.length > 0
                ? `<div class="post-categories" style="margin-top: 10px;">` + 
                  post.categories.map(cat => `<a href="categories.html?slug=${cat.slug}" class="tag">${cat.title}</a>`).join('') + 
                  `</div>`
                : '';

            return `
                <a href="${postUrl}" class="post-card">
                    ${imageUrl ? `<img src="${imageUrl}" alt="${post.title}" class="post-main-image" loading="lazy">` : ''}
                    <div class="post-card-content">
                        <h2 class="post-title">${post.title}</h2>
                        ${categoriesHtml}
                        <p class="post-date">${new Date(post.publishedAt).toLocaleDateString('ja-JP')}</p>
                    </div>
                </a>
            `;
        }).join('');

        postGrid.innerHTML = postsHtml;
    }

    const posts = await fetchPosts();
    renderPosts(posts);
});
