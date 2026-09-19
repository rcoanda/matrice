import { useState, useContext } from 'react'
import { getInit } from '../../config/config'
import { getSelector } from '../../config/selectorConfig'
import { getOverlay } from '../../config/overlayConfig'
import { SelectionContext } from '../../providers/SelectionContext'

export function useGallery() {
  const { motionKey, viewKey, dataKey } = useContext(SelectionContext)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  //selector
  const selectorItem = (() => {
    try {
      return getSelector(getInit('selectorConfig')) ?? null
    } catch {
      return null
    }
  })()
  const SelectorComponent = selectorItem?.component ?? null
  //overlay
  const overlayItem = (() => {
    try {
      return getOverlay(getInit('overlayConfig')) ?? null
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
    selectorItem,
    SelectorComponent,
    overlayProps,
    OverlayComponent,
  }
}