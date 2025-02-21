const { createClient } = require("contentful");

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || process.env.CF_SPACE_ID,
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN || process.env.CF_DELIVERY_ACCESS_TOKEN,
});

const getEntries = async (query) => {
  const result = await client.getEntries(query);
  return { items: result.items, total: result.total };
};

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://ninjack.jp/",
  generateRobotsTxt: true,

  additionalPaths: async (config) => {
    try {
      // スポットのエントリを取得
      const { items: spots } = await getEntries({
        content_type: "spot",
        limit: 1000,
      });

      // 活動・体験のエントリを取得
      const { items: activities } = await getEntries({
        content_type: "activity",
        limit: 1000,
      });

      const { items: fictions } = await getEntries({
        content_type: "fiction",
        limit: 1000,
      });

      const { items: items } = await getEntries({
        content_type: "item",
        limit: 1000,
      });

      const { items: researchs } = await getEntries({
        content_type: "research",
        limit: 1000,
      });

      // 忍者プロフィールのエントリを取得
      const { items: ninjas } = await getEntries({
        content_type: "ninja",
        limit: 1000,
      });

      // 記事・マガジンのエントリを取得
      const { items: magazines } = await getEntries({
        content_type: "magazine",
        limit: 1000,
      });

      // スポットページのURL
      const spotEntries = spots.map((spot) => ({
        loc: `/spot/${spot.fields.slug || spot.sys.id}`,
        lastmod: new Date(spot.sys.updatedAt).toISOString(),
        changefreq: "weekly",
        priority: 0.8,
      }));

      // 活動・体験ページのURL
      const activityEntries = activities.map((activity) => ({
        loc: `/activity/${activity.fields.slug || activity.sys.id}`,
        lastmod: new Date(activity.sys.updatedAt).toISOString(),
        changefreq: "weekly",
        priority: 0.8,
      }));

      // 忍者プロフィールページのURL
      const ninjaEntries = ninjas.map((ninja) => ({
        loc: `/ninja/${ninja.fields.slug || ninja.sys.id}`,
        lastmod: new Date(ninja.sys.updatedAt).toISOString(),
        changefreq: "monthly",
        priority: 0.7,
      }));

      // 記事・マガジンページのURL
      const magazineEntries = magazines.map((magazine) => ({
        loc: `/magazine/${magazine.fields.slug || magazine.sys.id}`,
        lastmod: new Date(magazine.sys.updatedAt).toISOString(),
        changefreq: "daily",
        priority: 0.9,
      }));

      // 静的ページのURL
      const staticPages = [
        {
          loc: "/",
          lastmod: new Date().toISOString(),
          changefreq: "daily",
          priority: 1.0,
        },
        {
          loc: "/about",
          lastmod: new Date().toISOString(),
          changefreq: "monthly",
          priority: 0.5,
        },
        {
          loc: "/spot",
          lastmod: new Date().toISOString(),
          changefreq: "weekly",
          priority: 0.8,
        },
        {
          loc: "/activity",
          lastmod: new Date().toISOString(),
          changefreq: "weekly",
          priority: 0.8,
        },
        {
          loc: "/item",
          lastmod: new Date().toISOString(),
          changefreq: "weekly",
          priority: 0.8,
        },
        {
          loc: "/fiction",
          lastmod: new Date().toISOString(),
          changefreq: "weekly",
          priority: 0.8,
        },
        {
          loc: "/research",
          lastmod: new Date().toISOString(),
          changefreq: "weekly",
          priority: 0.8,
        },
        {
          loc: "/ninja",
          lastmod: new Date().toISOString(),
          changefreq: "monthly",
          priority: 0.7,
        },
        {
          loc: "/magazine",
          lastmod: new Date().toISOString(),
          changefreq: "daily",
          priority: 0.9,
        },
        {
          loc: "/contact",
          lastmod: new Date().toISOString(),
          changefreq: "yearly",
          priority: 0.3,
        },
        {
          loc: "/privacy-policy",
          lastmod: new Date().toISOString(),
          changefreq: "yearly",
          priority: 0.3,
        },
        {
          loc: "/terms",
          lastmod: new Date().toISOString(),
          changefreq: "yearly",
          priority: 0.3,
        },
      ];

      // すべてのエントリを結合
      return [
        ...staticPages,
        ...spotEntries,
        ...activityEntries,
        ...ninjaEntries,
        ...magazineEntries,
      ];
    } catch (error) {
      console.error("Error generating sitemap:", error);
      return [];
    }
  },

  sitemapSize: 5000,
  outDir: "./public",
};

module.exports = config;
