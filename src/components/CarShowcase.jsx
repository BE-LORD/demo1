import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { Car3D } from './Car3D'
import { Suspense } from 'react'

export default function CarShowcase({ type = 'sedan', color = '#00D4C8' }) {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[4, 2, 4]} fov={50} />
          
          {/* Lights */}
          <ambientLight intensity={0.4} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <spotLight
            position={[-10, 10, -10]}
            angle={0.15}
            penumbra={1}
            intensity={0.5}
            castShadow
          />
          
          {/* Key light with teal color */}
          <pointLight position={[5, 5, 5]} intensity={1} color="#00D4C8" />
          <pointLight position={[-5, 3, -5]} intensity={0.5} color="#38BDF8" />
          
          {/* Enhanced 3D Car */}
          <Car3D type={type} color={color} position={[0, 0, 0]} />
          
          {/* Ground */}
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.5}
            scale={10}
            blur={2}
            far={4}
          />
          
          {/* Environment for reflections */}
          <Environment preset="city" />
          
          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
