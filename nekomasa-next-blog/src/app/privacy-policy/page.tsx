import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
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

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#222]">プライバシーポリシー</h1>

        <div className="prose prose-lg max-w-none">
          <p>当サイト（以下、「当サイト」）は、以下の通りプライバシーポリシーを定めます。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#222]">1. 個人情報の利用目的</h2>
          <p>当サイトでは、お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#222]">2. 広告について</h2>
          <p>当サイトでは、第三者配信の広告サービス（Googleアドセンス、A8.netなど）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。</p>
          <p>Cookieを無効にする方法やGoogleアドセンスに関する詳細は「<a href="https://policies.google.com/technologies/ads?gl=jp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">広告 – ポリシーと規約 – Google</a>」をご確認ください。</p>
          <p>また、当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#222]">3. アクセス解析ツールについて</h2>
          <p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#222]">4. 免責事項</h2>
          <p>当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。</p>
          <p>また、当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。</p>
          <p>当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#222]">5. 著作権について</h2>
          <p>当サイトで掲載している文章や画像などにつきましては、無断転載することを禁止します。</p>
          <p>当サイトは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、お問い合わせフォームよりご連絡ください。迅速に対応いたします。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#222]">6. プライバシーポリシーの変更について</h2>
          <p>当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}