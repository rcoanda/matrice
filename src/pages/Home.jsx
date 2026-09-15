import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Transition from '../composants/effects/Transition'
import Header from '../composants/layout/Header'
import { getInit, getInitList } from '../config/config'
import { getSelectorType } from '../config/selectorConfig'
import { getHeroType } from '../config/heroConfig'
import { SelectionContext } from '../providers/SelectionProvider'
import '../styles/shared.css'
import '../styles/Home.css'

export default function Home() {
  const navigate = useNavigate()
  const { motionMode, selectMotion, viewMode, selectView, dataSource, setDataSource } = useContext(SelectionContext)
  const [stage, setStage] = useState('idle')
  const [motionEnabled, setMotionEnabled] = useState(false)
  const [viewEnabled, setViewEnabled] = useState(false)

  const Selector = getSelectorType(getInit('selectorConfig')).component
  const Hero = getHeroType(getInit('heroConfig')).component

  useEffect(() => {
    getInitList('motionConfig').then((list) => setMotionEnabled(list.length > 0))
    getInitList('viewConfig').then((list) => setViewEnabled(list.length > 0))
  }, [])

  useEffect(() => {
    const ready = dataSource && ((motionEnabled && motionMode) || (viewEnabled && viewMode))
    if (ready) {
      setStage('transition')
      setTimeout(() => {
        navigate('/galerie')
      }, 1500)
    } else {
      setStage('idle')
    }
  }, [motionMode, viewMode, dataSource, navigate, motionEnabled, viewEnabled])

  return (
    <>
      <Transition visible={stage === 'transition'} />
      <Header />
      <main className="main-layout">
        <div className="home-wrapper">
          <div className="home-inner">
            <Hero />
          </div>
        </div>
        <Selector
          motion={motionMode}
          onMotionChange={selectMotion}
          viewMode={viewMode}
          onViewModeChange={selectView}
          dataSource={dataSource}
          onDataSourceChange={setDataSource}
        />
      </main>
    </>
  )
}
