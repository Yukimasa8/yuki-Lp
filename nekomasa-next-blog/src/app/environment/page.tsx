import Footer from '@/components/Footer';

export default function EnvironmentPage() {
  return (
    <div className="container mx-auto p-4 font-sans text-[#222]">
      <header className="flex flex-col md:flex-row justify-between items-center py-5 px-4 md:px-10 bg-white border-b border-gray-200 mb-8">
        <div className="flex flex-col items-center gap-2 mb-4 md:mb-0">
          <a href="/">
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
            <li><a href="/" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">ブログ</a></li>
            <li><a href="/music" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">音楽</a></li>
            <li><a href="/nft" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">NFT</a></li>
            <li><a href="/profile" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">プロフィール</a></li>
            <li><a href="/sns" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">SNS</a></li>
          </ul>
        </nav>
      </header>

      <main className="text-center py-12 px-4 my-8">
        <h1 className="text-3xl font-bold mb-8 text-[#222]">開発環境</h1>

        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-lg text-gray-700">当サイトは、サーバー代の月額約970円で運営しています。<br />※ネコマサの猫件費(ニャンケンヒ)は含まれておりません。</p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#222]">サーバー</h2>
            <p className="text-lg text-gray-700">ConoHaWing(月額約970円)</p>

            <h2 className="text-2xl font-semibold text-[#222]">ホスティング</h2>
            <p className="text-lg text-gray-700">GitHub Pages(無料)</p>

            <h2 className="text-2xl font-semibold text-[#222]">実行環境</h2>
            <p className="text-lg text-gray-700">Node.js(無料)</p>

            <h2 className="text-2xl font-semibold text-[#222]">ペアプログラミング</h2>
            <p className="text-lg text-gray-700">Gemini CLI(無料)</p>

            <h2 className="text-2xl font-semibold text-[#222]">プログラミングエディタ</h2>
            <p className="text-lg text-gray-700">Visual Studio Code(無料)</p>

            <h2 className="text-2xl font-semibold text-[#222]">パソコンOS</h2>
            <p className="text-lg text-gray-700">Windows11</p>

            <h2 className="text-2xl font-semibold text-[#222]">ブログ</h2>
            <p className="text-lg text-gray-700">Sanity(無料)</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}