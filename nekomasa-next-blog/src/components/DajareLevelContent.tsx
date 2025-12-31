'use client';

import { useState } from 'react';

type DajareVersion = 'normal' | 'dq' | 'hokuto' | 'seiya' | 'golf';

export default function DajareLevelContent() {
    const [activeVersion, setActiveVersion] = useState<DajareVersion>('normal');

    const versions = [
        { id: 'normal', label: '通常版' },
        { id: 'dq', label: 'ドラゴンクエスト編' },
        { id: 'hokuto', label: '北斗の拳編' },
        { id: 'seiya', label: '聖闘士星矢編' },
        { id: 'golf', label: 'ゴルフ編' },
    ] as const;

    return (
        <div className="max-w-[800px] mx-auto text-center py-8">
            <h2 className="text-2xl font-bold mb-8 text-[#222]">ダジャレベルとは？</h2>

            <div className="mb-8 text-left inline-block max-w-2xl px-4">
                <p className="mb-6 leading-[1.8] text-[#222]">ブログ記事にあるダジャレベルとは、「ダジャレレベル」を略したものです。</p>
                <p className="mb-6 leading-[1.8] text-[#222]">ネコマサの独断と偏見により、ブログ内に登場するダジャレのクオリティを★の数で表現したものです。</p>
                <p className="leading-[1.8] text-[#222]">★の数が多いほど、高品質(？)でハイレベルなダジャレであることを示しています。</p>
            </div>

            <div className="mt-12 mb-8">
                {activeVersion === 'normal' && (
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-[#222]">★ ダジャレベル早見表 ★</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm md:text-base border border-gray-200">
                                <thead>
                                    <tr className="bg-[#222] text-white">
                                        <th className="p-3 border border-gray-300 w-24 text-center">★の数</th>
                                        <th className="p-3 border border-gray-300 w-40 text-center whitespace-nowrap">レベル名</th>
                                        <th className="p-3 border border-gray-300">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { stars: '★☆☆☆☆', name: 'ダジャレ初心者\n(ダジャレビギナー)', desc: 'ダジャレを言っても「だれジャ？」ぐらいの存在感。' },
                                        { stars: '★★☆☆☆', name: 'ダジャレ中級者\n(ダジャレマスター)', desc: 'ダジャレをオシャレと自負する。' },
                                        { stars: '★★★☆☆', name: 'ダジャレ上級者\n(ダジャレプロ)', desc: '職場の同僚も動揺を隠せない。' },
                                        { stars: '★★★★☆', name: 'ダジャレの達人\n(ダジャレコーチ)', desc: '周囲はほぼついていけない。友達は次々と消えていく。' },
                                        { stars: '★★★★★', name: 'ダジャレの神\n(ダジャレゴッド)', desc: 'オヤジギャグをも凌駕する最高品質。ダジャレを放った瞬間、凍てつく空気とともに誰にも相手されない。' },
                                    ].map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="p-3 border border-gray-300 text-yellow-500 text-center whitespace-nowrap">{row.stars}</td>
                                            <td className="p-3 border border-gray-300 text-center whitespace-pre-wrap">{row.name}</td>
                                            <td className="p-3 border border-gray-300 text-[#222]">{row.desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeVersion === 'dq' && (
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-[#222]">★ ダジャレベル早見表：ドラゴンクエスト編 ★</h3>
                        <p className="mb-8 text-sm text-[#444]">
                            勇者よ――ダジャレの扉を開け！<br />この世界には　数多のダジャレがひそみ<br />その力を試さんと　そなたを待っている。<br />さあ　その耳と心で　レベルの差を　見極めるがよい。<br />伝説のダジャレが　そなたを待ち受けている！
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm md:text-base border border-gray-200">
                                <thead>
                                    <tr className="bg-[#222] text-white">
                                        <th className="p-3 border border-gray-300 w-24 text-center">★の数</th>
                                        <th className="p-3 border border-gray-300 w-40 text-center whitespace-nowrap">レベル名</th>
                                        <th className="p-3 border border-gray-300">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { stars: '★☆☆☆☆', name: 'ダジャレスライム', desc: 'ダジャレを言っても「だれジャ？」ぐらいの存在感。ブライのヒャド級のひんやり感。' },
                                        { stars: '★★☆☆☆', name: 'ダジャレキングスライム', desc: 'ダジャレをオシャレと自負する。ブライのヒャダルコ級の冷気で少し周囲を凍らせる。' },
                                        { stars: '★★★☆☆', name: 'ダジャレバラモス', desc: '職場の同僚も動揺を隠せない。ブライのヒャダイン級の凍てつく衝撃。' },
                                        { stars: '★★★★☆', name: 'ダジャレゾーマ', desc: '周囲はほぼついていけない。友達は次々と消え、ブライのマヒャド級の極寒が走る。' },
                                        { stars: '★★★★★', name: 'ダジャレ勇者', desc: 'オヤジギャグをも凌駕する最高品質。ダジャレを放った瞬間、世界が永遠の氷に包まれる。' },
                                    ].map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="p-3 border border-gray-300 text-yellow-500 text-center whitespace-nowrap">{row.stars}</td>
                                            <td className="p-3 border border-gray-300 text-center whitespace-pre-wrap">{row.name}</td>
                                            <td className="p-3 border border-gray-300 text-[#222]">{row.desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Similar blocks for other versions can be added here, keeping logic simple for now */}
                {activeVersion === 'hokuto' && (
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-[#222]">★ ダジャレベル早見表：北斗の拳編 ★</h3>
                        <p className="mb-8 text-sm text-[#444]">
                            20XX年　世界はダジャレの寒さに包まれた！！<br />笑いは枯れ ネタは切れ<br />あらゆるダジャレが絶滅したかにみえた――<br />だが・・・ダジャレは凍結していなかった！！
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm md:text-base border border-gray-200">
                                <thead>
                                    <tr className="bg-[#222] text-white">
                                        <th className="p-3 border border-gray-300 w-24 text-center">★の数</th>
                                        <th className="p-3 border border-gray-300 w-40 text-center whitespace-nowrap">レベル名</th>
                                        <th className="p-3 border border-gray-300">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { stars: '★☆☆☆☆', name: 'ダジャレ雑魚', desc: 'ダジャレを叫んでも「お前はもう…聞いてない」。北斗七星の下、冷たい風だけが荒野を駆け抜ける。' },
                                        { stars: '★★☆☆☆', name: 'ダジャレ無法者', desc: '荒野をさすらう無法者。北斗百裂拳のごとく小ネタを撃ち込み、笑いより先に凍てつく風が頬を切り裂く。' },
                                        { stars: '★★★☆☆', name: 'ダジャレレイ', desc: '南斗水鳥拳のごとくダジャレで華麗に斬る。さらに凛とした冷気で場を一瞬にして氷の羽根で包み込む。' },
                                        { stars: '★★★★☆', name: 'ダジャレラオウ', desc: '「我がダジャレに一片の悔いなし」天将奔烈とともに放たれる一声は世界を沈黙させ、心霊台を突かれたかのように笑いは永遠に凍りつく。' },
                                        { stars: '★★★★★', name: 'ダジャレケンシロウ', desc: 'オヤジギャグをも凌駕する究極奥義「ダジャレ無想転生」。お前はもう笑っている…いや凍っている。世紀末の荒野すら氷結させる寒気でダジャレ界を終焉へ導く。' },
                                    ].map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="p-3 border border-gray-300 text-yellow-500 text-center whitespace-nowrap">{row.stars}</td>
                                            <td className="p-3 border border-gray-300 text-center whitespace-pre-wrap">{row.name}</td>
                                            <td className="p-3 border border-gray-300 text-[#222]">{row.desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeVersion === 'seiya' && (
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-[#222]">★ ダジャレベル早見表：聖闘士星矢編</h3>
                        <p className="mb-8 text-sm text-[#444]">
                            はるかダジャレの時代より――<br />人は幾度となく<br />笑いを凍りつかせる言葉と出会ってきた。<br />君は小宇宙(ダジャレ)を感じたことがあるか？<br />その力は今、<br />ダジャレ界の運命すら左右する。
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm md:text-base border border-gray-200">
                                <thead>
                                    <tr className="bg-[#222] text-white">
                                        <th className="p-3 border border-gray-300 w-24 text-center">★の数</th>
                                        <th className="p-3 border border-gray-300 w-40 text-center whitespace-nowrap">レベル名</th>
                                        <th className="p-3 border border-gray-300">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { stars: '★☆☆☆☆', name: 'ダジャレブロンズ聖闘士', desc: 'まだ小宇宙は火種。ダジャレを放つも空気を軽く冷やすだけ、ダイヤモンドダスト級のひんやり感。' },
                                        { stars: '★★☆☆☆', name: 'ダジャレシルバー聖闘士', desc: '自信が芽生え、時にオーロラサンダーアタック級の冷気で周囲をざわつかせる。' },
                                        { stars: '★★★☆☆', name: 'ダジャレゴールド聖闘士', desc: '一言で場を凍らせる。オーロラエクスキューション級の凍てつくインパクトを放つ。' },
                                        { stars: '★★★★☆', name: 'ダジャレ教皇', desc: '周囲はほぼついていけない。もはや小宇宙(ダジャレ)は絶対零度、聖域すら凍りつかせる。' },
                                        { stars: '★★★★★', name: 'ダジャレアテナ', desc: 'オヤジギャグをも凌駕する神域。聞いた瞬間、笑いも声も氷結させるダジャレ界を守護する女神' },
                                    ].map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="p-3 border border-gray-300 text-yellow-500 text-center whitespace-nowrap">{row.stars}</td>
                                            <td className="p-3 border border-gray-300 text-center whitespace-pre-wrap">{row.name}</td>
                                            <td className="p-3 border border-gray-300 text-[#222]">{row.desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeVersion === 'golf' && (
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-[#222]">★ ダジャレベル早見表：ゴルフ編 ★</h3>
                        <p className="mb-8 text-sm text-[#444]">
                            グリーンに立つ　ダジャレのゴルファーよ――<br />ホールインワンを狙うがごとく<br />一打に込めるは　渾身のダジャレ。<br />風を読み　芝目を読み　そして空気を読まず<br />今日もダジャレが　コースを駆け巡る！
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm md:text-base border border-gray-200">
                                <thead>
                                    <tr className="bg-[#222] text-white">
                                        <th className="p-3 border border-gray-300 w-24 text-center">★の数</th>
                                        <th className="p-3 border border-gray-300 w-40 text-center whitespace-nowrap">レベル名</th>
                                        <th className="p-3 border border-gray-300">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { stars: '★☆☆☆☆', name: 'ダジャレビギナー', desc: 'ダジャレを放つも、OBゾーンへ一直線。ギャラリーは「だれジャ？」と首を傾げる。' },
                                        { stars: '★★☆☆☆', name: 'ダジャレアマチュア', desc: 'ナイスショット！と思いきや、ダジャレがバンカーに。同伴者にはイヤン、バカー(バンカー)と諭される。' },
                                        { stars: '★★★☆☆', name: 'ダジャレプロ', desc: 'ここぞという場面でダジャレを繰り出す。しかし、その一言で場は凍りつき、パットはパッとしない。' },
                                        { stars: '★★★★☆', name: 'ダジャレマスター', desc: 'ダジャレの飛距離は300ヤード超え。しかし、その寒さでグリーンは凍りつき、誰も近づけない。' },
                                        { stars: '★★★★★', name: 'ダジャレジェンド', desc: 'ホールインワン級のダジャレを放つ。その瞬間、コース全体が凍りつき、ゴルフ場はクローズとなる。' },
                                    ].map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="p-3 border border-gray-300 text-yellow-500 text-center whitespace-nowrap">{row.stars}</td>
                                            <td className="p-3 border border-gray-300 text-center whitespace-pre-wrap">{row.name}</td>
                                            <td className="p-3 border border-gray-300 text-[#222]">{row.desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {versions.map((ver) => (
                    <button
                        key={ver.id}
                        onClick={() => setActiveVersion(ver.id)}
                        className={`px-4 py-2 rounded-md transition-all text-sm font-medium ${activeVersion === ver.id
                                ? 'bg-[#8a2be2] text-white shadow-md'
                                : 'bg-[#333] text-white hover:bg-[#111]'
                            }`}
                    >
                        {ver.label}
                    </button>
                ))}
            </div>

            <hr className="my-10 border-gray-300" />

            <h3 className="text-xl font-bold mb-6 text-[#222]">ゴリ押し度とは？</h3>
            <div className="mb-8 text-left inline-block max-w-2xl px-4">
                <p className="mb-6 leading-[1.8] text-[#222]">
                    ブログ記事にあるゴリ押し度とは、<br />
                    ネコマサの気持ちが高ぶり、抑えられない感情と共に放たれた誇張表現により、<br />
                    読者様が受ける「圧」の度合いを★の数で表現したものです。
                </p>
                <p className="mb-6 leading-[1.8] text-[#222]">
                    ★の数が多いほど、<br />
                    読者様に対して一方的かつゴリ押しする内容であると共に<br />
                    熱苦しさと切なさと心強さを感じさせてしまう内容であることを示しています。
                </p>
                <p className="leading-[1.8] text-[#222]">
                    ちなみにゴリ押しとは、<br />
                    ゴリラがゴリゴリ押すイメージですが、<br />
                    語源としてはゴリという魚を強引に捕るゴリ押し漁からきている説が有力なようです。
                </p>
            </div>

        </div>
    );
}
