import DajareLevelContent from '@/components/DajareLevelContent';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function DajareLevelPage() {
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
                        <span className="text-black font-bold">ダジャレベルとは...</span>
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

            <main>
                <DajareLevelContent />
            </main>

            <Footer />
        </div>
    );
}
