/**
 * Convert a string to a URL-friendly slug
 * @param {string} text - The text to convert to a slug
 * @return {string} The URL-friendly slug
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

/**
 * Get an article by its slug
 * @param {Array} articles - The array of articles
 * @param {string} slug - The slug to search for
 * @return {Object|null} The article with the matching slug, or null if not found
 */
export function getArticleBySlug(articles, slug) {
  return articles.find((article) => slugify(article.title) === slug) || null;
}
