const RSS = require('rss');
const { writeFileSync } = require('fs');
const { join } = require('path');
const fetch = require('node-fetch').default; // Using node-fetch for simplicity

// Sanityから取得する投稿の型定義 (JSDocで対応)
/**
 * @typedef {object} Post
 * @property {string} _id
 * @property {string} title
 * @property {{ current: string }} slug
 * @property {string} description
 * @property {string} publishedAt
 */

// Sanity API設定
const projectId = 'xm3dmjar';
const dataset = 'production';
const apiVersion = '2023-05-03';
const sanityApiUrl = `https://${projectId}.sanity.io/v${apiVersion}/data/query/${dataset}`;

// サイトのドメイン
const siteUrl = 'https://nekomasa.com';

async function generateRssFeed() {
  // RSSフィードの基本情報を設定
  const feed = new RSS({
    title: 'ネコマサBLOG',
    description: '節約術･時間術など生活に役立つ情報をダジャレベルと共に発信しています',
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    language: 'ja',
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, ネコマサBLOG`,
  });

  // Sanityから全記事を取得するクエリ
  const query = encodeURIComponent(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      publishedAt,
    }
  `);
  
  const response = await fetch(`${sanityApiUrl}?query=${query}`);
  
  if (!response.ok) {
    console.error(`Sanity API responded with status: ${response.status} ${response.statusText}`);
    throw new Error('Failed to fetch posts from Sanity API');
  }

  const data = await response.json();
  const posts = data.result;

  if (!posts) {
    console.error('Sanity API response did not contain a "result" property or it was null/undefined.');
    throw new Error('Invalid response from Sanity API');
  }

  // 取得した記事をフィードに追加
  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${siteUrl}/articles/${post.slug.current}`, // 記事への完全なURL
      guid: post._id, // 各記事の一意なID
      date: post.publishedAt, // 公開日
    });
  });

  // XMLを生成
  const xml = feed.xml({ indent: true });

  // publicディレクトリにrss.xmlを書き出す
  const publicDir = join(process.cwd(), 'public');
  const rssFilePath = join(publicDir, 'rss.xml');
  writeFileSync(rssFilePath, xml);

  console.log('RSS feed generated successfully at', rssFilePath);
}

generateRssFeed().catch((err) => {
  console.error('Error generating RSS feed:', err);
  process.exit(1);
});