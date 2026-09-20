// Génère deux trajectoires hélicoïdales verticales identiques et parallèles
// (comme les deux brins d'une double hélice d'ADN), déphasées de π l'une par
// rapport à l'autre et écartées horizontalement (offsetX : distance entre les
// deux axes, symétrique autour de l'origine). Les photos sont posées le long de
// la spire sans espace : la longueur de chaque photo est dérivée du pas d'arc
// entre deux photos consécutives (absence de trou), multipliée par un facteur
// d'agrandissement. La bande (period = turns * 2π) est recyclée par le hook de
// mouvement : les photos défilent en continu sans jamais quitter l'écran (saut
// au-dessus / en dessous du cadre, hors de vue). Largeur (axe radial) et
// longueur (axe tangent) sont paramétrables.
const TRAJECTORIES = [
  { radius: 2.8, cVert: 0.85, speed: 0.5, direction: 1, phase: 0, offsetX: -3.6, turns: 3, photosPerTurn: 20, width: 2.8, lengthScale: 2.6 },
  { radius: 2.8, cVert: 0.85, speed: 0.5, direction: 1, phase: Math.PI, offsetX: 3.6, turns: 3, photosPerTurn: 20, width: 2.8, lengthScale: 2.6 },
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