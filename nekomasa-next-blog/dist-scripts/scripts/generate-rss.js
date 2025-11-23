import RSS from 'rss';
import { writeFileSync } from 'fs';
import { join } from 'path';
// サイトのドメイン
const siteUrl = 'https://nekomasa.com';
async function generateRssFeed() {
    import { client } from '../../src/lib/sanity';
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
    const posts = await client.fetch(query);
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
