// Génère deux trajectoires hélicoïdales verticales identiques et parallèles,
// déphasées de π l'une par rapport à l'autre et écartées horizontalement
// (offsetX : distance entre les deux axes, symétrique autour de l'origine).
// Chaque photo couvre un intervalle de la spire (step = 2π / photosPerTurn) et
// sa longueur vaut LA CORDE de l'hélice sur ce pas : le bas de chaque photo
// vient se coller au haut de la photo précédente, formant un film continu qui
// défile le long de l'hélice. La bande (period = turns * 2π) est recyclée par
// le hook de mouvement : les photos défilent sans jamais quitter l'écran (saut
// au-dessus / en dessous du cadre, hors de vue). Largeur (axe radial) et
// longueur (corde du pas) sont paramétrables.
const TRAJECTORIES = [
  { radius: 2.8, cVert: 0.85, speed: 0.5, direction: 1, phase: 0, offsetX: -3.6, turns: 3, photosPerTurn: 8, width: 2.8 },
  { radius: 2.8, cVert: 0.85, speed: 0.5, direction: 1, phase: Math.PI, offsetX: 3.6, turns: 3, photosPerTurn: 8, width: 2.8 },
]

export function helicesTrajectory() {
  const rects = []
  for (const t of TRAJECTORIES) {
    const count = t.turns * t.photosPerTurn
    const period = t.turns * Math.PI * 2
    const step = (Math.PI * 2) / t.photosPerTurn
    const half = step / 2
    // corde de l'hélice sur un pas = longueur de la photo (bas collé au haut de la précédente)
    const length = 2 * Math.sqrt(t.radius * t.radius * Math.sin(half) ** 2 + t.cVert * t.cVert * half * half)
    for (let i = 0; i < count; i++) {
      rects.push({
        radius: t.radius,
        cVert: t.cVert,
        speed: t.speed,
        direction: t.direction,
        phase: t.phase + (i + 0.5) * step,
        period,
        step,
        offsetX: t.offsetX,
        length,
        width: t.width,
      })
    }
  }
  return rects
}