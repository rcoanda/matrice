import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import '../../styles/Hero.css'
import MotionScene from '../canvas/motion/common/MotionScene'

//recuperer le premier data de la liste du client ou remplir data à partir du context
export default function CirclesNatureHero() {
  return (
    <div className="hero-container">
      <MotionScene motionMode={'circlesKey'} dataSource={'natureKey'} />
    </div>
  )
}
