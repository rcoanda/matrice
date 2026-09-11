import { Html } from '@react-three/drei'
import '../../styles/GridView.css'

export default function GridView({ artworks, onSelect }) {
  return (
    <Html fullscreen zIndexRange={[0, 0]}>
      <div className="gridview">
        {artworks.map((art) => (
          <div key={art.id} className="gridview-cell" onClick={() => onSelect?.(art)}>
            <img src={art.image} alt={art.title || ''} />
          </div>
        ))}
      </div>
    </Html>
  )
}