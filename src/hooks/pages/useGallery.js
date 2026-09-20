import { useState, useContext } from 'react'
import { useTenant } from '../tenant/useTenant'
import { SelectionContext } from '../../providers/SelectionContext'

export function useGallery() {
  const { motionKey, viewKey, dataKey } = useContext(SelectionContext)
  const { selectorItem, overlayItem } = useTenant()
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  //selector
  const SelectorComponent = selectorItem?.component ?? null
  const selectorProps = selectorItem
    ? Object.fromEntries(Object.entries(selectorItem).filter(([k]) => k !== 'component' && k !== 'key'))
    : {}
  //overlay
  const OverlayComponent = overlayItem?.component ?? null

  const overlayProps = {
    artwork: selectedArtwork,
    onClose: () => setSelectedArtwork(null),
  }

  const sceneProps = {
    motionKey: motionKey,
    viewKey: viewKey,
    dataKey: dataKey,
    onSelect: setSelectedArtwork,
  }

  return {
    sceneProps,
    selectorProps,
    SelectorComponent,
    overlayProps,
    OverlayComponent,
  }
}