import { useTenant } from '../tenant/useTenant'
import { useArtworkLoader } from '../loader/useArtworkLoader'

export function useViewScene({ viewKey, dataKey }) {
  const { artworks, dataItem, loading, progress } = useArtworkLoader(dataKey)
  const { designItem, loadingItem, viewItems } = useTenant()

  const background = designItem?.file.colors.galleryLight.value
  const viewItem = viewItems?.find((i) => i.key === viewKey)
  const ViewComponent = viewItem ? viewItem.component : null
  const LoadingComponent = loadingItem ? loadingItem.component : null

  return {
    artworks,
    dataItem,
    viewItem,
    ViewComponent,
    LoadingComponent,
    background,
    progress,
    loading,
  }
}