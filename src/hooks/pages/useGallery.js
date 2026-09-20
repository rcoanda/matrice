import { useState, useContext } from 'react'
import { getKey } from '../../registries/common/config'
import { getItem as getSelectorItem } from '../../registries/selectorRegistry'
import { getItem as getOverlayItem } from '../../registries/overlayRegistry'
import { SelectionContext } from '../../providers/SelectionContext'

export function useGallery() {
  const { motionKey, viewKey, dataKey } = useContext(SelectionContext)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  //selector
  const selectorItem = (() => {
    try {
      return getSelectorItem(getKey('selectorRegistry')) ?? null
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
      return getOverlayItem(getKey('overlayRegistry')) ?? null
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