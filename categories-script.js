document.addEventListener('DOMContentLoaded', async () => {
  const categoryPageTitle = document.getElementById('category-page-title');
  const categoryPostGrid = document.getElementById('category-post-grid');

  const projectId = 'xm3dmjar';
  const dataset = 'production';
  const apiVersion = '2023-05-03';

  async function getPostsByCategorySlug(categorySlug) {
    const query = encodeURIComponent(`*[_type == "post" && references(*[_type=="category" && slug.current == "${categorySlug}"]._id)] | order(_createdAt desc){
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

  async function getCategoryTitle(categorySlug) {
    const query = encodeURIComponent(`*[_type == "category" && slug.current == "${categorySlug}"]{title}[0]`);
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.result ? data.result.title : null;
    } catch (error) {
      console.error("Error fetching category title from Sanity:", error);
      return null;
    }
  }

  async function renderCategoryPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const categorySlug = urlParams.get('slug');

    if (!categorySlug) {
      categoryPageTitle.textContent = 'カテゴリーが見つかりません';
      categoryPostGrid.innerHTML = '<p>カテゴリーが指定されていません。</p>';
      return;
    }

    const categoryTitle = await getCategoryTitle(categorySlug);
    if (categoryTitle) {
      categoryPageTitle.textContent = `カテゴリー: ${categoryTitle}`;
      document.title = `カテゴリー: ${categoryTitle} - ネコマサBLOG`;
      // Set meta description for SEO
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = `${categoryTitle}に関連する記事一覧です。`;
      }
    } else {
      categoryPageTitle.textContent = `カテゴリー: ${categorySlug} の記事`;
      document.title = `カテゴリー: ${categorySlug} - ネコマサBLOG`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = `${categorySlug}に関連する記事一覧です。`;
      }
    }

    const posts = await getPostsByCategorySlug(categorySlug);
    categoryPostGrid.innerHTML = '';

    if (posts.length === 0) {
      categoryPostGrid.innerHTML = '<p>このカテゴリーに関連する記事はまだありません。</p>';
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
      categoryPostGrid.appendChild(postCardLink);
    });
  }

  renderCategoryPage();
});