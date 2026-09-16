import { useContext } from 'react'
import '../../styles/Hero.css'
import ViewScene from '../canvas/view/common/ViewScene'
import { SelectionContext } from '../../providers/SelectionContext'


export default function ViewHero({ viewMode }) {
  const { dataSource } = useContext(SelectionContext)
  return (
    <div className="hero-container">
      <ViewScene viewModeKey={viewMode} dataSourceKey={dataSource} />
    </div>
  )
}