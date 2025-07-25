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

    const postLink = document.createElement('a');
    postLink.href = post.slug ? `https://nekomasa.website/${post.slug.current}` : '#'; // Sanityのslugを使用
    postLink.target = '_blank'; // 新しいタブで開く

    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title;

    // メイン画像を追加
    const postImage = document.createElement('img');
    if (post.mainImageUrl) {
      postImage.src = post.mainImageUrl;
      postImage.alt = post.title; // alt属性を設定
      postImage.classList.add('post-main-image');
    } else {
      postImage.style.display = 'none'; // 画像がない場合は非表示
    }

    const postDescription = document.createElement('p');
    postDescription.textContent = post.description;

    // 本文と見出し情報を取得
    const { html: postBodyHtml, headings } = renderPortableText(post.body, index);

    // 本文を表示する要素を追加
    const postBody = document.createElement('div');
    postBody.classList.add('post-content');
    postBody.innerHTML = postBodyHtml;

    postLink.appendChild(postTitle);
    postLink.appendChild(postImage); // 画像をタイトルと説明の間に挿入
    postLink.appendChild(postDescription);

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
      postLink.appendChild(tocContainer);
    }

    postLink.appendChild(postBody); // 本文を追加
    postCard.appendChild(postLink);
    postGrid.appendChild(postCard);
  });
}

renderPosts();