export default function Home() {
  return (
    <div>
      <div>TOPページ</div>
      <ul className={"list-disc"}>
        <li className="text-[blue]">
          <a href="/item">商品・忍具一覧</a>
        </li>
        <li className="text-[blue]">
          <a href="/item/aaaaaa">商品・忍具詳細</a>
        </li>
        <li className="text-[blue]">
          <a href="/activity">体験・修行一覧</a>
        </li>
        <li className="text-[blue]">
          <a href="/activity/aaaaaa">体験・修行詳細</a>
        </li>
        <li className="text-[blue]">
          <a href="/spot">施設・史跡一覧</a>
        </li>
        <li className="text-[blue]">
          <a href="/spot/aaaaaa">施設・史跡詳細</a>
        </li>
        <li className="text-[blue]">
          <a href="/research">研究情報一覧</a>
        </li>
        <li className="text-[blue]">
          <a href="/research/aaaaaa">研究情報詳細</a>
        </li>
        <li className="text-[blue]">
          <a href="/fiction">創作作品一覧</a>
        </li>
        <li className="text-[blue]">
          <a href="/fiction/aaaaaa">創作作品詳細</a>
        </li>
        <li className="text-[blue]">
          <a href="/ninja">現代忍者一覧</a>
        </li>
        <li className="text-[blue]">
          <a href="/ninja/aaaaaa">現代忍者詳細</a>
        </li>
      </ul>
    </div>
  );
}
