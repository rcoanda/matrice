import { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import ViewScene from '../composants/canvas/view/common/ViewScene'
import MotionScene from '../composants/canvas/motion/common/MotionScene'
import Header from '../composants/layout/Header'
import NextArrow from '../composants/buttons/NextArrow'
import { getInit } from '../config/config'
import { getSelectorType } from '../config/selectorConfig'

import Overlay from '../composants/effects/Overlay'
import { SelectionContext } from '../providers/SelectionContext'
import '../styles/Gallery.css'

export default function Gallery() {
  const { motionMode, viewMode, dataSource } = useContext(SelectionContext)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  const SelectorComponent = (() => {
    try {
      return getSelectorType(getInit('selectorConfig'))?.component ?? null
    } catch {
      return null
    }
  })()

  if (!dataSource) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="gallery-layout">
      <Header />
      <NextArrow />
      {motionMode ? (
        <>
          <MotionScene motionMode={motionMode} dataSource={dataSource} />
        </>
      ) : (
        viewMode && (
          <>
            <ViewScene viewModeKey={viewMode} dataSourceKey={dataSource} onSelect={setSelectedArtwork} />
            <Overlay artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
          </>
        )
      )}
      {SelectorComponent && <SelectorComponent />}
    </div>
  )
}