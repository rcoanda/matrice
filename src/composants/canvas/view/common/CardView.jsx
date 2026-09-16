import { Text } from '@react-three/drei'

export default function CardView({ card, position, onClick }) {
  return (
    <group position={position} onClick={onClick}>
      <mesh>
        <planeGeometry args={[2.4, 3.2]} />
        <meshBasicMaterial color="#f4efe6" />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.3}
        color="#25231f"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        {card}
      </Text>
    </group>
  )
}