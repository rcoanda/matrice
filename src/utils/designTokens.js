export function buildCssStack(font) {
  return [...font.families, ...font.fallbacks].join(', ')
}

export function buildGoogleFontsUrl(font) {
  if (font.importUrl) return font.importUrl
  const spec = font.families
    .map((family) => `family=${family.replace(/ /g, '+')}${font.weights ? `:wght@${font.weights}` : ''}`)
    .join('&')
  return `https://fonts.googleapis.com/css2?${spec}&display=swap`
}