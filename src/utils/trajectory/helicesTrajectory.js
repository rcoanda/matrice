// Génère deux trajectoires hélicoïdales verticales identiques et parallèles
// (comme les deux brins d'une double hélice d'ADN), déphasées de π l'une par
// rapport à l'autre. Les photos sont posées le long de la spire sans espace :
// la longueur de chaque photo est calculée pour couvrir exactement le pas d'arc
// entre deux photos consécutives (absence de trou, absence de chevauchement).
const TRAJECTORIES = [
  { radius: 2.8, cVert: 0.85, speed: 0.5, direction: 1, phase: 0, turns: 2, photosPerTurn: 20, width: 0.55 },
  { radius: 2.8, cVert: 0.85, speed: 0.5, direction: 1, phase: Math.PI, turns: 2, photosPerTurn: 20, width: 0.55 },
]

export function helicesTrajectory() {
  const rects = []
  for (const t of TRAJECTORIES) {
    const count = t.turns * t.photosPerTurn
    // pas d'arc entre deux spires consécutives : sqrt(radius² + cVert²) * (2π / photosPerTurn)
    const arcPerStep = Math.hypot(t.radius, t.cVert) * ((Math.PI * 2) / t.photosPerTurn)
    for (let i = 0; i < count; i++) {
      rects.push({
        radius: t.radius,
        cVert: t.cVert,
        speed: t.speed,
        direction: t.direction,
        phase: t.phase + (i / t.photosPerTurn) * Math.PI * 2,
        length: arcPerStep,
        width: t.width,
      })
    }
  }
  return rects
}