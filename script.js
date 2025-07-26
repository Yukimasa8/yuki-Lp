
const projectId = 'xm3dmjar';
const dataset = 'production';
const apiVersion = '2023-05-03';

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

// Portable TextをHTMLに変換する関数を拡張
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
  const postGrid = document.querySelector('.post-grid');
  postGrid.innerHTML = ''; // 既存の静的な記事をクリア

  if (posts.length === 0) {
    postGrid.innerHTML = '<p>まだ記事がありません。</p>';
    return;
  }

  posts.forEach((post, index) => {
    const postCard = document.createElement('div');
    postCard.classList.add('post-card');

    // タイトルを外部リンクとして表示
    const postTitleContainer = document.createElement('h2');
    const postTitleLink = document.createElement('a');
    postTitleLink.href = post.slug ? `https://nekomasa.website/${post.slug.current}` : '#';
    postTitleLink.target = '_blank';
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

    // 詳細コンテンツを格納するコンテナ
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('post-details-container', 'hidden'); // 初期状態で非表示

    const postDescription = document.createElement('p');
    postDescription.textContent = post.description;

    // 本文と見出し情報を取得
    const { html: postBodyHtml, headings } = renderPortableText(post.body, index);

    // 本文を表示する要素を追加
    const postBody = document.createElement('div');
    postBody.classList.add('post-content');
    postBody.innerHTML = postBodyHtml;

    // 詳細コンテナに要素を追加
    detailsContainer.appendChild(postDescription);

    // 目次を生成して追加
    if (headings.length > 0) {
      const tocContainer = document.createElement('div');
      tocContainer.classList.add('post-toc');
      const tocTitle = document.createElement('h3');
      tocTitle.textContent = '目次';
      tocContainer.appendChild(tocTitle);

      const tocList = document.createElement('ul');
      headings.forEach(heading => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.text;
        // クリックイベントでスムーズスクロール
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetElement = document.getElementById(heading.id);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        });
        listItem.appendChild(link);
        tocList.appendChild(listItem);
      });
      tocContainer.appendChild(tocList);
      detailsContainer.appendChild(tocContainer);
    }

    detailsContainer.appendChild(postBody);

    // 詳細表示/非表示を切り替えるボタン
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '詳細を見る';
    toggleButton.classList.add('post-toggle-button');
    toggleButton.addEventListener('click', () => {
      detailsContainer.classList.toggle('hidden');
      toggleButton.textContent = detailsContainer.classList.contains('hidden') ? '詳細を見る' : '閉じる';
    });

    postCard.appendChild(postTitleContainer);
    postCard.appendChild(postImage);
    postCard.appendChild(toggleButton);
    postCard.appendChild(detailsContainer);

    postGrid.appendChild(postCard);
  });
}

renderPosts();
