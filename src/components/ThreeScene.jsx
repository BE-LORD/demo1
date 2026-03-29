import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeScene() {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const animationIdRef = useRef(null)
  const cameraRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(0, 1.4, 3.5)
    camera.lookAt(0, 0.6, -15)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights - TEAL THEME
    const ambientLight = new THREE.AmbientLight(0x0A1025, 0.8)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x00D4C8, 2.0, 25, 2)
    pointLight1.position.set(0, 3, 0)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x38BDF8, 0.8, 40, 1)
    pointLight2.position.set(0, 1, -20)
    scene.add(pointLight2)

    // Fog
    scene.fog = new THREE.FogExp2(0x03051A, 0.012)

    // Road
    const roadGeometry = new THREE.PlaneGeometry(5, 100, 1, 50)
    roadGeometry.rotateX(-Math.PI / 2)
    const roadMaterial = new THREE.MeshStandardMaterial({
      color: 0x0A0D1A,
      roughness: 0.95,
      metalness: 0.05
    })
    const road = new THREE.Mesh(roadGeometry, roadMaterial)
    scene.add(road)

    // Road markings
    const markings = []
    for (let i = 0; i < 16; i++) {
      const markingGeometry = new THREE.BoxGeometry(0.05, 0.002, 0.7)
      const markingMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xFFFFFF, 
        transparent: true, 
        opacity: 0.7 
      })
      const marking = new THREE.Mesh(markingGeometry, markingMaterial)
      marking.position.set(0, 0.01, -45 + i * 3)
      scene.add(marking)
      markings.push(marking)
    }

    // TEAL LED road edges
    const edgeGeometry = new THREE.BoxGeometry(0.015, 0.01, 80)
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00D4C8,
      emissive: 0x00D4C8,
      emissiveIntensity: 1.5
    })
    
    const leftEdge = new THREE.Mesh(edgeGeometry, edgeMaterial)
    leftEdge.position.set(-2.5, 0.01, 0)
    scene.add(leftEdge)
    
    const rightEdge = new THREE.Mesh(edgeGeometry, edgeMaterial.clone())
    rightEdge.position.set(2.5, 0.01, 0)
    scene.add(rightEdge)

    // Headlight beams (TEAL)
    const beamGeometry = new THREE.ConeGeometry(0.9, 14, 6, 1, true)
    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0x00D4C8,
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide
    })
    
    const leftBeam = new THREE.Mesh(beamGeometry, beamMaterial)
    leftBeam.position.set(-0.4, 0.3, 0.5)
    leftBeam.rotation.x = Math.PI / 2
    scene.add(leftBeam)
    
    const rightBeam = new THREE.Mesh(beamGeometry, beamMaterial.clone())
    rightBeam.position.set(0.4, 0.3, 0.5)
    rightBeam.rotation.x = Math.PI / 2
    scene.add(rightBeam)

    // City skyline (TEAL theme)
    const cityPositions = []
    const cityColors = []
    for (let i = 0; i < 140; i++) {
      cityPositions.push(
        (Math.random() - 0.5) * 20,
        Math.random() * 5,
        -40 - Math.random() * 20
      )
      const rand = Math.random()
      if (rand < 0.57) {
        cityColors.push(0, 0.831, 0.784) // Electric Teal
      } else if (rand < 0.86) {
        cityColors.push(0.22, 0.741, 0.969) // Sky Blue
      } else {
        cityColors.push(1, 1, 1) // White
      }
    }
    
    const cityGeometry = new THREE.BufferGeometry()
    cityGeometry.setAttribute('position', new THREE.Float32BufferAttribute(cityPositions, 3))
    cityGeometry.setAttribute('color', new THREE.Float32BufferAttribute(cityColors, 3))
    
    const cityMaterial = new THREE.PointsMaterial({
      size: 0.07,
      sizeAttenuation: true,
      vertexColors: true
    })
    
    const cityPoints = new THREE.Points(cityGeometry, cityMaterial)
    scene.add(cityPoints)

    // Stars
    const starPositions = []
    for (let i = 0; i < 350; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 60
      
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      if (y > 1) {
        starPositions.push(x, y, z)
      }
    }
    
    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3))
    
    const starMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.035,
      transparent: true,
      opacity: 0.5
    })
    
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Animation
    let time = 0
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      time += 0.016

      // Animate road markings
      markings.forEach(marking => {
        marking.position.z += 0.09
        if (marking.position.z > 2.5) {
          marking.position.z = -45
        }
      })

      // Animate headlight beams
      leftBeam.material.opacity = 0.04 + Math.sin(time * 0.7) * 0.02
      rightBeam.material.opacity = 0.04 + Math.sin(time * 0.7) * 0.02

      // Animate city skyline
      const cityPos = cityPoints.geometry.attributes.position.array
      for (let i = 0; i < cityPos.length; i += 3) {
        cityPos[i + 1] += Math.sin(time + i * 0.4) * 0.005
      }
      cityPoints.geometry.attributes.position.needsUpdate = true

      // Star rotation
      scene.rotation.y += 0.00015

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      
      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-[1] pointer-events-none"
    />
  )
}
