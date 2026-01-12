import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="text-center mt-16 pt-8 pb-8 bg-white border-t border-gray-200 text-[#444] text-sm">
            <p>
                このページはバイブコーディングで作成しています<br />
                &copy; 2025 ネコマサBLOG. All Rights Reserved.<br />
                <Link href="/privacy-policy" className="text-[#333] underline hover:text-[#111] hover:no-underline transition-colors">プライバシーポリシー</Link> | <Link href="/environment" className="text-[#333] underline hover:text-[#111] hover:no-underline transition-colors">開発環境について</Link> | <Link href="/contact" className="text-[#333] underline hover:text-[#111] hover:no-underline transition-colors">お問い合わせ</Link>
            </p>
        </footer>
    );
}
