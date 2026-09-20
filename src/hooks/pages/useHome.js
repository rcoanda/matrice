import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTenant } from '../tenant/useTenant'
import { SelectionContext } from '../../providers/SelectionContext'

export function useHome() {
  const navigate = useNavigate()
  const { motionKey, viewKey, dataKey, reset } = useContext(SelectionContext)
  const { selectorItem, heroItem, transitionItem } = useTenant()
  const [stage, setStage] = useState('idle')

  //selector
  const SelectorComponent = selectorItem?.component ?? null
  const selectorProps = selectorItem
    ? Object.fromEntries(Object.entries(selectorItem).filter(([k]) => k !== 'component' && k !== 'key'))
    : {}

  //hero
  const HeroComponent = heroItem?.component ?? null
  const heroProps = heroItem
    ? Object.fromEntries(Object.entries(heroItem).filter(([k]) => k !== 'component' && k !== 'key'))
    : {}
  //transition
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
    selectorProps,
    SelectorComponent,
    heroProps,
    HeroComponent,
    transitionProps,
    TransitionComponent,
  }
}