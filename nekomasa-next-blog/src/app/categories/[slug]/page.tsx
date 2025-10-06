import { client, urlFor } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';

// Simple slugify function for Japanese titles
function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

// Function to fetch all categories
async function getAllCategories(): Promise<Array<{ _id: string, title: string }>> {
  const query = `
    *[_type == "category"]{
      _id,
      title
    }
  `;
  const categories = await client.fetch(query);
  return categories;
}

// Function to fetch posts by category title
async function getPostsByCategoryTitle(categoryTitle: string): Promise<Array<{
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  publishedAt: string;
  mainImageUrl: string;
}>> {
  const query = `
    *[_type == "post" && references(*[_type=="category" && title == $categoryTitle]._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      publishedAt,
      "mainImageUrl": mainImage.asset->url,
    }
  `;
  const posts = await client.fetch(query, { categoryTitle });
  return posts;
}

// Function to generate static paths for all categories
export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    slug: slugify(category.title),
  }));
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const allCategories = await getAllCategories();
  const currentCategory = allCategories.find(cat => slugify(cat.title) === params.slug);

  if (!currentCategory) {
    return <div className="container mx-auto p-4 text-center text-red-500">カテゴリーが見つかりませんでした。</div>;
  }

  const posts = await getPostsByCategoryTitle(currentCategory.title);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">カテゴリー: {currentCategory.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">このカテゴリーに関連する記事はまだありません。</p>
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
