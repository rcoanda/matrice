// Génère la liste des trajectoires en lemniscate de Bernoulli (trois lemniscates
// de même centre, tailles/vitesses/directions différentes) pour la scène
// Lemniscates. Chaque lemniscate est tournée sur un axe différent (0°, 60°, 120°).
const TRAJECTORIES = [
  { size: 5.6, speed: 0.8, direction: 1, rotation: 0, count: 30, length: 0.5, width: 0.35 },
  { size: 5.6, speed: 0.5, direction: -1, rotation: Math.PI / 3, count: 30, length: 0.5, width: 0.35 },
  { size: 5.6, speed: 0.35, direction: 1, rotation: (2 * Math.PI) / 3, count: 30, length: 0.5, width: 0.35 },
]

const TRAJECTORIESOLD = [
  { size: 2.0, speed: 0.8, direction: 1, rotation: 0, count: 10, length: 0.22, width: 0.15 },
  { size: 3.8, speed: 0.5, direction: -1, rotation: Math.PI / 3, count: 22, length: 0.5, width: 0.35 },
  { size: 5.6, speed: 0.35, direction: 1, rotation: (2 * Math.PI) / 3, count: 34, length: 0.7, width: 0.5 },
]

export function lemniscatesTrajectory() {
  const rects = []
  for (const t of TRAJECTORIES) {
    for (let i = 0; i < t.count; i++) {
      rects.push({
        size: t.size,
        speed: t.speed,
        direction: t.direction,
        rotation: t.rotation,
        phase: (i / t.count) * Math.PI * 2,
        length: t.length,
        width: t.width,
      })
    }
  }
  return rects
}
