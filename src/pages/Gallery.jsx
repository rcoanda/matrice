import { Navigate } from 'react-router-dom'
import ViewScene from '../composants/canvas/view/common/ViewScene'
import MotionScene from '../composants/canvas/motion/common/MotionScene'
import Header from '../composants/layout/Header'
import NextArrow from '../composants/buttons/NextArrow'
import { useGallery } from '../hooks/pages/useGallery'
import '../styles/Gallery.css'

export default function Gallery() {
  const { sceneProps, selectorProps, SelectorComponent, overlayProps, OverlayComponent } = useGallery()

  if (!sceneProps.dataSourceKey) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="gallery-layout">
      <Header />
      <NextArrow />
      {sceneProps.motionModeKey ? (
        <MotionScene {...sceneProps} />
      ) : (
        sceneProps.viewModeKey && (
          <>
            <ViewScene {...sceneProps} />
            {OverlayComponent && <OverlayComponent {...overlayProps} />}
          </>
        )
      )}
      {SelectorComponent && <SelectorComponent {...selectorProps} />}
    </div>
  )
}