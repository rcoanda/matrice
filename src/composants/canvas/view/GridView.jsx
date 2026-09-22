import { useEffect, useRef, useState } from 'react'
import { Html } from '@react-three/drei'
import StaticView from './common/StaticView'
import '../../../styles/GridView.css'

export default function GridView({ artworks, onSelect }) {
  const scrollRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  // Scroll fluide façon Lenis (lerp) sur le conteneur de la grille
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let target = el.scrollTop
    let raf = null

    const step = () => {
      const diff = target - el.scrollTop
      el.scrollTop += diff * 0.12
      if (Math.abs(target - el.scrollTop) > 0.5) raf = requestAnimationFrame(step)
      else raf = null
    }

    const onWheel = (e) => {
      e.preventDefault()
      const min = 0
      const max = el.scrollHeight - el.clientHeight
      target = Math.min(max, Math.max(min, target + e.deltaY))
      if (!raf) raf = requestAnimationFrame(step)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel, { passive: false })
      if (raf) cancelAnimationFrame(raf)
    }
  }, [artworks])

  return (
    <Html fullscreen zIndexRange={[0, 0]}>
      <div ref={scrollRef} className="gridview">
        {artworks.map((art) => (
          <div
            key={art.id}
            className="gridview-cell"
            onClick={() => onSelect?.(art)}
            onMouseEnter={() => setHovered(art.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <StaticView art={art} onSelect={onSelect} />
            {art.title ? (
              <div className="gridview-titlewrap">
                <span className={`gridview-title${hovered === art.id ? ' is-revealed' : ''}`}>{art.title}</span>
              </div>
            ) : null}
            {art.collection ? <span className="gridview-label">{art.collection}</span> : null}
          </div>
        ))}
      </div>
    </Html>
  )
}