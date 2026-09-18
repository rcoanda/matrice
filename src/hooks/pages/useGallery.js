import { useState, useContext } from 'react'
import { getInit } from '../../config/config'
import { getSelectorType } from '../../config/selectorConfig'
import { getOverlayType } from '../../config/overlayConfig'
import { SelectionContext } from '../../providers/SelectionContext'

export function useGallery() {
  const { motionMode, viewMode, dataSource } = useContext(SelectionContext)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  //selector
  const selectorProps = (() => {
    try {
      return getSelectorType(getInit('selectorConfig')) ?? null
    } catch {
      return null
    }
  })()
  const SelectorComponent = selectorProps?.component ?? null
  //overlay
  const overlayType = (() => {
    try {
      return getOverlayType(getInit('overlayConfig')) ?? null
    } catch {
      return null
    }
  })()
  const OverlayComponent = overlayType?.component ?? null

  const overlayProps = {
    artwork: selectedArtwork,
    onClose: () => setSelectedArtwork(null),
  }

  const sceneProps = {
    motionModeKey: motionMode,
    viewModeKey: viewMode,
    dataSourceKey: dataSource,
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