document.addEventListener('DOMContentLoaded', async () => {
  const postGrid = document.querySelector('.post-grid');
  if (!postGrid) {
    return;
  }

  const projectId = 'xm3dmjar';
  const dataset = 'production';
  const apiVersion = '2023-05-03';

  async function getPosts(categoryTitle = null, tagSlug = null) {
    let filter = '_type == "post"';
    if (categoryTitle) {
      filter += ` && "${categoryTitle}" in categories[]->title`;
    }
    if (tagSlug) {
      // Filter by tag reference
      filter += ` && references(*[_type=="tag" && slug.current == "${tagSlug}"]._id)`;
    }

    const query = encodeURIComponent(`*[${filter}] | order(_createdAt desc){
      _id,
      title,
      slug,
      _createdAt,
      description,
      "mainImageUrl": mainImage.asset->url,
      body
    }`);
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      return [];
    }
  }

  async function renderPosts(categoryTitle = null, tagSlug = null) {
    const sectionTitle = document.getElementById('blog-posts');
    if (categoryTitle) {
        sectionTitle.textContent = `カテゴリ: ${categoryTitle}`;
    } else if (tagSlug) {
        // To get the tag title, we would need another query. For now, just use the slug.
        sectionTitle.textContent = `タグ: ${tagSlug}`;
    } else {
        sectionTitle.textContent = '最新記事';
    }

    const posts = await getPosts(categoryTitle, tagSlug);
    postGrid.innerHTML = '';

    if (posts.length === 0) {
      postGrid.innerHTML = '<p>まだ記事がありません。</p>';
      return;
    }

    posts.forEach((post) => {
      const postCardLink = document.createElement('a');
      postCardLink.href = `article.html?slug=${post.slug.current}`;
      postCardLink.classList.add('post-card');

      const postImage = document.createElement('img');
      if (post.mainImageUrl) {
        postImage.src = post.mainImageUrl;
        postImage.alt = post.title;
        postImage.classList.add('post-main-image');
        postCardLink.appendChild(postImage);
      }

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('post-card-content');

      const postTitleContainer = document.createElement('h2');
      postTitleContainer.textContent = post.title;
      contentDiv.appendChild(postTitleContainer);

      const postDescription = document.createElement('p');
      postDescription.textContent = post.description;
      contentDiv.appendChild(postDescription);

      const postDate = document.createElement('p');
      postDate.textContent = new Date(post._createdAt).toLocaleDateString('ja-JP');
      postDate.style.color = '#666';
      postDate.style.fontSize = '0.9em';
      postDate.style.textAlign = 'center';
      postDate.style.margin = '5px 0 0 0';
      contentDiv.appendChild(postDate);

      postCardLink.appendChild(contentDiv);
      postGrid.appendChild(postCardLink);
    });

    document.querySelectorAll('.category-button').forEach(button => {
        if (button.dataset.category === categoryTitle) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
  }

  // --- Event Listeners and Initial Load ---

  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const tagParam = urlParams.get('tag');

  // Category button listeners
  const categoryButtons = document.querySelectorAll('.category-button');
  categoryButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default button behavior
      const category = button.dataset.category;
      const newUrl = category ? `?category=${encodeURIComponent(category)}` : window.location.pathname;
      history.pushState({category: category}, '', newUrl);
      renderPosts(category, null); // Render posts for category, clear tag filter
    });
  });

  // Initial load
  if (tagParam) {
    renderPosts(null, tagParam);
  } else {
    renderPosts(categoryParam || '');
  }
});
