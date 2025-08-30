const projectId = 'xm3dmjar';
console.log('Running article script v2.1 - with line break fix');
const dataset = 'production';
const apiVersion = '2023-05-03';

// Sanity画像URLを生成するヘルパー関数
function urlFor(source) {
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${source.asset._ref.replace('image-', '').replace('-webp', '.webp').replace('-png', '.png').replace('-jpg', '.jpg').replace('-jpeg', '.jpeg')}`;
}

// Portable TextをHTMLに変換する高機能な関数
function renderPortableText(blocks) {
  if (!blocks) return { html: '', headings: [], scripts: [] };

  let html = '';
  const headings = [];
  const scripts = [];
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
        const scriptRegex = /<script.*?>(.*?)<\/script>/s;
        const scriptMatch = block.code.match(scriptRegex);
        
        // scriptタグ以外のHTML部分を追加
        html += block.code.replace(scriptRegex, '');

        // scriptの中身を配列に保存
        if (scriptMatch && scriptMatch[1]) {
          scripts.push(scriptMatch[1]);
        }
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
  return { html, headings, scripts };
}


async function fetchArticleBySlug(slug) {
  const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"]{
    _id,
    title,
    slug,
    description,
    "mainImageUrl": mainImage.asset->url,
    publishedAt, // Add publishedAt field
    body[]{
      ...,
      _type == "image" => {
        "asset": @.asset->
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

  // Display published date
  const dateElement = document.getElementById('article-date');
  if (article.publishedAt) {
    const date = new Date(article.publishedAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = `公開日: ${date.toLocaleDateString('ja-JP', options)}`;
  } else {
    dateElement.style.display = 'none';
  }

  const mainImageElement = document.getElementById('article-main-image');
  if (article.mainImageUrl) {
    mainImageElement.src = article.mainImageUrl;
    mainImageElement.alt = article.title;
  } else {
    mainImageElement.style.display = 'none';
  }

  const { html: articleBodyHtml, headings, scripts } = renderPortableText(article.body);
  document.getElementById('article-body').innerHTML = articleBodyHtml;

  // 抽出したスクリプトを実行
  if (scripts.length > 0) {
    scripts.forEach(scriptBody => {
      try {
        const scriptElement = document.createElement('script');
        scriptElement.textContent = scriptBody;
        document.body.appendChild(scriptElement);
      } catch (e) {
        console.error('Failed to execute affiliate script:', e);
      }
    });
  }

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

  // Google Analyticsにページビューイベントを送信
  if (typeof gtag === 'function') { // gtag関数が存在するか確認
    gtag('event', 'page_view', {
      page_title: document.title, // ページのタイトル
      page_path: window.location.pathname + window.location.search // ページのパスとクエリパラメータ
    });
    console.log('GA page_view event sent for:', document.title); // デバッグ用
  }
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