// Hook qui anime un objet le long d'une hélice verticale d'axe (0, y, 0) :
// position et orientation mises à jour à chaque frame selon le rayon, l'avance
// verticale par radian (cVert), la vitesse, la direction et la phase.
// L'axe de l'hélice peut être décalé horizontalement (offsetX) pour séparer
// deux trajectoires parallèles.
// La longueur de la photo (axe X local) est alignée sur la tangente de
// l'hélice, sa largeur (axe Y local) le long du rayon.
// Le paramètre angulaire est recyclé modulo `period` : les photos défilent en
// continu sur une bande verticale centrée, sans jamais quitter l'écran (le saut
// de recyclage se produit au-delà du haut/bas du cadre).
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function helixPoint(radius, cVert, u, period, offsetX) {
  return new THREE.Vector3(offsetX + radius * Math.cos(u), cVert * (u - period / 2), radius * Math.sin(u))
}

export function useHeliceMotion(radius, cVert, speed, direction, phase = 0, period = Math.PI * 2, offsetX = 0) {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (!ref.current) return
    const u0 = clock.getElapsedTime() * speed * direction + phase
    const u = ((u0 % period) + period) % period

    const point = helixPoint(radius, cVert, u, period, offsetX)
    const next = helixPoint(radius, cVert, u + 0.001, period, offsetX)

    ref.current.position.copy(point)

    // direction de la tangente et du rayon, pour orienter la photo
    const tangent = next.sub(point).normalize()
    const radial = new THREE.Vector3(Math.cos(u), 0, Math.sin(u))
    const normal = new THREE.Vector3().crossVectors(tangent, radial).normalize()
    ref.current.quaternion.setFromRotationMatrix(
      new THREE.Matrix4().makeBasis(tangent, radial, normal)
    )
  })

  return ref
}