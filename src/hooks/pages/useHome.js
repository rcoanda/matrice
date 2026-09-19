import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getKey } from '../../config/config'
import { getSelector } from '../../config/selectorConfig'
import { getHero } from '../../config/heroConfig'
import { getTransition } from '../../config/transitionConfig'
import { SelectionContext } from '../../providers/SelectionContext'

export function useHome() {
  const navigate = useNavigate()
  const { motionKey, viewKey, dataKey, reset } = useContext(SelectionContext)
  const [stage, setStage] = useState('idle')

  //selector
  const selectorItem = (() => {
    try {
      return getSelector(getKey('selectorConfig')) ?? null
    } catch {
      return null
    }
  })()
  const SelectorComponent = selectorItem?.component ?? null

  //hero
  const heroItem = (() => {
    try {
      return getHero(getKey('heroConfig'))
    } catch {
      return null
    }
  })()
  const HeroComponent = heroItem?.component ?? null
  const heroProps = heroItem
    ? Object.fromEntries(Object.entries(heroItem).filter(([k]) => k !== 'component' && k !== 'key'))
    : {}
  //transition
  const transitionItem = (() => {
    try {
      return getTransition(getKey('transitionConfig')) ?? null
    } catch {
      return null
    }
  })()
  const TransitionComponent = transitionItem?.component ?? null

  const transitionProps = { visible: stage === 'transition' }
  useEffect(() => {
    reset()
  }, [reset])

  //ready
  useEffect(() => {
    const ready = dataKey && (motionKey || viewKey)
    if (ready) {
      setStage('transition')
      setTimeout(() => {
        navigate('/galerie')
      }, 1500)
    } else {
      setStage('idle')
    }
  }, [motionKey, viewKey, dataKey, navigate])

  return {
    selectorItem,
    SelectorComponent,
    heroProps,
    HeroComponent,
    transitionProps,
    TransitionComponent,
  }
}