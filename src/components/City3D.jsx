import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function City3D() {
  const cityRef = useRef()

  // Generate random buildings
  const buildings = useMemo(() => {
    const buildingData = []
    const gridSize = 20
    const spacing = 3
    
    for (let i = 0; i < 60; i++) {
      const x = (Math.random() - 0.5) * gridSize
      const z = -20 - Math.random() * 30
      const height = 2 + Math.random() * 8
      const width = 0.8 + Math.random() * 1.5
      const depth = 0.8 + Math.random() * 1.5
      
      // Random color - mostly teal, some blue, some white
      const rand = Math.random()
      let color
      if (rand < 0.6) {
        color = new THREE.Color(0x00D4C8) // Electric Teal
      } else if (rand < 0.85) {
        color = new THREE.Color(0x38BDF8) // Sky Blue
      } else {
        color = new THREE.Color(0xFFFFFF) // White
      }
      
      buildingData.push({
        position: [x, height / 2, z],
        scale: [width, height, depth],
        color,
        emissiveIntensity: 0.3 + Math.random() * 0.7
      })
    }
    
    return buildingData
  }, [])

  useFrame((state) => {
    if (cityRef.current) {
      // Subtle animation - buildings pulse slightly
      cityRef.current.children.forEach((building, i) => {
        if (building.material) {
          building.material.emissiveIntensity = 
            0.3 + Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.3
        }
      })
    }
  })

  return (
    <group ref={cityRef}>
      {buildings.map((building, i) => (
        <mesh key={i} position={building.position} castShadow receiveShadow>
          <boxGeometry args={building.scale} />
          <meshStandardMaterial
            color={building.color}
            emissive={building.color}
            emissiveIntensity={building.emissiveIntensity}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}
