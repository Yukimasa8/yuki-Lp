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
    <div className="container mx-auto p-4 font-sans text-[#111]">
      <header className="flex flex-col md:flex-row justify-between items-center py-5 px-4 md:px-10 bg-white border-b border-gray-200 shadow-sm mb-8">
        <div className="flex flex-col items-center gap-2 mb-4 md:mb-0">
          <Link href="/">
            <Image src="/nekomasalogo3.png" alt="NEKOMASA ロゴ" width={200} height={60} className="h-[60px] w-auto brightness-0" />
          </Link>
          <p className="text-gray-500 text-sm text-center font-normal">
            節約術･時間術など生活に役立つ情報を<br />
            ダジャレベルと共に発信しています
          </p>
        </div>
        {/* Navigation placeholder - can be componentized later */}
        <nav>
          <ul className="flex flex-wrap justify-center gap-6 list-none p-0 m-0">
            <li><Link href="/" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">ブログ</Link></li>
            <li><span className="text-gray-400 cursor-not-allowed">音楽</span></li>
            <li><span className="text-gray-400 cursor-not-allowed">NFT</span></li>
            <li><span className="text-gray-400 cursor-not-allowed">プロフィール</span></li>
            <li><span className="text-gray-400 cursor-not-allowed">SNS</span></li>
          </ul>
        </nav>
      </header>

      <div className="text-center py-12 px-4 my-8">
        <div className="max-w-[800px] mx-auto leading-[2.8] font-bold text-sm md:text-[1.1em] text-[#222]">
          <p className="mb-8 text-base md:text-[1.3em]">
            Nekomasa.com は、<br className="hidden md:inline" />
            日常に「クスっ」と笑える余白を。
          </p>
          <p className="mb-8">
            ネコマサは、ダジャレというユーモアが<br className="hidden md:inline" />
            忙しい日々の中で心をゆるめ、<br className="hidden md:inline" />
            ちょっとした潤いや活力を<br className="md:hidden" />与えてくれると信じています。
          </p>
          <p className="mt-10 mb-8">
            本サイトは、皆さまにとっての<br className="hidden md:inline" />
            いわば「ダジャレのサードプレイス」として、<br className="hidden md:inline" />
            気軽に立ち寄り、気づけば笑っている――<br className="hidden md:inline" />
            そんな、心の休憩所を目指しています。
          </p>
          <p className="mt-10 mb-8">
            便利用品の活用術や<br className="md:hidden" />生活のちょっとした改善アイデアを、<br className="hidden md:inline" />
            ネコマサ独自の観点と<br className="md:hidden" />ダジャレを添えてお届けしながら、<br className="hidden md:inline" />
            楽しく・愛しく・<br className="md:hidden" />前向きな気分をお届けします。
          </p>
          <p className="mt-10">
            今日もあなたが、<br className="md:hidden" />ひと笑いできるきっかけとなれますように。
          </p>
        </div>
        <p className="text-xl md:text-[1.5em] font-bold mt-12 tracking-widest text-[#111]">笑う門には福来る</p>
        <p className="text-base md:text-[1.2em] font-bold mt-2 tracking-widest text-[#111]">(企業理念風)</p>
      </div>

      <h2 className="text-2xl font-bold mb-10 text-center text-[#222]">最新記事</h2>
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
