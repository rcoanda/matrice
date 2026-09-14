import { Suspense, useLayoutEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function RawModel({ url }) {
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
    scene.rotation.y += delta * 0.4
  })

  return <primitive object={scene} />
}

export default function GlbView({ url, className }) {
  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      camera={{ position: [1.8, 1.2, 2.2], fov: 40 }}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={0.9} />
      <hemisphereLight intensity={0.4} />
      <directionalLight position={[4, 5, 6]} intensity={1.4} />
      <Suspense fallback={null}>
        <RawModel url={url} />
      </Suspense>
    </Canvas>
  )
}