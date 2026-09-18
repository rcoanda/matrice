import { useContext } from 'react'
import '../../styles/Hero.css'
import MotionScene from '../canvas/motion/common/MotionScene'
import { SelectionContext } from '../../providers/SelectionContext'


export default function MotionHero({ motionKey }) {
  const { dataKey } = useContext(SelectionContext)
  return (
    <div className="hero-container">
      <MotionScene motionKey={motionKey} dataKey={dataKey} />
    </div>
  )
}