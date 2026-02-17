import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function SnsPage() {
  return (
    <div className="container mx-auto p-4 font-sans text-[#222]">
      <Header />

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