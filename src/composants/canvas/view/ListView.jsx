import { useEffect, useState } from 'react'
import { Html } from '@react-three/drei'
import GlbView from './GlbView'
import '../../../styles/ListView.css'

export default function ListView({ artworks, onSelect }) {
  const [index, setIndex] = useState(0)
  const count = artworks.length

  useEffect(() => {
    setIndex(0)
  }, [artworks])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + count) % count)
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % count)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count])

  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)

  const art = artworks[Math.min(index, count - 1)]
  if (!art) return null

  return (
    <Html fullscreen zIndexRange={[0, 0]}>
      <div className="listview">
        <div className="listview-stage">
          <button className="listview-nav listview-prev" onClick={prev} aria-label="Photo précédente">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="listview-photo" onClick={() => onSelect?.(art)}>
            {art.image ? (
              <img src={art.image} alt={art.title || ''} />
            ) : art.video ? (
              <video src={art.video} autoPlay muted loop playsInline />
            ) : art.glb ? (
              <GlbView url={art.glb} className="listview-glb" />
            ) : null}
            <div className="listview-info">
              {art.title && <h3>{art.title}</h3>}
              {art.artist && <p>{art.artist}</p>}
              {art.date && <p>{art.date}</p>}
              {art.place && <p>{art.place}</p>}
            </div>
          </div>
          <button className="listview-nav listview-next" onClick={next} aria-label="Photo suivante">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <div className="listview-counter">{index + 1} / {count}</div>
      </div>
    </Html>
  )
}