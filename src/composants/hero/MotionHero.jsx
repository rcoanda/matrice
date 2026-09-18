import { useContext } from 'react'
import '../../styles/Hero.css'
import MotionScene from '../canvas/motion/common/MotionScene'
import { SelectionContext } from '../../providers/SelectionContext'


export default function MotionHero({ motionMode }) {
  const { dataSource } = useContext(SelectionContext)
  return (
    <div className="hero-container">
      <MotionScene motionModeKey={motionMode} dataSourceKey={dataSource} />
    </div>
  )
}