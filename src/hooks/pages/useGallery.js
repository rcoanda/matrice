import { useState, useContext } from 'react'
import { getInit } from '../../config/config'
import { getSelector } from '../../config/selectorConfig'
import { getOverlay } from '../../config/overlayConfig'
import { SelectionContext } from '../../providers/SelectionContext'

export function useGallery() {
  const { motion, viewKey, data } = useContext(SelectionContext)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  //selector
  const selectorProps = (() => {
    try {
      return getSelector(getInit('selectorConfig')) ?? null
    } catch {
      return null
    }
  })()
  const SelectorComponent = selectorProps?.component ?? null
  //overlay
  const overlay = (() => {
    try {
      return getOverlay(getInit('overlayConfig')) ?? null
    } catch {
      return null
    }
  })()
  const OverlayComponent = overlay?.component ?? null

  const overlayProps = {
    artwork: selectedArtwork,
    onClose: () => setSelectedArtwork(null),
  }

  const sceneProps = {
    motionKey: motion,
    viewKey: viewKey,
    dataKey: data,
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