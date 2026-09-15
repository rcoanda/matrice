import { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import ViewScene from '../composants/canvas/view/common/ViewScene'
import MotionScene from '../composants/canvas/motion/common/MotionScene'
import BackArrow from '../composants/buttons/BackArrow'
import { getAllInit } from '../config/config'

import Overlay from '../composants/effects/Overlay'
import { SelectionContext } from '../providers/SelectionProvider'
import '../styles/Gallery.css'

export default function Gallery() {
  const { motionMode, viewMode, dataSource, reset } = useContext(SelectionContext)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  const motionEnabled = getAllInit().some((i) => i.config === 'motionConfig')
  const viewEnabled = getAllInit().some((i) => i.config === 'viewConfig')

  if (!dataSource) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="gallery-layout">
      <BackArrow onClick={reset} />
      {motionEnabled && motionMode ? (
        <>
          <MotionScene motionMode={motionMode} dataSource={dataSource} />
        </>
      ) : (
        viewEnabled && viewMode && (
          <>
            <ViewScene viewMode={viewMode} dataSource={dataSource} onSelect={setSelectedArtwork} />
            <Overlay artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
          </>
        )
      )}
    </div>
  )
}
