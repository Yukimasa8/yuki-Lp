import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity'; // Sanityクライアントのインポート

// Sanityから記事のslugと更新日時を取得する関数
async function getPostsForSitemap(): Promise<Array<{ slug: string, publishedAt: string }>> {
  const query = `*[_type == "post" && defined(slug.current) && publishedAt < now()] {
    "slug": slug.current,
    "publishedAt": publishedAt
  }`;
  const posts = await client.fetch(query);
  return posts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostsForSitemap();

  const postEntries: MetadataRoute.Sitemap = posts.map(({ slug, publishedAt }) => ({
    url: `https://nekomasa.com/articles/${slug}`,
    lastModified: publishedAt,
    changeFrequency: 'weekly', // 記事の更新頻度に合わせて調整
    priority: 0.8, // 記事ページの優先度
  }));

  return [
    {
      url: 'https://nekomasa.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postEntries,
  ];
}