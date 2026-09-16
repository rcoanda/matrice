import { useEffect, useRef, useState } from 'react'
import { Html } from '@react-three/drei'
import GlbView from './common/GlbView'
import CardView from './common/CardView'
import { designSystemHasGroup } from '../../../config/designSystemConfig'
import '../../../styles/GridView.css'

export default function GridView({ artworks, onSelect }) {
  const scrollRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  // Le rendu avancé (titre révélé, scroll lerp, libellé) n'est actif que si le
  // design system configuré fournit les tokens « grid » (ex: julis).
  const hasGridTokens = designSystemHasGroup('grid')

  // Scroll fluide façon Lenis (lerp) sur le conteneur de la grille
  useEffect(() => {
    const el = scrollRef.current
    if (!el || !hasGridTokens) return
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
  }, [artworks, hasGridTokens])

  return (
    <Html fullscreen zIndexRange={[0, 0]}>
      <div ref={scrollRef} className={`gridview${hasGridTokens ? ' gridview--ds' : ''}`}>
        {artworks.map((art) => (
          <div
            key={art.id}
            className="gridview-cell"
            onClick={() => onSelect?.(art)}
            onMouseEnter={() => setHovered(art.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {art.image ? (
              <img src={art.image} alt={art.title || ''} />
            ) : art.video ? (
              <video src={art.video} autoPlay muted loop playsInline />
            ) : art.glb ? (
              <GlbView url={art.glb} className="gridview-glb" />
            ) : (
              <CardView dom className="gridview-card" collection={art.collection} onClick={() => onSelect?.(art)} />
            )}
            {hasGridTokens && art.title ? (
              <div className="gridview-titlewrap">
                <span className={`gridview-title${hovered === art.id ? ' is-revealed' : ''}`}>{art.title}</span>
              </div>
            ) : null}
            {hasGridTokens && art.collection ? <span className="gridview-label">{art.collection}</span> : null}
          </div>
        ))}
      </div>
    </Html>
  )
}