import { useHome } from '../hooks/pages/useHome'
import '../styles/shared.css'
import '../styles/Home.css'

export default function Home() {
  const {
    HeaderComponent,
    selectorProps,
    SelectorComponent,
    heroProps,
    HeroComponent,
    transitionProps,
    TransitionComponent,
  } = useHome()

  return (
    <>
      {TransitionComponent && <TransitionComponent {...transitionProps} />}
      {HeaderComponent && <HeaderComponent />}
      <main className="main-layout">
        <div className="home-wrapper">
          <div className="home-inner">
            {HeroComponent && <HeroComponent {...heroProps} />}
          </div>
        </div>
        {SelectorComponent && <SelectorComponent {...selectorProps} />}
      </main>
    </>
  )
}