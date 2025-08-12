document.addEventListener('DOMContentLoaded', async () => {
  // ブログ記事一覧を表示する要素があるページでのみ実行する
  const postGrid = document.querySelector('.post-grid');
  if (!postGrid) {
    return; // 要素がなければ何もしない
  }

  const projectId = 'xm3dmjar';
  const dataset = 'production';
  const apiVersion = '2023-05-03';

  // getPosts 関数をDOMContentLoadedブロックの先頭に移動
  async function getPosts() {
    const query = encodeURIComponent(`*[_type == "post"]{
      _id,
      title,
      slug,
      description,
      "mainImageUrl": mainImage.asset->url,
      body // 本文のフィールドを追加
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

  // renderPortableText 関数をDOMContentLoadedブロックの先頭に移動
  function renderPortableText(blocks, postIndex) {
    if (!blocks) return { html: '', headings: [] };
    let html = '';
    const headings = [];
    let headingCounter = 0;

    blocks.forEach(block => {
      const childrenText = block.children.map(span => span.text).join('');
      if (block.style && block.style.startsWith('h')) {
        const level = parseInt(block.style.substring(1));
        const id = `post-${postIndex}-heading-${headingCounter++}`;
        headings.push({ id: id, text: childrenText, level: level });
        html += `<h${level} id="${id}">${childrenText}</h${level}>`;
      } else if (block._type === 'block') {
        html += `<p>${childrenText}</p>`;
      }
      // 他のブロックタイプ（画像、リストなど）はここでは処理していません
    });
    return { html, headings };
  }

  async function renderPosts() {
    const posts = await getPosts();
    postGrid.innerHTML = ''; // 既存の静的な記事をクリア

    if (posts.length === 0) {
      postGrid.innerHTML = '<p>まだ記事がありません。</p>';
      return;
    }

    posts.forEach((post, index) => {
      const postCard = document.createElement('div');
      postCard.classList.add('post-card');

      // タイトルを記事詳細ページへのリンクとして表示
      const postTitleContainer = document.createElement('h2');
      const postTitleLink = document.createElement('a');
      postTitleLink.href = `article.html?slug=${post.slug.current}`;
      postTitleLink.textContent = post.title;
      postTitleContainer.appendChild(postTitleLink);

      // メイン画像を追加
      const postImage = document.createElement('img');
      if (post.mainImageUrl) {
        postImage.src = post.mainImageUrl;
        postImage.alt = post.title;
        postImage.classList.add('post-main-image');
      } else {
        postImage.style.display = 'none';
      }

      const postDescription = document.createElement('p');
      postDescription.textContent = post.description;

      postCard.appendChild(postTitleContainer);
      postCard.appendChild(postImage);
      postCard.appendChild(postDescription);

      postGrid.appendChild(postCard);
    });
  }

  renderPosts();
});