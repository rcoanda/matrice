import { useEffect, useState } from 'react'
import { Html, useContextBridge } from '@react-three/drei'
import StaticView from './common/StaticView'
import { LanguageContext } from '../../../providers/LanguageContext'
import { SelectionContext } from '../../../providers/SelectionContext'
import '../../../styles/ListView.css'

export default function ListView({ artworks, onSelect }) {
  const Bridge = useContextBridge(LanguageContext, SelectionContext)
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

  const artWork = artworks[Math.min(index, count - 1)]
  if (!artWork) return null

  const media = <StaticView artWork={artWork} onSelect={onSelect} css="listview" />

  const info = (
    <>
      {artWork.title && <h3>{artWork.title}</h3>}
      {artWork.artist && <p>{artWork.artist}</p>}
      {artWork.date && <p>{artWork.date}</p>}
      {artWork.place && <p>{artWork.place}</p>}
      <span className="listview-counter">{index + 1} / {count}</span>
    </>
  )

  return (
    <Html fullscreen zIndexRange={[0, 0]}>
      <Bridge>
        <div className="listview">
        <span className="listview-series">{artWork.collection}</span>
        <div className="listview-stage">
          <button className="listview-nav listview-prev" onClick={prev} aria-label="Photo précédente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="listview-photo" onClick={() => onSelect?.(artWork)}>
            {media}
          </div>
          <button className="listview-nav listview-next" onClick={next} aria-label="Photo suivante">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <div className="listview-info">{info}</div>
      </div>
      </Bridge>
    </Html>
  )
}