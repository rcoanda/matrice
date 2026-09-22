import { useEffect, useRef, useState } from 'react'
import { Html, useContextBridge } from '@react-three/drei'
import StaticView from './common/StaticView'
import { LanguageContext } from '../../../providers/LanguageContext'
import { SelectionContext } from '../../../providers/SelectionContext'
import '../../../styles/GridView.css'

export default function GridView({ artworks, onSelect }) {
  const Bridge = useContextBridge(LanguageContext, SelectionContext)
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
      <Bridge>
        <div ref={scrollRef} className="gridview">
        {artworks.map((artWork) => (
          <div
            key={artWork.id}
            className="gridview-cell"
            onClick={() => onSelect?.(artWork)}
            onMouseEnter={() => setHovered(artWork.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <StaticView artWork={artWork} onSelect={onSelect} />
            {artWork.title ? (
              <div className="gridview-titlewrap">
                <span className={`gridview-title${hovered === artWork.id ? ' is-revealed' : ''}`}>{artWork.title}</span>
              </div>
            ) : null}
            {artWork.collection ? <span className="gridview-label">{artWork.collection}</span> : null}
          </div>
        ))}
      </div>
      </Bridge>
    </Html>
  )
}