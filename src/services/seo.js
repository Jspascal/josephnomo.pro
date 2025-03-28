export const generateSEOMeta = (article) => {
  return {
    title: article ? `${article.title} - Joseph Nomo` : "Blog - Joseph Nomo",
    meta: [
      {
        name: "description",
        content: article
          ? article.summary
          : "Technical articles and case studies from my experience in software engineering and system architecture.",
      },
      {
        property: "og:title",
        content: article ? article.title : "Blog - Joseph Nomo",
      },
      {
        property: "og:description",
        content: article
          ? article.summary
          : "Technical articles and case studies from my experience in software engineering and system architecture.",
      },
      {
        property: "og:type",
        content: "article",
      },
      {
        property: "og:image",
        content: article ? article.image : "/default-og-image.png",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: article ? article.title : "Blog - Joseph Nomo",
      },
      {
        name: "twitter:description",
        content: article
          ? article.summary
          : "Technical articles and case studies from my experience in software engineering and system architecture.",
      },
      {
        name: "twitter:image",
        content: article ? article.image : "/default-og-image.png",
      },
      {
        property: "article:published_time",
        content: article ? new Date(article.date).toISOString() : null,
      },
      {
        property: "article:author",
        content: "Joseph Nomo",
      },
      {
        property: "article:section",
        content: article ? article.category : "Technology",
      },
      {
        property: "article:tag",
        content: article ? article.tags.join(", ") : "",
      },
    ].filter((meta) => meta.content !== null),
  };
};
