// Hook qui déforme une photo le long d'une hélice verticale d'axe (0, y, 0) :
// le plan de la photo est subdivisé (segments) et, à chaque frame, chaque
// colonne de sommets est replacée sur la spire correspondante (de la moitié du
// pas précédent à la moitié du pas suivant), écartée radialement de la largeur
// de la photo. La photo n'est donc pas un rectangle plat mais une bande qui
// suit la courbure et la torsion de l'hélice, comme imprimée sur un ruban
// textile tordu. Le bas d'une photo étant collé au haut de la suivante, le
// ruban est continu.
// L'axe de l'hélice peut être décalé horizontalement (offsetX) pour séparer
// deux trajectoires parallèles. Le paramètre angulaire est recyclé modulo
// `period` : les photos défilent sans jamais quitter l'écran (le saut de
// recyclage se produit au-delà du haut/bas du cadre).
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function useHeliceMotion(radius, cVert, speed, direction, phase = 0, period = Math.PI * 2, offsetX = 0, step = 0.4, width = 1, segments = 12) {
  const ref = useRef()

  useFrame(({ clock }) => {
    const mesh = ref.current
    if (!mesh) return
    const geometry = mesh.geometry
    if (!geometry) return

    const u0 = clock.getElapsedTime() * speed * direction + phase
    const u = ((u0 % period) + period) % period
    const half = step / 2
    const columns = segments + 1
    const positions = geometry.attributes.position

    for (let iy = 0; iy < 2; iy++) {
      const side = 0.5 - iy
      const radiusOut = radius + side * width
      for (let ix = 0; ix < columns; ix++) {
        const um = u - half + (ix / segments) * step
        const cos = Math.cos(um)
        const sin = Math.sin(um)
        positions.setXYZ(
          iy * columns + ix,
          offsetX + radiusOut * cos,
          cVert * (um - period / 2),
          radiusOut * sin
        )
      }
    }
    positions.needsUpdate = true
    geometry.computeVertexNormals()
  })

  return ref
}