import { client, urlFor } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const revalidate = 60;

async function getGolfPosts(): Promise<Array<{
    _id: string;
    title: string;
    slug?: { current: string } | null;
    description: string;
    publishedAt: string;
    mainImageUrl: string;
    views?: number;
    categories: Array<{ _id: string, title: string }>;
}>> {
    // カテゴリが "golf" またはタイトルに "ゴルフ" を含む記事を取得（カテゴリ名が不明なため広めに検索）
    // 確実なのはカテゴリIDでの検索ですが、一旦テキストベースで検索します。
    // 必要に応じて Sanity のクエリを調整します。
    const query = `
    *[_type == "post" && count((categories[]->title)[@ match "ゴルフ" || @ match "Golf"]) > 0] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      publishedAt,
      "mainImageUrl": mainImage.asset->url,
      views,
      "categories": categories[]->{
        _id,
        title
      }
    }
  `;
    const posts = await client.fetch(query);
    return posts;
}

export default async function GolfPage() {
    const posts = await getGolfPosts();

    return (
        <div className="container mx-auto p-4 font-sans text-[#222]">
            <Header />

            <main className="text-center py-12 px-4 my-8">
                <h1 className="text-4xl font-bold mb-4 text-[#222]">ネコマサゴルフ</h1>
                <p className="text-lg md:text-xl font-medium text-gray-700 mb-12">
                    ボールの飛距離はもちろん、<br className="md:hidden" />
                    ダジャレの飛距離も飛ばします。<br /><br />
                    <span className="text-base md:text-lg">
                        「いやぁん、ばかぁん」を抜け出し、<br className="md:hidden" />
                        先に上がって「ジャンボお先」と<br className="md:hidden" />
                        言える日まで...
                    </span>
                </p>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        {posts.filter(post => post.slug?.current).map((post) => (
                            <Link href={`/articles/${post.slug!.current}`} key={post._id} className="block border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                {post.mainImageUrl && (
                                    <div className="relative w-full aspect-[4/3]">
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
                                    <p className="text-gray-600 text-sm mb-2">
                                        {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                                        {post.views !== undefined && (
                                            <span className="ml-3 text-gray-500 inline-flex items-center gap-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-4 h-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                                {post.views ?? 0} views
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-gray-700 text-base line-clamp-3">{post.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 mt-8">ゴルフ記事はまだありません。</p>
                )}
            </main>

            <Footer />
        </div>
    );
}
