import { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import ViewScene from '../composants/canvas/view/common/ViewScene'
import MotionScene from '../composants/canvas/motion/common/MotionScene'
import Header from '../composants/layout/Header'
import NextArrow from '../composants/buttons/NextArrow'
import { getInit } from '../config/config'
import { getSelectorType } from '../config/selectorConfig'
import { getOverlayType } from '../config/overlayConfig'
import { SelectionContext } from '../providers/SelectionContext'
import '../styles/Gallery.css'

export default function Gallery() {
  const { motionMode, viewMode, dataSource } = useContext(SelectionContext)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  const selectorItem = (() => {
    try {
      return getSelectorType(getInit('selectorConfig')) ?? null
    } catch {
      return null
    }
  })()
  const SelectorComponent = selectorItem?.component ?? null

  const overlayType = (() => {
    try {
      return getOverlayType(getInit('overlayConfig')) ?? null
    } catch {
      return null
    }
  })()
  const OverlayComponent = overlayType?.component ?? null

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
            {OverlayComponent && (
              <OverlayComponent artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
            )}
          </>
        )
      )}
      {SelectorComponent && (
        <SelectorComponent
          viewModeSelectorKey={selectorItem.viewMode}
          dataSourceSelectorKey={selectorItem.dataSource}
        />
      )}
    </div>
  )
}