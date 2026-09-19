import { useState, useContext } from 'react'
import { getKey } from '../../config/config'
import { getItem as getSelectorItem } from '../../config/selectorConfig'
import { getItem as getOverlayItem } from '../../config/overlayConfig'
import { SelectionContext } from '../../providers/SelectionContext'

export function useGallery() {
  const { motionKey, viewKey, dataKey } = useContext(SelectionContext)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  //selector
  const selectorItem = (() => {
    try {
      return getSelectorItem(getKey('selectorConfig')) ?? null
    } catch {
      return null
    }
  })()
  const SelectorComponent = selectorItem?.component ?? null
  const selectorProps = selectorItem
    ? Object.fromEntries(Object.entries(selectorItem).filter(([k]) => k !== 'component' && k !== 'key'))
    : {}
  //overlay
  const overlayItem = (() => {
    try {
      return getOverlayItem(getKey('overlayConfig')) ?? null
    } catch {
      return null
    }
  })()
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