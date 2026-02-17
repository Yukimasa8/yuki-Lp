import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function MusicPage() {
  return (
    <div className="container mx-auto p-4 font-sans text-[#222]">
      <Header />

      <main className="text-center py-12 px-4 my-8">
        <h1 className="text-3xl font-bold mb-8 text-[#222]">音楽</h1>

        <div className="max-w-[600px] mx-auto flex flex-col gap-8">
          <h2 className="text-2xl font-semibold text-[#222]">SUNOで作成した音楽</h2>
          <p className="text-lg text-gray-700">
            曲名 <a href="https://suno.com/s/2SDXd97eMylpqPLu" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TIME CRUSHER</a><br />
            <small>（生産性ロック）</small>
          </p>
          <p className="text-base text-gray-600">AIで作成した音楽です。ぜひお聴きください。</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}