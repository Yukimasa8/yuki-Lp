const projectId = 'xm3dmjar';
console.log('Running article script v2.1 - with line break fix');
const dataset = 'production';
const apiVersion = '2023-05-03';

// Sanity画像URLを生成するヘルパー関数
function urlFor(source) {
  if (!source || !source.asset || !source.asset._ref) {
    console.error("Invalid image source for urlFor:", source);
    return ""; // 不正な場合は空文字列を返す
  }
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${source.asset._ref.replace('image-', '').replace('-webp', '.webp').replace('-png', '.png').replace('-jpg', '.jpg').replace('-jpeg', '.jpeg')}`;
}

// Portable TextをHTMLに変換する高機能な関数
function renderPortableText(blocks) {
  if (!blocks) return { html: '', headings: [], characterCount: 0 };

  let html = '';
  const headings = [];
  let characterCount = 0;
  let headingCounter = 0;
  let listTag = null; // 現在のリストタグ（'ul' or 'ol'）を追跡

  const closeList = () => {
    if (listTag) {
      html += `</${listTag}>`;
      listTag = null;
    }
  };

  blocks.forEach(block => {
    console.log('Processing block type:', block._type);
    // ブロックタイプが 'block' でない場合（例: 画像など）はリストを閉じる
    if (block._type !== 'block' || !block.listItem) {
      closeList();
    }

    if (block._type === 'block') {
      // 文字数をカウント
      block.children.forEach(span => {
        characterCount += span.text.length;
      });

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
                 // 外部リンクにsponsored属性を付与する
                 return `<a href="${markDef.href}" target="_blank" rel="noopener noreferrer sponsored">${acc}</a>`;
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
        // 2つ以上連続する<br>タグを段落の区切りに置換しないように変更
        html += `<p>${childrenHtml}</p>`;
      }
    }
    // アフィリエイトリンクの処理
    else if (block._type === 'affiliate') {
      closeList();
      if (block.code) {
        // 不正なコメントを修正し、広告ラベルを直前に追加する
        const correctedCode = block.code.replace(/<--/g, '<!--');
        html += `<p style="font-size: 0.8em; color: #ddd; margin-bottom: 0.5em; margin-top: 2em;">【広告】</p>` + correctedCode;
      }
    }
    // 他のカスタムブロックタイプ（例：画像）の処理をここに追加できる
    else if (block._type === 'image') {
      closeList();
      if (block.asset) {
        const imageUrl = urlFor(block);
        html += `<figure><img src="${imageUrl}" alt="${block.alt || ''}" loading="lazy"></figure>`;
      }
    }
  });

  closeList(); // 最後に開いているリストがあれば閉じる
  return { html, headings, characterCount };
}


async function fetchArticleBySlug(slug) {
  const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"]{
    _id,
    title,
    slug,
    description,
    "mainImageUrl": mainImage.asset->url,
    publishedAt,
    _updatedAt,
    dajareLevel,
    gorioshiLevel,
    "tags": tags[]->{title, slug},
    body[]{
      ...,
      _type == "image" => {
        "asset": @.asset->{_ref}
      },
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
    console.log("Fetched article data:", data.result); // ★この行を追加
    return data.result;
  } catch (error) {
    console.error("Error fetching article from Sanity:", error);
    return null;
  }
}

async function renderArticle() {
  // 1. Set a loading state immediately
  document.getElementById('article-title').textContent = '読み込み中...';
  document.getElementById('article-body').innerHTML = '<p>記事を読み込んでいます。少々お待ちください。</p>';

  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  function addNoIndexTag() {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
  }

  if (!slug) {
    document.getElementById('article-title').textContent = '記事が見つかりません';
    document.getElementById('article-body').innerHTML = '<p>記事のURLが無効です。</p>';
    addNoIndexTag();
    return;
  }

  const article = await fetchArticleBySlug(slug);

  

  if (!article) {
    document.getElementById('article-title').textContent = '記事が見つかりません';
    document.getElementById('article-body').innerHTML = '<p>お探しの記事は見つかりませんでした。</p>';
    addNoIndexTag();
    return;
  }

  // --- Render the actual article ---
  document.title = `${article.title} - ネコマサBLOG`;
  document.getElementById('article-title').textContent = article.title;
  document.getElementById('article-description').textContent = article.description;

  // Canonical URL
  const canonicalLink = document.getElementById('canonical-link');
  if (canonicalLink) {
    canonicalLink.href = window.location.origin + window.location.pathname + window.location.search;
  }

  const { html: articleBodyHtml, headings, characterCount } = renderPortableText(article.body);

  // Date and reading time
  const dateElement = document.getElementById('article-date');
  if (article.publishedAt) {
    const date = new Date(article.publishedAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = date.toLocaleDateString('ja-JP', options);

    if (characterCount > 0) {
      const readingTime = Math.ceil(characterCount / 500);
      dateString += `　約${readingTime}分で読めます`;
    }
    dateElement.textContent = dateString;

    

  } else {
        dateElement.style.display = 'none';
      }

      // Combined Dajare and Gorioshi Level rendering
      const articleLevelsContainer = document.getElementById('article-levels');
      if (articleLevelsContainer && (article.dajareLevel || article.gorioshiLevel)) {
          let levelsHtml = '<div class="level-row" style="text-align: center;">この記事の</div>'; // Keep "この記事の" centered
          let levelItems = []; // Array to hold HTML for each level display

          if (article.dajareLevel) {
              let dajareIcons = '';
              for (let i = 0; i < 5; i++) {
                  if (i < article.dajareLevel) {
                      dajareIcons += `<img src="assets/paw-filled.svg" class="level-paw-icon" alt="filled paw">`;
                  } else {
                      dajareIcons += `<img src="assets/paw-empty.svg" class="level-paw-icon" alt="empty paw">`;
                  }
              }
              levelItems.push(`<span style="white-space: nowrap;">ダジャレベル <span class="dajare-stars">${dajareIcons}</span></span>`);
          }

          if (article.gorioshiLevel) {
              let gorioshiIcons = '';
              for (let i = 0; i < 5; i++) {
                  if (i < article.gorioshiLevel) {
                      gorioshiIcons += `<img src="assets/paw-filled.svg" class="level-paw-icon" alt="filled paw">`;
                  } else {
                      gorioshiIcons += `<img src="assets/paw-empty.svg" class="level-paw-icon" alt="empty paw">`;
                  }
              }
              levelItems.push(`<span style="white-space: nowrap;">熱苦しさ <span class="gorioshi-stars">${gorioshiIcons}</span></span>`);
          }

          if (levelItems.length > 0) {
              // Join the level items with a separator
              const combinedContent = levelItems.join(`&nbsp;&nbsp;|&nbsp;&nbsp;`);
              levelsHtml += `<div class="level-row" style="display: flex; justify-content: center; align-items: center;">${combinedContent}</div>`;
          }
          
          articleLevelsContainer.innerHTML = levelsHtml;
          articleLevelsContainer.style.marginBottom = '0px'; // Set to 0px as per user's request for narrowness
      } else if (articleLevelsContainer) {
          articleLevelsContainer.style.display = 'none';
      }

  // Updated date
  if (article._updatedAt && article.publishedAt) {
      const publishedDate = new Date(article.publishedAt);
      const updatedDate = new Date(article._updatedAt);
      publishedDate.setHours(0, 0, 0, 0);
      updatedDate.setHours(0, 0, 0, 0);

      if (updatedDate > publishedDate) {
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const updatedDateElement = document.createElement('p');
          updatedDateElement.classList.add('updated-date');
          updatedDateElement.textContent = `更新日: ${updatedDate.toLocaleDateString('ja-JP', options)}`;
          dateElement.parentNode.insertBefore(updatedDateElement, dateElement.nextSibling);
      }
  }

  // Main image
  const mainImageElement = document.getElementById('article-main-image');
  if (article.mainImageUrl) {
    mainImageElement.src = article.mainImageUrl;
    mainImageElement.alt = article.title;
  } else {
    mainImageElement.style.display = 'none';
  }

  // Article body
  document.getElementById('article-body').innerHTML = articleBodyHtml;

  // Table of Contents
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
    tocContainer.style.display = 'none';
  }

  // Render tags
  if (article.tags && article.tags.length > 0) {
    const tagsContainer = document.createElement('div');
    tagsContainer.classList.add('tags-container', 'article-tags');

    const tagsTitle = document.createElement('h3');
    tagsTitle.textContent = '関連タグ';
    tagsContainer.appendChild(tagsTitle);

    article.tags.forEach(tag => {
      if (tag && tag.slug && tag.slug.current) {
        const tagElement = document.createElement('a');
        tagElement.classList.add('tag');
        tagElement.textContent = tag.title;
        tagElement.href = `tags.html?slug=${tag.slug.current}`;
        tagsContainer.appendChild(tagElement);
      } else if (tag && tag.title) {
        const tagElement = document.createElement('span');
        tagElement.classList.add('tag', 'tag-item--no-link');
        tagElement.textContent = tag.title;
        tagsContainer.appendChild(tagElement);
      }
    });

    const shareButtons = document.querySelector('.share-buttons');
    if (shareButtons) {
      shareButtons.parentNode.insertBefore(tagsContainer, shareButtons);
    }
  }

  // Share buttons
  setupShareButtons(article.title);

  // GA event
  setTimeout(() => {
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_title: document.title,
        page_path: window.location.pathname + window.location.search
      });
      console.log('GA page_view event sent for:', document.title);
    } else {
      console.warn('gtag function not available for GA page_view event.');
    }
  }, 500);
}

function setupShareButtons(title) {
  const twitterBtn = document.getElementById('share-twitter');
  const facebookBtn = document.getElementById('share-facebook');
  const lineBtn = document.getElementById('share-line');
  const copyBtn = document.getElementById('share-copy');

  const pageUrl = window.location.href;
  const pageTitle = title;

  if (twitterBtn) {
    twitterBtn.addEventListener('click', (e) => {
      const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  if (facebookBtn) {
    facebookBtn.addEventListener('click', (e) => {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  if (lineBtn) {
    lineBtn.addEventListener('click', (e) => {
      const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(pageUrl).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'コピーしました！';
        copyBtn.disabled = true;
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.disabled = false;
        }, 2000);
      }).catch(err => {
        console.error('URLのコピーに失敗しました', err);
        alert('コピーに失敗しました');
      });
    });
  }

  
}

renderArticle();