import { useEffect, useMemo, useState } from 'react'
import { CanvasTexture, SRGBColorSpace, TextureLoader, VideoTexture } from 'three'

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

// Carte texte (artwork.collection) : sprite sans image ni vidéo.
const PX_W = 512
const PX_H = 683
const FONT_FAMILY = `"Arial", system-ui, sans-serif`
const BG_COLOR = '#f4efe6'
const TEXT_COLOR = '#25231f'

function wrapSpriteLines(ctx, text, maxWidth) {
  const words = String(text || '').split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }
  if (line) lines.push(line)
  return lines
}

export function useTextSpriteTexture(text) {
  const texture = useMemo(() => {
    if (!text) return null

    const canvas = document.createElement('canvas')
    canvas.width = PX_W
    canvas.height = PX_H
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = BG_COLOR
    ctx.fillRect(0, 0, PX_W, PX_H)

    const maxWidth = PX_W * 0.8
    let fontSize = 64
    ctx.font = `700 ${fontSize}px ${FONT_FAMILY}`
    let lines = wrapSpriteLines(ctx, text, maxWidth)

    while (fontSize > 20 && (lines.length * fontSize * 1.15 > PX_H * 0.6 || lines.some((l) => ctx.measureText(l).width > maxWidth))) {
      fontSize -= 4
      ctx.font = `700 ${fontSize}px ${FONT_FAMILY}`
      lines = wrapSpriteLines(ctx, text, maxWidth)
    }

    const lineHeight = fontSize * 1.15
    const blockHeight = lines.length * lineHeight
    let y = (PX_H - blockHeight) / 2 + lineHeight / 2

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = TEXT_COLOR
    for (const line of lines) {
      ctx.fillText(line, PX_W / 2, y)
      y += lineHeight
    }

    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    return texture
  }, [text])

  useEffect(() => () => texture?.dispose(), [texture])

  const h = DEFAULT_HEIGHT
  const w = h * Math.min(PX_W / PX_H, MAX_ASPECT)

  return { texture, size: [w, h] }
}

export function useSpriteTexture(artWork) {
  const url = artWork?.image || artWork?.video
  const type = artWork?.video ? 'video' : artWork?.image ? 'image' : null

  const image = useImageSpriteTexture(type === 'image' ? url : undefined)
  const video = useVideoSpriteTexture(type === 'video' ? url : undefined)
  const text = useTextSpriteTexture(url ? null : artWork?.text)

  return type === 'video' ? video : type === 'image' ? image : text
}