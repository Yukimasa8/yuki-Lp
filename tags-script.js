document.addEventListener('DOMContentLoaded', async () => {
  const tagPageTitle = document.getElementById('tag-page-title');
  const tagPostGrid = document.getElementById('tag-post-grid');

  const projectId = 'xm3dmjar';
  const dataset = 'production';
  const apiVersion = '2023-05-03';

  async function getPostsByTagSlug(tagSlug) {
    const query = encodeURIComponent(`*[_type == "post" && references(*[_type=="tag" && slug.current == "${tagSlug}"]._id)] | order(_createdAt desc){
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
      console.log("Fetched posts data for tag:", tagSlug, data.result); // ★この行を追加
      return data.result;
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      return [];
    }
  }

  async function getTagTitle(tagSlug) {
    const query = encodeURIComponent(`*[_type == "tag" && slug.current == "${tagSlug}"]{title}[0]`);
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched tag title data:", data.result); // デバッグログを追加
      return data.result ? data.result.title : null;
    } catch (error) {
      console.error("Error fetching tag title from Sanity:", error);
      return null;
    }
  }

  async function renderTagPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const tagSlug = urlParams.get('slug');
    console.log("tagSlug from URL:", tagSlug); // デバッグログを追加

    if (!tagSlug) {
      tagPageTitle.textContent = 'タグが見つかりません';
      tagPostGrid.innerHTML = '<p>タグが指定されていません。</p>';
      return;
    }

    const tagTitle = await getTagTitle(tagSlug);
    if (tagTitle) {
      tagPageTitle.textContent = `タグ: ${tagTitle}`;
      document.title = `タグ: ${tagTitle} - ネコマサBLOG`;
      // Set meta description for SEO
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = `${tagTitle}に関連する記事一覧です。`;
      }
    } else {
      tagPageTitle.textContent = `タグ: ${tagSlug} の記事`;
      document.title = `タグ: ${tagSlug} - ネコマサBLOG`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = `${tagSlug}に関連する記事一覧です。`;
      }
    }

    const posts = await getPostsByTagSlug(tagSlug);
    tagPostGrid.innerHTML = '';

    if (posts.length === 0) {
      tagPostGrid.innerHTML = '<p>このタグに関連する記事はまだありません。</p>';
      return;
    }

    posts.forEach((post) => {
      const postCardLink = document.createElement('a');
      postCardLink.href = `article.html?slug=${post.slug}`;
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
      tagPostGrid.appendChild(postCardLink);
    });
  }

  renderTagPage();
});