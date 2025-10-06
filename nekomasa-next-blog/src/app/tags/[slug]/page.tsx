import { client, urlFor } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';

// Function to fetch all tags
async function getAllTags(): Promise<Array<{ title: string, slug: { current: string } }>> {
  const query = `
    *[_type == "tag"]{
      title,
      slug
    }
  `;
  const tags = await client.fetch(query);
  return tags;
}

// Function to fetch posts by tag slug
async function getPostsByTagSlug(tagSlug: string): Promise<Array<{
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  publishedAt: string;
  mainImageUrl: string;
}>> {
  const query = `
    *[_type == "post" && references(*[_type=="tag" && slug.current == $tagSlug]._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      publishedAt,
      "mainImageUrl": mainImage.asset->url,
    }
  `;
  const posts = await client.fetch(query, { tagSlug });
  return posts;
}

// Function to generate static paths for all tags
export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    slug: tag.slug.current,
  }));
}

export default async function TagPage({ params }: { params: { slug: string } }) {
  const allTags = await getAllTags();
  const currentTag = allTags.find(tag => tag.slug.current === params.slug);

  if (!currentTag) {
    return <div className="container mx-auto p-4 text-center text-red-500">タグが見つかりませんでした。</div>;
  }

  const posts = await getPostsByTagSlug(params.slug);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">タグ: {currentTag.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">このタグに関連する記事はまだありません。</p>
        ) : (
          posts.map((post) => (
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
                <p className="text-gray-600 text-sm mb-2">{new Date(post.publishedAt).toLocaleDateString('ja-JP')}</p>
                <p className="text-gray-700 text-base line-clamp-3">{post.description}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
