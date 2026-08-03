import '../styles/Transition.css'

export default function Transition({ visible }) {
  if (!visible) return null

  return (
    <div className="page-transition">
      <svg className="page-transition-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path fill="#313927" d="M 0 0 Q 50 0 100 0 L 100 0 Q 50 0 0 0 Z">
          <animate attributeName="d" dur="0.8s" begin="0s"
            values="M 0 0 Q 50 0 100 0 L 100 0 Q 50 0 0 0 Z;
                    M 0 0 Q 50 100 100 0 L 100 100 Q 50 100 0 100 Z;
                    M 0 100 Q 50 100 100 100 L 100 100 Q 50 100 0 100 Z"
            keyTimes="0;0.5;1" fill="freeze" />
        </path>
      </svg>
    </div>
  )
}
