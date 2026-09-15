import { useLayoutEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function useGlbModel(url, rotate = true) {
  const gltf = useGLTF(url)
  const scene = useMemo(() => gltf.scene.clone(true), [gltf])

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const sphere = new THREE.Sphere()
    box.getBoundingSphere(sphere)
    const scale = sphere.radius > 0 ? 1.6 / sphere.radius : 1
    scene.scale.setScalar(scale)
    scene.position.sub(sphere.center.clone().multiplyScalar(scale))
  }, [scene])

  useFrame((_, delta) => {
    if (rotate) scene.rotation.y += delta * 0.4
  })

  return scene
}
