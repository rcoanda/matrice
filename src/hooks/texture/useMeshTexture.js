import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'

// ---------------------------------------------------------------------------
// useTextMeshTexture : texture générée (canvas) depuis un texte.
// ---------------------------------------------------------------------------
const CARD_W = 2.4
const CARD_H = 3.2
const PX_W = 512
const PX_H = 683
const FONT_FAMILY = `"Arial", system-ui, sans-serif`
const BG_COLOR = '#f4efe6'
const TEXT_COLOR = '#25231f'

function wrapLines(ctx, text, maxWidth) {
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

export function useTextMeshTexture(text) {
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
    let lines = wrapLines(ctx, text, maxWidth)

    while (fontSize > 20 && (lines.length * fontSize * 1.15 > PX_H * 0.6 || lines.some((l) => ctx.measureText(l).width > maxWidth))) {
      fontSize -= 4
      ctx.font = `700 ${fontSize}px ${FONT_FAMILY}`
      lines = wrapLines(ctx, text, maxWidth)
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

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [text])

  useEffect(() => () => texture?.dispose(), [texture])

  return { texture, size: [CARD_W, CARD_H] }
}

// ---------------------------------------------------------------------------
// Textures photo : le canvas image réduit/orienté est mis en cache au niveau
// du module — le réseau et le décodage n'ont lieu qu'une seule fois.
// useImageMeshTexture (TextureLoader) et useVideoMeshTexture (VideoTexture)
// sont dispatchées par usePhotoMeshTexture selon le type.
// ---------------------------------------------------------------------------
const loader = new THREE.TextureLoader()
const MAX_SIZE = 512

const canvasCache = new Map()
const pendingLoads = new Map()

function resizeToCanvas(img) {
  const scale = Math.min(1, MAX_SIZE / Math.max(img.width, img.height))
  const w = Math.max(1, Math.floor(img.height * scale))
  const h = Math.max(1, Math.floor(img.width * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.translate(w, 0)
  ctx.rotate(Math.PI / 2)
  ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale)
  return canvas
}

function loadCanvas(url) {
  const cached = canvasCache.get(url)
  if (cached) return Promise.resolve(cached)
  if (!pendingLoads.has(url)) {
    pendingLoads.set(
      url,
      new Promise((resolve, reject) => {
        loader.load(
          url,
          (t) => {
            const canvas = resizeToCanvas(t.image)
            t.dispose()
            canvasCache.set(url, canvas)
            pendingLoads.delete(url)
            resolve(canvas)
          },
          undefined,
          (e) => {
            pendingLoads.delete(url)
            console.error('Échec du chargement de la texture :', url, e)
            reject(e)
          }
        )
      })
    )
  }
  return pendingLoads.get(url)
}

export function useImageMeshTexture(index, artworks) {
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    if (!artworks || artworks.length === 0) return
    let cancelled = false
    let texture = null
    const dispose = () => { if (texture) { texture.dispose(); texture = null } }

    const url = artworks[index % artworks.length]
    if (!url) return

    loadCanvas(url).then((canvas) => {
      if (cancelled) return
      texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      setTexture(texture)
    }).catch(() => {
      if (!cancelled) setTexture(null)
    })

    return () => { cancelled = true; dispose() }
  }, [index, artworks])

  return texture
}

export function useVideoMeshTexture(index, artworks) {
  const url = artworks?.[index % (artworks?.length || 1)]

  const { video, texture } = useMemo(() => {
    if (!url) return { video: null, texture: null }
    const video = document.createElement('video')
    video.src = url
    video.crossOrigin = 'anonymous'
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.play().catch(() => { })
    const texture = new THREE.VideoTexture(video)
    texture.colorSpace = THREE.SRGBColorSpace
    return { video, texture }
  }, [url])

  useEffect(() => () => {
    texture?.dispose()
    video?.pause()
  }, [video, texture])

  return texture
}



// ---------------------------------------------------------------------------
// useMeshTexture : texture d'un mesh à la position `index` dans `artworks`.
// Photo (image/video) si l'artwork porte une URL, sinon texture du texte
// générée depuis artwork.collection. `artworks` peut être une liste de strings
// (URLs) ou d'objets artwork.
// ---------------------------------------------------------------------------
const DEFAULT_SIZE = [CARD_W, CARD_H]

export function useMeshTexture(index, artworks = []) {
  const entry = artworks?.[index % (artworks.length || 1)]
  const isObject = entry && typeof entry === 'object'
  const url = isObject ? entry.image || entry.video : entry
  const type = isObject ? (entry.image ? 'image' : 'video') : 'image'
  const sources = artworks
    .map((a) => (typeof a === 'object' ? a.image || a.video : a))
    .filter(Boolean)

  const isVideo = !!url && type === 'video'
  const imageTexture = useImageMeshTexture(url && !isVideo ? index : -1, url && !isVideo ? sources : [])
  const videoTexture = useVideoMeshTexture(url && isVideo ? index : -1, url && isVideo ? sources : [])
  const { texture: textTexture, size: textSize } = useTextMeshTexture(url ? null : entry?.collection)

  if (!url) return { texture: textTexture, size: textSize }
  return { texture: isVideo ? videoTexture : imageTexture, size: DEFAULT_SIZE }
}