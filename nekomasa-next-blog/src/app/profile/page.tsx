import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 font-sans text-[#222]">
      <Header />

      <main className="py-12 px-4 my-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#222]">プロフィール</h1>

        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-6 text-[#222]">NEKOMASA</h2>
          <img src="/nekomasa.png" alt="ネコマサのプロフィール画像" className="w-48 h-48 rounded-full object-cover mx-auto mb-6" />

          <ul className="space-y-4 text-gray-700">
            <li><strong className="text-[#222] block mb-1">職業</strong> ネコ型人間会社員</li>
            <li><strong className="text-[#222] block mb-1">年齢</strong> 心は28(ニャー)歳<br />中身はオッサンかも...</li>
            <li><strong className="text-[#222] block mb-1">好きな音楽</strong>
              <a href="https://www.instagram.com/reel/CZoNVn0hwJc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">プログレッシブメタル</a><br />
              <a href="https://www.instagram.com/reel/CojVbd6jHzi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">メロディックスピードメタル</a><br />
              デスメタル
            </li>
            <li><strong className="text-[#222] block mb-1">趣味</strong> 飼い猫で元野良猫・<a href="https://www.instagram.com/p/BiNuzxFFa75/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">現押入れアイドルのミーちゃん</a>に<br />ちゅーるを献上しツン9割デレ1割の割合を逆転させること<br /><br />
              ツンデレ割合を逆転させるためにちゅーるを献上している動画はこちらです(
              <a href="https://www.instagram.com/p/CDk1Rg-Bdw5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">顔出しなし</a> /
              <a href="https://www.instagram.com/p/CF8gEqXBF_7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">顔出しあり</a>)<br /><br />
              CM出演オファー(スカウト)いつでも待ってます<span className="text-red-500">❤</span><br />
              <a href="https://www.instagram.com/p/B2E30DQB2no/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">グラビアポーズ</a>もできます<span className="text-red-500">❤</span>
            </li>
            <li><strong className="text-[#222] block mb-1">最近の目標</strong> 建設開始から3年ほど経ちサグラダ・ファミリアと<br />化した<a href="https://www.instagram.com/p/B-KTZsyhKpS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">建設中のねこちぐら</a>を<span className="inline-block">完成させること</span><br /><br />2026年2月8日に屋号「NEKOMASA」の開業届を出すこと</li>
          </ul>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-[#222]">現在のミーちゃんのツンデレ度</h3>
            <p className="text-gray-600 mb-4">(ツンデレパラメーター)</p>
            <div className="flex w-full h-12 rounded-full overflow-hidden shadow-inner">
              <div className="bg-[#00aaff] h-full text-white font-bold flex items-center justify-center text-base transition-all hover:bg-[#0088cc]" style={{ width: '70%' }}>
                ツン 70% 💔
              </div>
              <div className="bg-pink-400 h-full text-white font-bold flex items-center justify-center text-base transition-all hover:bg-pink-500" style={{ width: '30%' }}>
                デレ 30% ❤
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}