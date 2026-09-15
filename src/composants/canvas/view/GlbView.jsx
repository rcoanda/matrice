import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useGlbModel } from '../../../hooks/useGlbModel'

function GlbModel({ url, rotate = true }) {
  const scene = useGlbModel(url, rotate)
  return <primitive object={scene} />
}

export default function GlbView({ url, className, position, onClick, scene = false, orbit = false }) {
  if (scene) {
    return (
      <group position={position} onClick={onClick}>
        <Suspense fallback={null}>
          <GlbModel url={url} />
        </Suspense>
      </group>
    )
  }

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
        <GlbModel url={url} rotate={!orbit} />
      </Suspense>
      {orbit && <OrbitControls enablePan={false} autoRotate autoRotateSpeed={1.5} />}
    </Canvas>
  )
}