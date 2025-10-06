import { client, urlFor } from '@/lib/sanity';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import Image from 'next/image';
import Link from 'next/link';

// Function to fetch a single post by slug
async function getPostBySlug(slug: string) {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
      publishedAt,
      _updatedAt,
      "mainImageUrl": mainImage.asset->url,
      body,
      "categories": categories[]->{title, "slug": slug.current},
      "tags": tags[]->{title, slug},
    }
  `;
  const post = await client.fetch(query, { slug });
  return post;
}

// Function to generate static paths for all posts
export async function generateStaticParams() {
  const query = `
    *[_type == "post"]{
      slug
    }
  `;
  const posts: Array<{ slug: { current: string } }> = await client.fetch(query);
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <div className="container mx-auto p-4 text-center text-red-500">記事が見つかりませんでした。</div>;
  }

  const readingTime = Math.ceil(post.body.reduce((acc: number, block: any) => {
    if (block._type === 'block' && block.children) {
      return acc + block.children.reduce((charCount: number, span: any) => charCount + span.text.length, 0);
    }
    return acc;
  }, 0) / 500);

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">{post.title}</h1>
      {post.mainImageUrl && (
        <div className="relative w-full h-64 md:h-80 mb-6 rounded-lg overflow-hidden shadow-md">
          <Image
            src={urlFor(post.mainImageUrl).url()}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
            priority
          />
        </div>
      )}
      <div className="text-gray-600 text-sm mb-6 text-center">
        <p>{new Date(post.publishedAt).toLocaleDateString('ja-JP')} ・ 約{readingTime}分で読めます</p>
        {post._updatedAt && new Date(post._updatedAt).getTime() > new Date(post.publishedAt).getTime() && (
          <p className="mt-1">更新日: {new Date(post._updatedAt).toLocaleDateString('ja-JP')}</p>
        )}
      </div>

      {/* Categories */}
      {post.categories && post.categories.length > 0 && (
        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold mb-2">カテゴリー</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {post.categories.map((category: any) => (
              <Link
                key={category.title} // Using title as key for now, will use _id later
                href={`/categories/${category.slug?.current || category.title}`} // Fallback to title if slug is null
                className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="prose lg:prose-lg mx-auto">
        <PortableTextRenderer blocks={post.body} />
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold mb-2">関連タグ</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {post.tags.map((tag: any) => (
              <Link
                key={tag.slug?.current || tag.title} // Using slug as key, fallback to title
                href={`/tags/${tag.slug?.current || tag.title}`}
                className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                {tag.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
