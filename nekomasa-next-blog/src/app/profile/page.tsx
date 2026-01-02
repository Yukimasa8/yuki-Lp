export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 font-sans text-[#222]">
      <header className="flex flex-col md:flex-row justify-between items-center py-5 px-4 md:px-10 bg-white border-b border-gray-200 shadow-sm mb-8">
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

      <main className="py-12 px-4 my-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#222]">プロフィール</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-[#222]">NEKOMASA</h2>
          <img src="/nekomasa.png" alt="ネコマサのプロフィール画像" className="w-48 h-48 rounded-full object-cover mx-auto mb-6" />
          
          <ul className="space-y-4 text-gray-700">
            <li><strong className="text-[#222]">職業</strong> ネコ型人間会社員</li>
            <li><strong className="text-[#222]">年齢</strong> 心は28(ニャー)歳<br />中身はオッサンかも...</li>
            <li><strong className="text-[#222]">好きな音楽</strong> 
              <a href="https://www.instagram.com/reel/CZoNVn0hwJc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">プログレッシブメタル</a><br />
              <a href="https://www.instagram.com/reel/CojVbd6jHzi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">メロディックスピードメタル</a><br />
              デスメタル
            </li>
            <li><strong className="text-[#222]">趣味</strong> 飼い猫で元野良猫・<a href="https://www.instagram.com/p/BiNuzxFFa75/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">現押入れアイドルのミーちゃん</a>に<br />ちゅーるを献上しツン9割デレ1割の割合を逆転させること<br /><br />
              ツンデレ割合を逆転させるためにちゅーるを献上している動画はこちらです( 
              <a href="https://www.instagram.com/p/CDk1Rg-Bdw5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">顔出しなし</a> / 
              <a href="https://www.instagram.com/p/CF8gEqXBF_7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">顔出しあり</a>)<br /><br />
              CM出演オファー(スカウト)いつでも待ってます<span className="text-red-500">❤</span><br />
              <a href="https://www.instagram.com/p/B2E30DQB2no/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">グラビアポーズ</a>もできます<span className="text-red-500">❤</span>
            </li>
            <li><strong className="text-[#222]">最近の目標</strong> 建設開始から3年ほど経ちサグラダ・ファミリアと<br />化した<a href="https://www.instagram.com/p/B-KTZsyhKpS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">建設中のねこちぐら</a>を<span className="inline-block">完成させること</span><br /><br />2026年2月8日に株式会社NEKOMASAを設立すること</li>
          </ul>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-[#222]">現在のミーちゃんのツンデレ度</h3>
            <p className="text-gray-600 mb-4">(ツンデレパラメーター)</p>
            <div className="bg-gray-200 rounded-full h-8 overflow-hidden">
              <div className="bg-red-500 h-full text-white text-sm flex items-center justify-center" style={{width: '70%'}}>
                ツン 70% 💔
              </div>
              <div className="bg-pink-500 h-full text-white text-sm flex items-center justify-end pr-2" style={{width: '30%', marginLeft: '70%'}}>
                デレ 30%
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center mt-16 pt-8 pb-8 bg-white border-t border-gray-200 text-[#444] text-sm">
        <p>
          このページはバイブコーディングで作成しています<br />
          &copy; 2025 ネコマサBLOG. All Rights Reserved.<br />
          <a href="/privacy-policy" className="text-[#333] underline hover:text-[#111] hover:no-underline transition-colors">プライバシーポリシー</a> | <a href="/environment" className="text-[#333] underline hover:text-[#111] hover:no-underline transition-colors">開発環境について</a>
        </p>
      </footer>
    </div>
  );
}