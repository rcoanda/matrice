import { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Scene from '../composants/canvas/Scene'
import BackArrow from '../composants/buttons/BackArrow'

import Overlay from '../composants/effects/Overlay'
import { SelectionContext } from '../providers/SelectionContext'
import '../styles/Gallery.css'

export default function Gallery() {
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
