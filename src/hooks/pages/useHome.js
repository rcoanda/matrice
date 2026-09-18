import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getInit } from '../../config/config'
import { getSelector } from '../../config/selectorConfig'
import { getHero } from '../../config/heroConfig'
import { getTransition } from '../../config/transitionConfig'
import { SelectionContext } from '../../providers/SelectionContext'

export function useHome() {
  const navigate = useNavigate()
  const { motionKey, viewKey, dataKey, reset } = useContext(SelectionContext)
  const [stage, setStage] = useState('idle')

  //selector
  const selectorProps = (() => {
    try {
      return getSelector(getInit('selectorConfig')) ?? null
    } catch {
      return null
    }
  })()
  const SelectorComponent = selectorProps?.component ?? null

  //hero
  const hero = (() => {
    try {
      return getHero(getInit('heroConfig'))
    } catch {
      return null
    }
  })()
  const HeroComponent = hero?.component ?? null
  const heroProps = hero
    ? Object.fromEntries(Object.entries(hero).filter(([k]) => k !== 'component' && k !== 'key'))
    : {}
  //transition
  const transition = (() => {
    try {
      return getTransition(getInit('transitionConfig')) ?? null
    } catch {
      return null
    }
  })()
  const TransitionComponent = transition?.component ?? null

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
    selectorProps,
    SelectorComponent,
    heroProps,
    HeroComponent,
    transitionProps,
    TransitionComponent,
  }
}