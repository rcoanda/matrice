import { Navigate } from 'react-router-dom'
import ViewScene from '../composants/canvas/view/common/ViewScene'
import MotionScene from '../composants/canvas/motion/common/MotionScene'
import NextArrow from '../composants/buttons/NextArrow'
import { useGallery } from '../hooks/pages/useGallery'
import '../styles/Gallery.css'

export default function Gallery() {
  const { HeaderComponent, sceneProps, selectorProps, SelectorComponent, overlayProps, OverlayComponent } = useGallery()

  if (!sceneProps.dataKey) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="gallery-layout">
      {HeaderComponent && <HeaderComponent />}
      <NextArrow />
      {sceneProps.motionKey ? (
        <MotionScene {...sceneProps} />
      ) : (
        sceneProps.viewKey && (
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