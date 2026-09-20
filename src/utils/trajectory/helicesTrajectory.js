// Génère deux trajectoires hélicoïdales verticales identiques et parallèles
// (comme les deux brins d'une double hélice d'ADN), déphasées de π l'une par
// rapport à l'autre et écartées horizontalement (offsetX : distance entre les
// deux axes, symétrique autour de l'origine). Les photos sont posées le long de
// la spire avec un petit espace entre elles : la longueur de chaque photo vaut
// une fraction (lengthScale) du pas d'arc entre deux photos consécutives, une
// valeur inférieure à 1 laisse un espace entre les photos. La bande
// (period = turns * 2π) est recyclée par le hook de mouvement : les photos
// défilent en continu sans jamais quitter l'écran (saut au-dessus / en dessous
// du cadre, hors de vue). Largeur (axe radial) et longueur (axe tangent) sont
// paramétrables.
const TRAJECTORIES = [
  { radius: 2.8, cVert: 0.85, speed: 0.5, direction: 1, phase: 0, offsetX: -3.6, turns: 3, photosPerTurn: 8, width: 2.8, lengthScale: 0.94 },
  { radius: 2.8, cVert: 0.85, speed: 0.5, direction: 1, phase: Math.PI, offsetX: 3.6, turns: 3, photosPerTurn: 8, width: 2.8, lengthScale: 0.94 },
]

export function helicesTrajectory() {
  const rects = []
  for (const t of TRAJECTORIES) {
    const count = t.turns * t.photosPerTurn
    const period = t.turns * Math.PI * 2
    // pas d'arc entre deux spires consécutives : sqrt(radius² + cVert²) * (2π / photosPerTurn)
    const arcPerStep = Math.hypot(t.radius, t.cVert) * ((Math.PI * 2) / t.photosPerTurn)
    for (let i = 0; i < count; i++) {
      rects.push({
        radius: t.radius,
        cVert: t.cVert,
        speed: t.speed,
        direction: t.direction,
        phase: t.phase + (i / t.photosPerTurn) * Math.PI * 2,
        period,
        offsetX: t.offsetX,
        length: arcPerStep * t.lengthScale,
        width: t.width,
      })
    }
  }
  return rects
}