import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function ContactPage() {
    return (
        <div className="container mx-auto p-4 font-sans text-[#222]">
            <header className="flex flex-col md:flex-row justify-between items-center py-5 px-4 md:px-10 bg-white border-b border-gray-200 mb-8">
                <div className="flex flex-col items-center gap-2 mb-4 md:mb-0">
                    <Link href="/#top">
                        <Image src="/nekomasalogo3.png" alt="NEKOMASA ロゴ" width={200} height={60} className="h-[60px] w-auto brightness-0" />
                    </Link>
                    <p className="text-gray-500 text-sm text-center font-normal">
                        節約術･時間術など生活に役立つ情報を<br />
                        ダジャレベルと共に発信しています<br />
                        <Link href="/dajare-level" className="underline hover:no-underline text-gray-500 hover:text-[#00aaff] transition-colors">ダジャレベルとは...</Link>
                    </p>
                </div>
                <nav>
                    <ul className="flex flex-wrap justify-center gap-6 list-none p-0 m-0">
                        <li><Link href="/#top" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">トップ</Link></li>
                        <li><Link href="/#latest-articles" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">ブログ</Link></li>
                        <li><Link href="/music" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">音楽</Link></li>
                        <li><Link href="/nft" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">NFT</Link></li>
                        <li><Link href="/profile" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">プロフィール</Link></li>
                        <li><Link href="/sns" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">SNS</Link></li>
                    </ul>
                </nav>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold mb-8 text-[#222]">お問い合わせ</h1>
                <p className="mb-8 text-lg">
                    当ブログに関するお問い合わせは、<br />
                    以下のSNSのダイレクトメッセージ(DM)にて承っております。
                </p>

                <div className="flex justify-center mb-12">
                    <a href="https://x.com/NEKOMASA28" target="_blank" rel="noopener noreferrer" className="bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                        <span>X (旧Twitter) で問い合わせる</span>
                    </a>
                </div>

                <p className="text-gray-600 text-sm">
                    ※ お問い合わせ内容によっては、回答にお時間をいただく場合や、回答できない場合がございます。あらかじめご了承ください。<br />
                    ※ Googleフォーム等の設置も順次検討してまいります。
                </p>
            </main>

            <Footer />
        </div>
    );
}
