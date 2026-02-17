import Footer from '@/components/Footer';

export default function SnsPage() {
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
        <h1 className="text-3xl font-bold mb-8 text-[#222]">SNS</h1>

        <div className="max-w-[400px] mx-auto flex flex-col gap-4">
          <a href="https://jp.mercari.com/user/profile/546972285" target="_blank" rel="noopener noreferrer" className="bg-[#EA352D] text-white py-4 px-6 rounded-lg hover:bg-[#c41e16] transition-all transform hover:scale-105 shadow-lg flex flex-col items-center justify-center gap-1 group">
            <span className="text-xs font-bold text-yellow-300 animate-pulse">いらっしゃいませーいらっしゃいませー</span>
            <span className="text-xl font-bold">メルカリ</span>
          </a>
          <a href="https://x.com/NEKOMASA28" target="_blank" rel="noopener noreferrer" className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors">X (旧Twitter)</a>
          <a href="https://store.line.me/stickershop/product/31434013/ja" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">LINEスタンプ</a>
          <a href="https://www.youtube.com/@mii-channel" target="_blank" rel="noopener noreferrer" className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors">YouTube(ミーちゃんネル)</a>
          <a href="https://www.instagram.com/yukimasa_gram" target="_blank" rel="noopener noreferrer" className="bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors">Instagram</a>
          <p className="text-sm text-gray-600 mt-4">(YouTubeとInstagramは現在、個人アカウントで運用中です。今後NEKOMASA用アカウントに移行予定です)</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}