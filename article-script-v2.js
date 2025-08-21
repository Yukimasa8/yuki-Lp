const projectId = 'xm3dmjar';
const dataset = 'production';
const apiVersion = '2023-05-03';

// Portable TextをHTMLに変換する高機能な関数
function renderPortableText(blocks) {
  if (!blocks) return { html: '', headings: [] };

  let html = '';
  const headings = [];
  let headingCounter = 0;
  let listTag = null; // 現在のリストタグ（'ul' or 'ol'）を追跡

  const closeList = () => {
    if (listTag) {
      html += `</${listTag}>`;
      listTag = null;
    }
  };

  blocks.forEach(block => {
    // ブロックタイプが 'block' でない場合（例: 画像など）はリストを閉じる
    if (block._type !== 'block' || !block.listItem) {
      closeList();
    }

    if (block._type === 'block') {
      const style = block.style || 'normal';
      
      // テキストコンテンツの生成
      const childrenHtml = block.children.map(span => {
        let text = span.text.replace(/\n/g, '<br>'); // ソフトブレークを<br>に変換
        if (span.marks && span.marks.length > 0) {
          // marksを逆順で適用するとネストが正しくなる
          return span.marks.reverse().reduce((acc, mark) => {
            if (mark === 'strong') return `<strong>${acc}</strong>`;
            if (mark === 'em') return `<em>${acc}</em>`;
            if (mark === 'underline') return `<u>${acc}</u>`;
            if (mark === 'strike-through') return `<s>${acc}</s>`;
            // リンクの処理
            if (typeof mark === 'string' && block.markDefs) {
               const markDef = block.markDefs.find(def => def._key === mark);
               if (markDef && markDef._type === 'link') {
                 return `<a href="${markDef.href}" target="_blank" rel="noopener noreferrer">${acc}</a>`;
               }
            }
            return acc;
          }, text);
        }
        return text;
      }).join('');

      // 見出しの処理
      if (style.startsWith('h')) {
        closeList();
        const level = parseInt(style.substring(1));
        const id = `heading-${headingCounter++}`;
        headings.push({ id: id, text: block.children.map(c => c.text).join(''), level: level });
        html += `<h${level} id="${id}">${childrenHtml}</h${level}>`;
      } 
      // リストの処理
      else if (block.listItem) {
        const newListTag = block.listItem === 'bullet' ? 'ul' : 'ol';
        if (listTag !== newListTag) {
          closeList();
          listTag = newListTag;
          html += `<${listTag}>`;
        }
        html += `<li>${childrenHtml}</li>`;
      }
      // 通常の段落の処理
      else {
        closeList();
        // 2つ以上連続する<br>タグを段落の区切りに置換する
        const paragraphs = childrenHtml.replace(/(<br>\s*){2,}/g, '</p><p>');
        html += `<p>${paragraphs}</p>`;
      }
    }
    // アフィリエイトリンクの処理
    else if (block._type === 'affiliate') {
      closeList();
      if (block.code) {
        html += block.code;
      }
    }
    // 他のカスタムブロックタイプ（例：画像）の処理をここに追加できる
    // else if (block._type === 'image') { ... }
  });

  closeList(); // 最後に開いているリストがあれば閉じる
  return { html, headings };
}


async function fetchArticleBySlug(slug) {
  const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"]{
    _id,
    title,
    slug,
    description,
    "mainImageUrl": mainImage.asset->url,
    body[]{
      ...,
      // リンクのためのmarkDefsを取得
      markDefs[]{
        ...,
        _type == "link" => {
          "href": @.href,
          "_key": @._key
        }
      }
    }
  }[0]`);
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

  // シェアボタンの設定
  setupShareButtons(article.title);
}

function setupShareButtons(title) {
  const url = encodeURIComponent(window.location.href);
  const encodedTitle = encodeURIComponent(title);

  const twitterBtn = document.getElementById('share-twitter');
  const facebookBtn = document.getElementById('share-facebook');
  const lineBtn = document.getElementById('share-line');

  if (twitterBtn) {
    twitterBtn.href = `https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`;
    twitterBtn.target = '_blank';
    twitterBtn.rel = 'noopener noreferrer';
  }

  if (facebookBtn) {
    facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    facebookBtn.target = '_blank';
    facebookBtn.rel = 'noopener noreferrer';
  }

  if (lineBtn) {
    lineBtn.href = `https://social-plugins.line.me/lineit/share?url=${url}&text=${encodedTitle}`;
    lineBtn.target = '_blank';
    lineBtn.rel = 'noopener noreferrer';
  }
}

renderArticle();