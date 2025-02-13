const fs = require("fs");
const fetch = require("node-fetch");
const { BLOCKS } = require("@contentful/rich-text-types");
const { convert } = require("html-to-text");

const SPACE_ID = "uzwen12mhxqp";
const ACCESS_TOKEN = "5a5KD0Ru7VXdExwR5t0khiQb3_ykT3BX9MqXwMZBXHU";
const ENVIRONMENT = "master";
const WP_API_URL = "https://ninjack.jp/wp-json/wp/v2/posts"; // ←WordPressのURLを設定

// HTMLをリッチテキストに変換

const convertHtmlToRichText = (html) => {
  const text = convert(html, { wordwrap: false });

  // 画像URLを抽出（Markdownや単体URLのケース）
  const imageRegex = /\[?(https?:\/\/[^\s]+(?:\.(?:png|jpe?g|gif|webp)))\]?/g;

  let content = [];
  let lastIndex = 0;
  let match;

  while ((match = imageRegex.exec(text)) !== null) {
    // 画像の前の通常テキスト
    if (match.index > lastIndex) {
      content.push({
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: "text",
            value: text.slice(lastIndex, match.index),
            marks: [],
            data: {},
          },
        ],
      });
    }

    // 画像をRich Textノードとして追加
    content.push({
      nodeType: BLOCKS.EMBEDDED_ASSET,
      data: {
        target: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: match[1], // 画像URLをIDとしてセット
          },
        },
      },
    });

    lastIndex = match.index + match[0].length;
  }

  // 最後の部分のテキストもパラグラフとして追加
  if (lastIndex < text.length) {
    content.push({
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value: text.slice(lastIndex),
          marks: [],
          data: {},
        },
      ],
    });
  }

  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content:
      content.length > 0
        ? content
        : [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [{ nodeType: "text", value: text, marks: [], data: {} }],
            },
          ],
  };
};

// WordPress APIからすべての記事を取得（ページネーション対応）
const fetchAllPosts = async () => {
  let posts = [];
  let page = 1;
  let perPage = 100; // 1回のリクエストで最大100件取得
  let totalFetched = 0;

  console.log("Fetching posts from WordPress...");

  while (true) {
    const response = await fetch(
      `${WP_API_URL}?per_page=${perPage}&page=${page}`
    );

    if (!response.ok) {
      console.error(`Failed to fetch page ${page}:`, response.statusText);
      break;
    }

    const data = await response.json();
    if (data.length === 0) break; // 取得データがなくなったら終了

    posts = [...posts, ...data];
    totalFetched += data.length;
    console.log(`Fetched ${data.length} posts (Total: ${totalFetched})`);

    if (data.length < perPage) break; // もうページがない場合終了

    page++; // 次のページへ
  }

  console.log(`✅ Total ${totalFetched} posts fetched from WordPress`);

  // 🔥 ここで並び順を逆にする（最新の投稿が先に来る）
  posts.reverse();

  return posts;
};

// Contentfulに記事をインポート
const importToContentful = async (posts) => {
  console.log("Importing posts to Contentful...");
  let failedPosts = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const richTextContent = convertHtmlToRichText(post.content.rendered);
    const entry = {
      fields: {
        title: { "en-US": post.title.rendered },
        content: { "en-US": richTextContent },
        createdAt: { "en-US": post.date }, // Contentfulのフィールドに合わせる
      },
    };

    let retries = 3;
    while (retries > 0) {
      try {
        console.log(
          `Uploading ${i + 1}/${posts.length}: ${post.title.rendered}`
        );
        const response = await fetch(
          `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              "Content-Type": "application/vnd.contentful.management.v1+json",
              "X-Contentful-Content-Type": "magazine",
            },
            body: JSON.stringify(entry),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          console.error(
            `Error uploading (Retries left: ${retries - 1}):`,
            data
          );
          retries--;
          await new Promise((resolve) => setTimeout(resolve, 3000)); // 3秒待機してリトライ
          continue;
        }

        console.log(`✅ Imported: ${data.sys?.id}`);
        break; // 成功したらループ抜ける
      } catch (error) {
        console.error(`Request failed: ${error}`);
        retries--;
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    if (retries === 0) {
      console.error(
        `❌ Skipping post due to repeated errors: ${post.title.rendered}`
      );
      failedPosts.push(post);
    }

    // API Rate Limit対策（1秒に1リクエスト制限）
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  if (failedPosts.length > 0) {
    fs.writeFileSync("failed_posts.json", JSON.stringify(failedPosts, null, 2));
    console.log(`❗ Failed posts saved to failed_posts.json for reattempt.`);
  }

  console.log("🎉 Import process completed!");
};

// 実行
const run = async () => {
  const posts = await fetchAllPosts();
  if (posts.length === 0) {
    console.error("❌ No posts fetched. Exiting...");
    return;
  }

  await importToContentful(posts);
};

run().catch(console.error);
