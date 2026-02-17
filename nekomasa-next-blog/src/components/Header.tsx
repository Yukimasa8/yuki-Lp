import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center py-5 px-4 md:px-10 bg-white border-b border-gray-200 mb-8">
            <div className="flex flex-col items-center gap-2 mb-4 md:mb-0">
                <h1 className="leading-none">
                    <Link href="/#top">
                        <Image src="/nekomasalogo3.png" alt="ネコマサブログ(NEKOMASA)" width={200} height={60} className="h-[60px] w-auto brightness-0" />
                    </Link>
                </h1>
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
                    <li><Link href="/golf" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">ゴルフ</Link></li>
                    <li><Link href="/music" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">音楽</Link></li>
                    <li><Link href="/nft" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">NFT</Link></li>
                    <li><Link href="/profile" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">プロフィール</Link></li>
                    <li><Link href="/sns" className="text-[#222] font-medium text-base hover:text-[#00aaff] transition-colors duration-300">SNS</Link></li>
                </ul>
            </nav>
        </header>
    );
}
