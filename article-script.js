
const projectId = 'xm3dmjar';
const dataset = 'production';
const apiVersion = '2023-05-03';

// Portable TextをHTMLに変換する関数を拡張
function renderPortableText(blocks) {
  if (!blocks) return { html: '', headings: [] };
  let html = '';
  const headings = [];
  let headingCounter = 0;

  blocks.forEach(block => {
    const childrenText = block.children.map(span => span.text).join('');
    if (block.style && block.style.startsWith('h')) {
      const level = parseInt(block.style.substring(1));
      const id = `heading-${headingCounter++}`;
      headings.push({ id: id, text: childrenText, level: level });
      html += `<h${level} id="${id}">${childrenText}</h${level}>`;
    } else if (block._type === 'block') {
      html += `<p>${childrenText}</p>`;
    }
    // 他のブロックタイプ（画像、リストなど）はここでは処理していません
  });
  return { html, headings };
}

async function fetchArticleBySlug(slug) {
  const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"]{
    _id,
    title,
    slug,
    description,
    "mainImageUrl": mainImage.asset->url,
    body
  }[0]`); // 最初の1件のみ取得
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching article from Sanity:", error);
    return null;
  }
}

async function renderArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  if (!slug) {
    document.getElementById('article-title').textContent = '記事が見つかりません';
    return;
  }

  const article = await fetchArticleBySlug(slug);

  if (!article) {
    document.getElementById('article-title').textContent = '記事が見つかりません';
    return;
  }

  document.title = `${article.title} - ネコマサBLOG`;
  document.getElementById('article-title').textContent = article.title;
  document.getElementById('article-description').textContent = article.description;

  const mainImageElement = document.getElementById('article-main-image');
  if (article.mainImageUrl) {
    mainImageElement.src = article.mainImageUrl;
    mainImageElement.alt = article.title;
  } else {
    mainImageElement.style.display = 'none';
  }

  const { html: articleBodyHtml, headings } = renderPortableText(article.body);
  document.getElementById('article-body').innerHTML = articleBodyHtml;

  // 目次を生成
  const tocContainer = document.getElementById('article-toc');
  if (headings.length > 0) {
    const tocTitle = document.createElement('h3');
    tocTitle.textContent = '目次';
    tocContainer.appendChild(tocTitle);

    const tocList = document.createElement('ul');
    headings.forEach(heading => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.text;
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
  } else {
    tocContainer.style.display = 'none'; // 見出しがない場合は目次を非表示
  }
}

renderArticle();
