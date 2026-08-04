import { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Scene from '../composants/Scene'
import BackArrow from '../composants/assets/BackArrow'

import Overlay from '../composants/Overlay'
import { SelectionContext } from '../composants/SelectionContext'
import '../styles/Gallery.css'

export default function Galerie() {
  const { viewMode, dataSource, reset } = useContext(SelectionContext)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  if (!viewMode || !dataSource) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="gallery-layout">
      <BackArrow onClick={reset} />
      <Scene viewMode={viewMode} dataSource={dataSource} onSelect={setSelectedArtwork} />
      <Overlay artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
    </div>
  )
}
