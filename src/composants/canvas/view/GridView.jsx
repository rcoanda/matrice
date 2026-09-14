import { Html } from '@react-three/drei'
import GlbView from './GlbView'
import '../../../styles/GridView.css'

export default function GridView({ artworks, onSelect }) {
  return (
    <Html fullscreen zIndexRange={[0, 0]}>
      <div className="gridview">
        {artworks.map((art) => (
          <div key={art.id} className="gridview-cell" onClick={() => onSelect?.(art)}>
            {art.image ? (
              <img src={art.image} alt={art.title || ''} />
            ) : art.video ? (
              <video src={art.video} autoPlay muted loop playsInline />
            ) : art.glb ? (
              <GlbView url={art.glb} className="gridview-glb" />
            ) : null}
          </div>
        ))}
      </div>
    </Html>
  )
}