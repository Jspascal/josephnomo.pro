export const generateSEOMeta = (article) => {
  if (!article) {
    return {
      title: "Portfolio - Joseph Nomo",
      meta: [
        {
          name: "description",
          content:
            "Technical articles and case studies from my experience as a backend developer",
        },
      ],
    };
  }

  return {
    title: `${article.title} - Joseph Nomo's Portfolio`,
    meta: [
      { name: "description", content: article.summary },
      { name: "keywords", content: article.tags.join(", ") },
      // Open Graph
      { property: "og:title", content: article.title },
      { property: "og:description", content: article.summary },
      { property: "og:type", content: "article" },
      { property: "og:image", content: article.image },
      // Twitter
      { name: "twitter:title", content: article.title },
      { name: "twitter:description", content: article.summary },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: article.image },
    ],
  };
};
