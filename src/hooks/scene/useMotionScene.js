import { useMemo } from 'react'
import { useTenant } from '../tenant/useTenant'
import { useArtworkLoader } from '../loader/useArtworkLoader'

export function useMotionScene({ motionKey, dataKey }) {
  const { artworks, dataItem, loading, progress } = useArtworkLoader(dataKey)
  const { designItem, loadingItem, motionItems, motionHiddenItems } = useTenant()

  const background = designItem?.file.colors.galleryLight.value
  const motionItem = motionItems?.find((i) => i.key === motionKey) ?? motionHiddenItems?.find((i) => i.key === motionKey)
  const MotionComponent = motionItem ? motionItem.component : null
  const LoadingComponent = loadingItem ? loadingItem.component : null


  return {
    artworks,
    dataItem,
    motionItem,
    MotionComponent,
    LoadingComponent,
    background,
    progress,
    loading,
  }
}