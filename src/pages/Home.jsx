import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Transition from '../composants/effects/Transition'
import Header from '../composants/layout/Header'
import { getAllInit, getInit } from '../config/config'
import { getAllMotionModes } from '../config/motionConfig'
import { getAllViewModes } from '../config/viewConfig'
import { getAllDataSources } from '../config/dataConfig'
import { getSelectorType } from '../config/selectorConfig'
import { getHeroType } from '../config/heroConfig'
import { SelectionContext } from '../providers/SelectionProvider'
import '../styles/shared.css'
import '../styles/Home.css'

export default function Home() {
  const navigate = useNavigate()
  const { motion, setMotion, viewMode, setViewMode, dataSource, setDataSource } = useContext(SelectionContext)
  const [stage, setStage] = useState('idle')
  const [dataSourceOptions, setDataSourceOptions] = useState([])
  const Selector = getSelectorType(getInit('selectorConfig')).component
  const Hero = getHeroType(getInit('heroConfig')).component
  const motionEnabled = getAllInit().some((i) => i.config === 'motionConfig')
  const viewEnabled = getAllInit().some((i) => i.config === 'viewConfig')

  useEffect(() => {
    getAllDataSources().then(setDataSourceOptions)
  }, [])

  useEffect(() => {
    const ready = dataSource && ((motionEnabled && motion) || (viewEnabled && viewMode))
    if (ready) {
      setStage('transition')
      setTimeout(() => {
        navigate('/galerie')
      }, 1500)
    } else {
      setStage('idle')
    }
  }, [motion, viewMode, dataSource, navigate, motionEnabled, viewEnabled])

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
          motionOptions={motionEnabled ? getAllMotionModes() : []}
          motion={motion}
          onMotionChange={setMotion}

          viewModeOptions={viewEnabled ? getAllViewModes() : []}
          viewMode={viewMode}
          onViewModeChange={setViewMode}

          dataSourceOptions={dataSourceOptions}
          dataSource={dataSource}
          onDataSourceChange={setDataSource}
        />
      </main>
    </>
  )
}
