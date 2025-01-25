import LatestMagazineList from "./components/Home/LatestMagazineList";
import RecommendActivity from "./components/Common/RecommendActivity";
import RecommendItem from "./components/Common/RecommendItem";
import RecommendMember from "./components/Home/RecommendMember";
import RecommendResearch from "./components/Home/RecommendResearch";
import TagList from "./components/Common/TagList";
import RecommendCulture from "./components/Home/RecommendCulutre";
import RecommendSpot from "./components/Home/RecommendSpot";
import RecommendMagazine from "./components/Home/RecommendMagazine";
import RecommendContents from "./components/Home/RecommendContents";
import EachContentsCount from "./components/Home/EachContentsCount";

export default async function Home() {
  return (
    <div>
      <h2>おすすめコンテンツ</h2>
      {/* <RecommendContents /> */}
      <h2>新着記事</h2>
      <LatestMagazineList />
      <h2>注目の忍者体験アクティビティ</h2>
      <RecommendActivity limit={6} />
      <h2>忍者の足跡をたどる</h2>
      <RecommendSpot />
      <h2>気になるキーワードから探す</h2>
      <TagList limit={20} />
      <h2>おすすめの忍者アイテム</h2>
      <RecommendItem limit={5} />
      <h2>忍者研究の最前線</h2>
      <RecommendResearch />
      <h2>フィクション世界の忍者たち</h2>
      <RecommendCulture />
      <h2>今を生きる忍者たち</h2>
      <RecommendMember />
      <h2>新着記事</h2>
      <RecommendMagazine />

      <EachContentsCount />
      <ul className={"list-disc"}>
        <li className="text-[blue]">
          <a href="/magazine">マガジン一覧</a>
        </li>
        <li className="text-[blue]">
          <a href="/item">商品・忍具一覧</a>
        </li>
        <li className="text-[blue]">
          <a href="/activity">体験・修行一覧</a>
        </li>
        <li className="text-[blue]">
          <a href="/spot">施設・史跡一覧</a>
        </li>
        <li className="text-[blue]">
          <a href="/research">研究情報一覧</a>
        </li>
        <li className="text-[blue]">
          <a href="/fiction">創作作品一覧</a>
        </li>
        <li className="text-[blue]">
          <a href="/ninja">現代忍者一覧</a>
        </li>
        <li className="text-[blue]">
          <a href="/magazine">マガジン一覧</a>
        </li>
      </ul>
    </div>
  );
}
