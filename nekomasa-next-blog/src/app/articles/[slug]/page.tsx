import { client, urlFor } from '@/lib/sanity';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import Image from 'next/image';
import Link from 'next/link';
import ViewCounter from '@/components/ViewCounter';
import Footer from '@/components/Footer';

export const revalidate = 60;

// Function to fetch a single post by slug
async function getPostBySlug(slug: string) {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
      publishedAt,
      views,
      _updatedAt,
      dajareLevel,
      gorioshiLevel,
      "mainImageUrl": mainImage.asset->url,
      body[]{
        ...,
        _type == "customImage" => {
          asset->{_ref, _type, url},
          size,
          alt,
        },
      },
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

import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const readingTime = Math.ceil(post.body.reduce((acc: number, block: any) => {
    if (block._type === 'block' && block.children) {
      return acc + block.children.reduce((charCount: number, span: any) => charCount + span.text.length, 0);
    }
    return acc;
  }, 0) / 500);

  return (
    <div className="container mx-auto p-4 font-sans text-[#222]">
      <header className="flex flex-col md:flex-row justify-between items-center py-5 px-4 md:px-10 bg-white border-b border-gray-200 mb-8">
        <div className="flex flex-col items-center gap-2 mb-4 md:mb-0">
          <Link href="/#top">
            <Image src="/nekomasalogo3.png" alt="NEKOMASA ロゴ" width={200} height={60} className="h-[60px] w-auto brightness-0" />
          </Link>
          <p className="text-gray-500 text-sm text-center font-normal">
            節約術･時間術など生活に役立つ情報を<br />
            ダジャレベルと共に発信しています<br />
            <Link href="/dajare-level" className="underline hover:no-underline text-gray-500 hover:text-[#00aaff] transition-colors">ダジャレベルとは...</Link>
          </p>
        </div>
        {/* Navigation placeholder - can be componentized later */}
        <nav>
          <ul className="flex flex-wrap justify-center gap-6 list-none p-0 m-0">
            <li><Link href="/#top" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">トップ</Link></li>
            <li><Link href="/#latest-articles" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">ブログ</Link></li>
            <li><Link href="/music" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">音楽</Link></li>
            <li><Link href="/nft" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">NFT</Link></li>
            <li><Link href="/profile" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">プロフィール</Link></li>
            <li><Link href="/sns" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">SNS</Link></li>
          </ul>
        </nav>
      </header>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">{post.title}</h1>
        {post.mainImageUrl && (
          <div className="relative w-full aspect-[4/3] mb-6 rounded-lg overflow-hidden shadow-md">
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
          <div className="flex justify-center items-center mt-2 gap-4">
            <ViewCounter id={post._id} initialViews={post.views ?? 0} />
            {post._updatedAt && new Date(post._updatedAt).getTime() > new Date(post.publishedAt).getTime() && (
              <p>更新日: {new Date(post._updatedAt).toLocaleDateString('ja-JP')}</p>
            )}
          </div>
        </div>

        {/* Dajare and Gorioshi Levels */}
        {(post.dajareLevel || post.gorioshiLevel) && (
          <div className="flex justify-center items-center gap-6 mb-8 text-sm md:text-base">
            {post.dajareLevel && (
              <div className="flex items-center">
                <span className="mr-2 font-bold text-gray-700">ダジャレベル</span>
                <span className="text-[#222] tracking-widest text-lg">
                  {'★'.repeat(post.dajareLevel)}{'☆'.repeat(5 - post.dajareLevel)}
                </span>
              </div>
            )}
            {post.gorioshiLevel && (
              <div className="flex items-center">
                <span className="mr-2 font-bold text-gray-700">ゴリ押し度</span>
                <span className="text-[#222] tracking-widest text-lg">
                  {'★'.repeat(post.gorioshiLevel)}{'☆'.repeat(5 - post.gorioshiLevel)}
                </span>
              </div>
            )}
          </div>
        )}

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

      <Footer />
    </div>
  );
}
