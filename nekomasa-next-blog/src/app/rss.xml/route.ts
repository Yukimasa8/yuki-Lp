import RSS from 'rss';
import { client } from '@/lib/sanity';

// Sanityから取得する投稿の型定義
type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  publishedAt: string;
};

// サイトのドメイン
const siteUrl = 'https://nekomasa.com';

export async function GET() {
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
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      publishedAt,
    }
  `;
  const posts: Post[] = await client.fetch(query);

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

  // XML形式でレスポンスを返す
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
