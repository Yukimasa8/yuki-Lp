import Footer from '@/components/Footer';

export default function MusicPage() {
  return (
    <div className="container mx-auto p-4 font-sans text-[#222]">
      <header className="flex flex-col md:flex-row justify-between items-center py-5 px-4 md:px-10 bg-white border-b border-gray-200 mb-8">
        <div className="flex flex-col items-center gap-2 mb-4 md:mb-0">
          <a href="/#top">
            <img src="/nekomasalogo3.png" alt="NEKOMASA ロゴ" className="h-[60px] w-auto brightness-0" />
          </a>
          <p className="text-gray-500 text-sm text-center font-normal">
            節約術･時間術など生活に役立つ情報を<br />
            ダジャレベルと共に発信しています<br />
            <a href="/dajare-level" className="underline hover:no-underline text-gray-500 hover:text-[#00aaff] transition-colors">ダジャレベルとは...</a>
          </p>
        </div>
        <nav>
          <ul className="flex flex-wrap justify-center gap-6 list-none p-0 m-0">
            <li><a href="/#top" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">トップ</a></li>
            <li><a href="/#latest-articles" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">ブログ</a></li>
            <li><a href="/music" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">音楽</a></li>
            <li><a href="/nft" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">NFT</a></li>
            <li><a href="/profile" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">プロフィール</a></li>
            <li><a href="/sns" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">SNS</a></li>
          </ul>
        </nav>
      </header>

      <main className="text-center py-12 px-4 my-8">
        <h1 className="text-3xl font-bold mb-8 text-[#222]">音楽</h1>

        <div className="max-w-[600px] mx-auto flex flex-col gap-8">
          <h2 className="text-2xl font-semibold text-[#222]">SUNOで作成した音楽</h2>
          <p className="text-lg text-gray-700">
            曲名 <a href="https://suno.com/s/2SDXd97eMylpqPLu" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TIME CRUSHER</a><br />
            <small>（生産性ロック）</small>
          </p>
          <p className="text-base text-gray-600">AIで作成した音楽です。ぜひお聴きください。</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}