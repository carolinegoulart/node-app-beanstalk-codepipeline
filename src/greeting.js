/**
 * Builds the headline shown on the home page.
 * @param {string} [name='World']
 * @returns {string}
 */
export function buildGreeting(name = "World") {
  const trimmed = String(name).trim();
  if (!trimmed) {
    throw new Error("name must not be empty");
  }
  return `Hello, ${trimmed}!`;
}
