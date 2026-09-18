import { useContext } from 'react'
import '../../styles/Hero.css'
import ViewScene from '../canvas/view/common/ViewScene'
import { SelectionContext } from '../../providers/SelectionContext'


export default function ViewHero({ viewKey }) {
  const { dataKey } = useContext(SelectionContext)
  return (
    <div className="hero-container">
      <ViewScene viewKey={viewKey} dataKey={dataKey} />
    </div>
  )
}