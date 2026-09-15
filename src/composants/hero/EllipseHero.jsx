import { useContext } from 'react'
import '../../styles/Hero.css'
import ViewScene from '../canvas/view/common/ViewScene'
import { SelectionContext } from '../../providers/SelectionProvider'


export default function CirclesHero() {
  const { dataSource } = useContext(SelectionContext)
  return (
    <div className="hero-container">
      <ViewScene viewMode={'ellipseKey'} dataSource={dataSource} />
    </div>
  )
}
