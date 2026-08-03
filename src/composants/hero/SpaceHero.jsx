import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import '../../styles/Hero.css'

function Stars() {
  const ref = useRef()

  const { positions, sizes } = useMemo(() => {
    const n = 1500
    const pos = new Float32Array(n * 3)
    const siz = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 5 + Math.random() * 10
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4
      pos[i * 3 + 2] = r * Math.cos(phi)
      siz[i] = 0.02 + Math.random() * 0.06
    }
    return { positions: pos, sizes: siz }
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.06} transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function Nebula() {
  const ref = useRef()
  const timeRef = useRef(0)

  const geo = useMemo(() => {
    const n = 400
    const pos = new Float32Array(n * 3)
    const colors = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.5 + Math.random() * 3
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3
      pos[i * 3 + 2] = r * Math.cos(phi)
      const c = new THREE.Color().setHSL(0.65 + Math.random() * 0.15, 0.6, 0.3 + Math.random() * 0.3)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    return g
  }, [])

  useFrame((_, delta) => {
    timeRef.current += delta
    if (ref.current) {
      ref.current.rotation.y += delta * 0.06
      ref.current.rotation.x = Math.sin(timeRef.current * 0.1) * 0.05
    }
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.12} transparent opacity={0.4} vertexColors sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function Ring() {
  const ref = useRef()
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    timeRef.current += delta
    if (ref.current) {
      ref.current.rotation.x = Math.sin(timeRef.current * 0.2) * 0.2
      ref.current.rotation.z += delta * 0.15
    }
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.2, 0.02, 16, 80]} />
      <meshBasicMaterial color="#7a9bcb" transparent opacity={0.3} />
    </mesh>
  )
}

function Planet() {
  const ref = useRef()
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    timeRef.current += delta
    if (ref.current) {
      ref.current.position.x = Math.sin(timeRef.current * 0.15) * 3.5
      ref.current.position.z = Math.cos(timeRef.current * 0.15) * 3.5
      ref.current.rotation.y += delta * 0.3
    }
  })

  return (
    <mesh ref={ref} position={[3.5, 0, 0]}>
      <sphereGeometry args={[0.4, 24, 24]} />
      <meshStandardMaterial color="#c47a5a" roughness={0.7} metalness={0.1} />
    </mesh>
  )
}

export default function SpaceHero() {
  return (
    <div className="hero-container">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 55, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#0a0a14']} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 5, 2]} intensity={0.5} />
        <Stars />
        <Nebula />
        <Ring />
        <Planet />
      </Canvas>
    </div>
  )
}
