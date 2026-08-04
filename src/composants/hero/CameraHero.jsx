import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import '../../styles/Hero.css'
import '../../styles/CameraHero.css'

function CameraFrustum() {
  const groupRef = useRef()
  const lineMatRef = useRef()
  const volMatRef = useRef()
  const timeRef = useRef(0)

  const { edges, volumeGeo, nearVerts, farVerts } = useMemo(() => {
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

    const edgePositions = []
    for (const [a, b] of pairs) {
      edgePositions.push(...verts[a], ...verts[b])
    }

    const edgeGeo = new THREE.BufferGeometry()
    edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3))

    const faces = [
      [0, 1, 2], [0, 2, 3],
      [4, 5, 6], [4, 6, 7],
      [0, 1, 5], [0, 5, 4],
      [1, 2, 6], [1, 6, 5],
      [2, 3, 7], [2, 7, 6],
      [3, 0, 4], [3, 4, 7],
    ]

    const volPositions = []
    const volColors = []
    const amber = new THREE.Color('#E8A33D')
    const teal = new THREE.Color('#4A7B8C')
    for (const [a, b, c] of faces) {
      volPositions.push(...verts[a], ...verts[b], ...verts[c])
      for (const idx of [a, b, c]) {
        const col = idx < 4 ? amber : teal
        volColors.push(col.r, col.g, col.b)
      }
    }
    const volGeo = new THREE.BufferGeometry()
    volGeo.setAttribute('position', new THREE.Float32BufferAttribute(volPositions, 3))
    volGeo.setAttribute('color', new THREE.Float32BufferAttribute(volColors, 3))

    return { edges: edgeGeo, volumeGeo: volGeo, nearVerts: n, farVerts: f }
  }, [])

  useFrame((_, delta) => {
    timeRef.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(timeRef.current * 0.25) * 0.15
      groupRef.current.rotation.y += delta * 0.3
    }
    if (lineMatRef.current) {
      lineMatRef.current.opacity = 0.55 + Math.sin(timeRef.current * 1.4) * 0.2
    }
    if (volMatRef.current) {
      volMatRef.current.opacity = 0.16 + Math.sin(timeRef.current * 0.8) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial ref={lineMatRef} color="#313927" transparent opacity={0.55} />
      </lineSegments>
      <mesh geometry={volumeGeo}>
        <meshBasicMaterial
          ref={volMatRef}
          vertexColors
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {nearVerts.map((v, i) => (
        <mesh key={`n${i}`} position={v}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color="#D8A24A" />
        </mesh>
      ))}
      {farVerts.map((v, i) => (
        <mesh key={`f${i}`} position={v}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshBasicMaterial color="#4A7B8C" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function CameraBody() {
  const ref = useRef()
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    timeRef.current += delta
    if (ref.current) {
      ref.current.rotation.x = Math.sin(timeRef.current * 0.25) * 0.15
      ref.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group ref={ref}>
      <mesh position={[0, 0.05, 0.2]}>
        <boxGeometry args={[0.7, 0.45, 0.7]} />
        <meshStandardMaterial color="#313927" roughness={0.35} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.05, 0.62]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.24, 0.28, 24]} />
        <meshStandardMaterial color="#1f2418" roughness={0.2} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.05, 0.5]}>
        <torusGeometry args={[0.12, 0.035, 12, 32]} />
        <meshStandardMaterial color="#C1664F" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  )
}

function Aperture() {
  const ref = useRef()
  const timeRef = useRef(0)
  const rings = useMemo(() => [
    { r: 0.22, color: '#313927' },
    { r: 0.38, color: '#C1664F' },
    { r: 0.54, color: '#D8A24A' },
  ], [])

  useFrame((_, delta) => {
    timeRef.current += delta
    if (ref.current) {
      ref.current.rotation.z += delta * 0.15
      ref.current.scale.setScalar(1 + Math.sin(timeRef.current * 0.9) * 0.05)
    }
  })

  return (
    <group ref={ref} position={[0, 0, 1.05]}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[0, 0, i * (Math.PI / 3)]}>
          <torusGeometry args={[ring.r, 0.012, 8, 48]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.5 - i * 0.1} />
        </mesh>
      ))}
    </group>
  )
}

function LensGlow() {
  const ref = useRef()
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    timeRef.current += delta
    if (ref.current) {
      ref.current.material.opacity = 0.35 + Math.sin(timeRef.current * 1.2) * 0.12
      ref.current.scale.setScalar(1 + Math.sin(timeRef.current * 0.6) * 0.15)
    }
  })

  return (
    <mesh ref={ref} position={[0, 0, 0.9]}>
      <sphereGeometry args={[0.28, 24, 24]} />
      <meshBasicMaterial color="#E8A33D" transparent opacity={0.35} />
    </mesh>
  )
}

function FocalScreen() {
  const ref = useRef()
  const timeRef = useRef(0)
  const geo = useMemo(() => new THREE.PlaneGeometry(2.5, 2.5), [])

  useFrame((_, delta) => {
    timeRef.current += delta
    if (ref.current) {
      ref.current.material.opacity = 0.18 + Math.sin(timeRef.current * 0.7) * 0.05
    }
  })

  return (
    <mesh ref={ref} geometry={geo} position={[0, 0, 3]}>
      <meshBasicMaterial color="#F2C98A" transparent opacity={0.18} side={THREE.DoubleSide} />
    </mesh>
  )
}

function Dust() {
  const ref = useRef()

  const { positions, colors } = useMemo(() => {
    const n = 140
    const pos = new Float32Array(n * 3)
    const cols = new Float32Array(n * 3)
    const gold = new THREE.Color('#D8A24A')
    const teal = new THREE.Color('#4A7B8C')
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
      const c = Math.random() > 0.5 ? gold : teal
      cols[i * 3] = c.r
      cols[i * 3 + 1] = c.g
      cols[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: cols }
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial vertexColors size={0.04} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function Hero() {
  return (
    <div className="hero-container hero-camera">
      <Canvas
        camera={{ position: [0, 0.4, 6.5], fov: 50, near: 0.1, far: 20 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#E4D3B5']} />
        <fog attach="fog" args={['#E4D3B5', 6, 14]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 2, 4]} intensity={0.8} color="#E8A33D" />
        <pointLight position={[-3, -1, 2]} intensity={0.6} color="#4A7B8C" />
        <CameraFrustum />
        <CameraBody />
        <Aperture />
        <LensGlow />
        <FocalScreen />
        <Dust />
      </Canvas>
    </div>
  )
}
