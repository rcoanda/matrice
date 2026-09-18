// Hook qui anime un objet le long d'une lemniscate de Bernoulli centrée sur
// l'origine : position et rotation mises à jour à chaque frame selon la taille,
// la vitesse, la direction, la phase et l'angle d'axe (rotation de la lemniscate).
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function lemniscatePoint(size, t, rotation) {
  const s2 = Math.sin(t) * Math.sin(t)
  const denom = 1 + s2
  const x = (size * Math.cos(t)) / denom
  const y = (size * Math.sin(t) * Math.cos(t)) / denom
  const cos = Math.cos(rotation)
  const sin = Math.sin(rotation)
  return {
    x: x * cos - y * sin,
    y: x * sin + y * cos,
  }
}

export function useLemniscateMotion(size, speed, direction, rotation = 0, phase = 0) {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * speed * direction + phase
    const { x, y } = lemniscatePoint(size, t, rotation)

    // direction de la tangente via un point voisin, pour orienter la photo
    const next = lemniscatePoint(size, t + 0.001, rotation)

    ref.current.position.set(x, y, 0)
    ref.current.rotation.z = Math.atan2(next.y - y, next.x - x)
  })

  return ref
}
