import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

const DEFAULT_OPTIONS = {
  rotationSpeed: 0.15,
  lerpFactor: 0.05,
}

export function useViewMotion(cameraZ, options = {}) {
  const { rotationSpeed, lerpFactor } = { ...DEFAULT_OPTIONS, ...options }
  const groupRef = useRef()
  const cameraPos = useRef(new Vector3(0, 0.5, cameraZ))

  useFrame(({ camera }, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed
    }
    cameraPos.current.lerp(new Vector3(0, 0.5, cameraZ), lerpFactor)
    camera.position.copy(cameraPos.current)
    camera.lookAt(0, 0, 0)
  })

  return groupRef
}