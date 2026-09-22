import { useEffect, useMemo, useState } from 'react'
import { SRGBColorSpace, TextureLoader, VideoTexture } from 'three'

const DEFAULT_HEIGHT = 1.6
const MAX_ASPECT = 1.8

function useImageSpriteTexture(url) {
  const [texture, setTexture] = useState(null)
  const [aspect, setAspect] = useState(1)

  useEffect(() => {
    if (!url) return
    const loader = new TextureLoader()
    loader.load(
      url,
      (t) => {
        setTexture((prev) => {
          if (prev) prev.dispose()
          return t
        })
        setAspect(t.image ? t.image.width / t.image.height : 1)
      },
      undefined,
      () => setTexture(null)
    )
  }, [url])

  const h = DEFAULT_HEIGHT
  const w = h * Math.min(aspect || 1, MAX_ASPECT)

  return { texture, size: [w, h] }
}

function useVideoSpriteTexture(url) {
  const { video, texture } = useMemo(() => {
    if (!url) return { video: null, texture: null }
    const video = document.createElement('video')
    video.src = url
    video.crossOrigin = 'anonymous'
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.play().catch(() => { })
    const texture = new VideoTexture(video)
    texture.colorSpace = SRGBColorSpace
    return { video, texture }
  }, [url])

  const [aspect, setAspect] = useState(1)

  useEffect(() => {
    if (!video) return
    const onLoaded = () => {
      if (video.videoWidth > 0) setAspect(video.videoWidth / video.videoHeight)
    }
    video.addEventListener('loadeddata', onLoaded)
    return () => {
      video.removeEventListener('loadeddata', onLoaded)
      texture.dispose()
      video.pause()
    }
  }, [video, texture])

  const h = DEFAULT_HEIGHT
  const w = h * Math.min(aspect || 1, MAX_ASPECT)

  return { texture, size: [w, h] }
}

export function useSpriteTexture(url, type) {
  const image = useImageSpriteTexture(type === 'image' ? url : undefined)
  const video = useVideoSpriteTexture(type === 'video' ? url : undefined)

  return type === 'video' ? video : image
}