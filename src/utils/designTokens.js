export function buildCssStack(font) {
  return [...font.families, ...font.fallbacks].join(', ')
}

export function buildFontWeightList(font) {
  return font.weights ? font.weights.split(';').join(' ') : ''
}