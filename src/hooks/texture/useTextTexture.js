import { useEffect, useMemo } from 'react'
import { CanvasTexture, SRGBColorSpace } from 'three'

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

export function useTextTexture(text) {
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

    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    return texture
  }, [text])

  useEffect(() => () => texture?.dispose(), [texture])

  return { texture, size: [CARD_W, CARD_H] }
}