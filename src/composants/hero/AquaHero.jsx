import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import '../../styles/Hero.css'

function Water() {
  const meshRef = useRef()
  const timeRef = useRef(0)

  const { geometry, count } = useMemo(() => {
    const width = 8
    const depth = 8
    const seg = 64
    const geo = new THREE.PlaneGeometry(width, depth, seg, seg)
    geo.rotateX(-Math.PI / 2)
    return { geometry: geo, count: (seg + 1) * (seg + 1) }
  }, [])

  const posAttr = geometry.attributes.position
  const baseY = new Float32Array(posAttr.array)

  useFrame((_, delta) => {
    timeRef.current += delta
    const pos = posAttr.array
    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i]
      const z = pos[i + 2]
      const t = timeRef.current
      pos[i + 1] = baseY[i + 1] +
        Math.sin(x * 1.5 + t * 0.8) * 0.15 +
        Math.sin(z * 2 + t * 0.6) * 0.1 +
        Math.sin((x + z) * 0.8 + t * 1.2) * 0.08
    }
    posAttr.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -0.5, 0]}>
      <meshStandardMaterial
        color="#4a90a8"
        roughness={0.3}
        metalness={0.1}
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  )
}

function Underlight() {
  const meshRef = useRef()
  const timeRef = useRef(0)

  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(6, 6, 1, 1)
    g.rotateX(-Math.PI / 2)
    return g
  }, [])

  useFrame((_, delta) => {
    timeRef.current += delta
    if (meshRef.current) {
      meshRef.current.position.y = -0.8 + Math.sin(timeRef.current * 0.5) * 0.1
      meshRef.current.material.opacity = 0.15 + Math.sin(timeRef.current * 0.7) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} geometry={geo} position={[0, -0.8, 0]}>
      <meshBasicMaterial color="#7ec8e3" transparent opacity={0.15} />
    </mesh>
  )
}

function Particles() {
  const ref = useRef()
  const timeRef = useRef(0)

  const { positions, count } = useMemo(() => {
    const n = 200
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 12
      if (i % 3 === 1) pos[i] = Math.random() * 2 - 1
    }
    return { positions: pos, count: n }
  }, [])

  useFrame((_, delta) => {
    timeRef.current += delta
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#9dd4e8" size={0.04} transparent opacity={0.5} />
    </points>
  )
}

export default function AquaHero() {
  return (
    <div className="hero-container">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 20 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#1a3a4a']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 5, 3]} intensity={0.8} />
        <fog attach="fog" args={['#1a3a4a', 5, 12]} />
        <Water />
        <Underlight />
        <Particles />
      </Canvas>
    </div>
  )
}
