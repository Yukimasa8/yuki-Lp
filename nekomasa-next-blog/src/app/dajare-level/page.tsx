import DajareLevelContent from '@/components/DajareLevelContent';
import Link from 'next/link';
import Image from 'next/image';

export default function DajareLevelPage() {
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
                        <span className="text-black font-bold">ダジャレベルとは...</span>
                    </p>
                </div>
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

            <main>
                <DajareLevelContent />
            </main>

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
