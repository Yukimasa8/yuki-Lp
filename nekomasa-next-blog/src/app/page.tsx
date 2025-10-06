import { client, urlFor } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';

async function getPosts(): Promise<Array<{
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  publishedAt: string;
  mainImageUrl: string;
  categories: Array<{ _id: string, title: string }>;
}>> {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      publishedAt,
      "mainImageUrl": mainImage.asset->url,
      "categories": categories[]->{
        _id,
        title
      }
    }
  `;
  const posts = await client.fetch(query);
  return posts;
}

export default async function HomePage() {
  const posts = await getPosts();
  console.log("Fetched posts:", JSON.stringify(posts, null, 2));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">ネコマサBLOG</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/articles/${post.slug.current}`} key={post._id} className="block border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            {post.mainImageUrl && (
              <div className="relative w-full h-48">
                <Image
                  src={urlFor(post.mainImageUrl).url()}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              {post.categories && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.categories.map((category) => (
                    <span key={category._id} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-gray-600 text-sm mb-2">{new Date(post.publishedAt).toLocaleDateString('ja-JP')}</p>
              <p className="text-gray-700 text-base line-clamp-3">{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
