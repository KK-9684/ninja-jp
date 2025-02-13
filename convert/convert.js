// convert.js
const fs = require("fs");
const path = require("path");

const wordpressData = require("../wordpress_posts.json");

const contentfulData = wordpressData.map((post) => {
  return {
    title: post.title.rendered,
    content: post.content.rendered,
    date: post.date,
  };
});

fs.writeFileSync(
  path.join(__dirname, "../contentful_posts.json"),
  JSON.stringify(contentfulData, null, 2)
);

console.log("Data conversion completed!");
