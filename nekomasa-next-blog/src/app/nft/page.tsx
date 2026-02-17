import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function NftPage() {
  return (
    <div className="container mx-auto p-4 font-sans text-[#222]">
      <Header />

      <main className="text-center py-12 px-4 my-8">
        <h1 className="text-3xl font-bold mb-8 text-[#222]">NFT</h1>

        <div className="max-w-[600px] mx-auto flex flex-col gap-8">
          <h2 className="text-2xl font-semibold text-[#222]">OpenSeaで出品中のNFT</h2>
          <img src="/The-long-way around-is-the-shortest-way.jpeg" alt="The-long-way around-is-the-shortest-way NFT" className="mx-auto max-w-[50%] h-auto mb-4" />
          <p>
            <a href="https://opensea.io/item/polygon/0xf589a5bdd587b262ac4c93e5f6e5eda96cea70a0/1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenSeaで見る</a>
          </p>
          <p>
            <a href="https://opensea.io/ja/collection/survival-wisdom-calligraphy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NFTコレクション「Survival Wisdom Calligraphy」を見る</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}