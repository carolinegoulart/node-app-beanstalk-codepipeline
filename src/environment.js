const DEFAULT_ENVIRONMENT = "development";

/**
 * @returns {string}
 */
export function getEnvironment() {
  const value = process.env.environment;
  if (value === undefined || value.trim() === "") {
    return DEFAULT_ENVIRONMENT;
  }
  return value.trim();
}

/**
 * @param {string} text
 * @returns {string}
 */
export function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
