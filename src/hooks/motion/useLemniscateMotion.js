// Hook qui anime un objet le long d'une lemniscate de Bernoulli centrée sur
// l'origine : position et rotation mises à jour à chaque frame selon la taille,
// la vitesse, la direction et la phase.
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function lemniscatePoint(size, t) {
  const s2 = Math.sin(t) * Math.sin(t)
  const denom = 1 + s2
  return {
    x: (size * Math.cos(t)) / denom,
    y: (size * Math.sin(t) * Math.cos(t)) / denom,
  }
}

export function useLemniscateMotion(size, speed, direction, phase = 0) {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * speed * direction + phase
    const { x, y } = lemniscatePoint(size, t)

    // direction de la tangente via un point voisin, pour orienter la photo
    const next = lemniscatePoint(size, t + 0.001)

    ref.current.position.set(x, y, 0)
    ref.current.rotation.z = Math.atan2(next.y - y, next.x - x)
  })

  return ref
}
