import { useContext } from 'react'
import '../../styles/Hero.css'
import MotionScene from '../canvas/motion/common/MotionScene'
import { SelectionContext } from '../../providers/SelectionProvider'

//recuperer le premier data de la liste du client ou remplir data à partir du context
export default function CirclesHero() {
  const { dataSource } = useContext(SelectionContext)
  return (
    <div className="hero-container">
      <MotionScene motionMode={'circlesKey'} dataSource={dataSource} />
    </div>
  )
}
