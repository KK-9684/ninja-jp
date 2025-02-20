const convertEmbedUrl = (url: string) => {
  try {
    const urlObj = new URL(url);

    // YouTube URLの処理
    if (
      urlObj.hostname.includes("youtube.com") ||
      urlObj.hostname === "youtu.be"
    ) {
      // 既に埋め込み用URLの場合
      if (
        urlObj.hostname === "www.youtube.com" &&
        urlObj.pathname.startsWith("/embed/")
      ) {
        return url;
      }

      // 動画IDの抽出
      let videoId = "";
      if (urlObj.hostname === "youtu.be") {
        videoId = urlObj.pathname.slice(1);
      } else {
        const searchParams = new URLSearchParams(urlObj.search);
        videoId = searchParams.get("v") || "";
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Google Maps URLの処理
    if (urlObj.hostname.includes("google.com/maps")) {
      // 既に埋め込み用URLの場合
      if (urlObj.pathname.includes("/embed")) {
        return url;
      }

      // 通常のGoogle MapsのURLから場所情報を抽出
      let placeId = "";
      const searchParams = new URLSearchParams(urlObj.search);

      // URLから必要なパラメータを抽出
      if (urlObj.pathname.includes("/place/")) {
        // 場所のURLの場合
        const placeMatch = urlObj.pathname.match(/place\/(.*?)(?:\/|$)/);
        if (placeMatch) {
          placeId = placeMatch[1];
          return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${placeId}`;
        }
      } else if (searchParams.get("ll")) {
        // 緯度経度が指定されている場合
        const ll = searchParams.get("ll");
        return `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${ll}&zoom=15`;
      }
    }
  } catch (e) {
    console.error("Invalid URL:", e);
  }
  return url;
};

export default convertEmbedUrl;
