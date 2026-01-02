import { client, urlFor } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

async function getPosts(): Promise<Array<{
  _id: string;
  title: string;
  slug?: { current: string } | null;
  description: string;
  publishedAt: string;
  mainImageUrl: string;
  views?: number;
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


export default async function HomePage() {
  const posts = await getPosts();
  console.log("Fetched posts:", JSON.stringify(posts, null, 2));

  return (
    <div className="container mx-auto p-4 font-sans text-[#222]">
      <header className="flex flex-col md:flex-row justify-between items-center py-5 px-4 md:px-10 bg-white border-b border-gray-200 mb-8">
        <div className="flex flex-col items-center gap-2 mb-4 md:mb-0">
          <Link href="/">
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
            <li><Link href="/" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">ブログ</Link></li>
            <li><Link href="/music" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">音楽</Link></li>
            <li><Link href="/nft" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">NFT</Link></li>
            <li><Link href="/profile" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">プロフィール</Link></li>
            <li><Link href="/sns" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">SNS</Link></li>
          </ul>
        </nav>
      </header>

      <div className="text-center py-12 px-4 my-8">
        <div className="max-w-[800px] mx-auto leading-[2.8] font-bold text-base md:text-[1.1em] text-[#222]">
          <p className="mb-8 text-lg md:text-[1.3em]">
            Nekomasa.com は、<br />
            日常に「クスっ」と<br />
            笑える余白を。
          </p>
          <p className="mb-8">
            ネコマサは、<br />
            ダジャレというユーモアが<br />
            忙しい日々の中で心をゆるめ、<br />
            ちょっとした潤いや活力を<br />
            与えてくれると信じています。
          </p>
          <p className="mt-10 mb-8">
            本サイトは、<br />
            皆さまにとっての<br />
            いわば<br />
            「ダジャレのサードプレイス」<br />
            として、<br />
            気軽に立ち寄り、<br />
            気づけば笑っている<br />
            そんな、心の休憩所を目指しています。
          </p>
          <p className="mt-10 mb-8">
            便利用品の活用術や<br />
            生活のちょっとした<br />
            改善アイデアを、<br />
            ネコマサ独自の観点と<br />
            ダジャレを添えてお届けしながら、<br />
            楽しく・愛しく・前向きな<br />
            気分をお届けします。
          </p>
          <p className="mt-10">
            今日もあなたが、<br />
            ひと笑いできる<br />
            きっかけとなれますように。
          </p>
        </div>
        <p className="text-2xl md:text-[1.5em] font-bold mt-12 tracking-widest text-[#222]">笑う門には福来る</p>
        <p className="text-lg md:text-[1.2em] font-bold mt-2 tracking-widest text-[#222]">(企業理念風)</p>
      </div>

      <div className="text-center mb-8">
        <Link href="/categories" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
          カテゴリー一覧を見る
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-10 text-center text-[#222]">最新記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      <footer className="text-center mt-16 pt-8 pb-8 bg-white border-t border-gray-200 text-[#444] text-sm">
        <p>
          このページはバイブコーディングで作成しています<br />
          &copy; 2025 ネコマサBLOG. All Rights Reserved.<br />
          <Link href="/privacy-policy" className="text-[#333] underline hover:text-[#111] hover:no-underline transition-colors">プライバシーポリシー</Link> | <Link href="/environment" className="text-[#333] underline hover:text-[#111] hover:no-underline transition-colors">開発環境について</Link>
        </p>
      </footer>
    </div>
  );
}
