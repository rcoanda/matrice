import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import '../../styles/Hero.css'

function CameraFrustum() {
  const groupRef = useRef()
  const timeRef = useRef(0)

  const edges = useMemo(() => {
    const near = 1
    const far = 3
    const fov = 60
    const half = (fov * Math.PI) / 360

    const nh = 2 * Math.tan(half) * near
    const nw = nh
    const fh = 2 * Math.tan(half) * far
    const fw = fh

    const n = [
      [-nw / 2, -nh / 2, near], [nw / 2, -nh / 2, near],
      [nw / 2, nh / 2, near], [-nw / 2, nh / 2, near],
    ]
    const f = [
      [-fw / 2, -fh / 2, far], [fw / 2, -fh / 2, far],
      [fw / 2, fh / 2, far], [-fw / 2, fh / 2, far],
    ]

    const verts = [...n, ...f]
    const pairs = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ]

    const positions = []
    for (const [a, b] of pairs) {
      positions.push(verts[a][0], verts[a][1], verts[a][2])
      positions.push(verts[b][0], verts[b][1], verts[b][2])
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame((_, delta) => {
    timeRef.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(timeRef.current * 0.3) * 0.1
      groupRef.current.rotation.y += delta * 0.4
    }
  })

  return (
    <group ref={groupRef}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#313927" />
      </lineSegments>
    </group>
  )
}

export default function Hero() {
  return (
    <div className="hero-container">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50, near: 0.1, far: 20 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#E4D3B5']} />
        <CameraFrustum />
      </Canvas>
    </div>
  )
}
