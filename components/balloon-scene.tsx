"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function Balloon({ position, color, scale = 1, speed = 1 }: { 
  position: [number, number, number]
  color: string
  scale?: number
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const stringRef = useRef<THREE.Mesh>(null)
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + timeOffset) * 0.5
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + timeOffset) * 0.1
    }
    if (stringRef.current) {
      stringRef.current.position.y = meshRef.current 
        ? meshRef.current.position.y - 1.2 * scale 
        : position[1] - 1.2 * scale
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        <mesh ref={meshRef} position={position} scale={scale}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <MeshDistortMaterial
            color={color}
            roughness={0.2}
            metalness={0.3}
            distort={0.15}
            speed={2}
          />
        </mesh>
        {/* Balloon knot */}
        <mesh position={[position[0], position[1] - 0.65 * scale, position[2]]} scale={scale * 0.15}>
          <coneGeometry args={[0.5, 1, 8]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* String */}
        <mesh ref={stringRef} position={[position[0], position[1] - 1.2 * scale, position[2]]}>
          <cylinderGeometry args={[0.008, 0.008, 1.5 * scale, 8]} />
          <meshStandardMaterial color="#ffffff" opacity={0.6} transparent />
        </mesh>
      </group>
    </Float>
  )
}

function FloatingParticles({ count = 50 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sparkleColors = [
      new THREE.Color("#ff69b4"),
      new THREE.Color("#ffd700"),
      new THREE.Color("#ff1493"),
      new THREE.Color("#ffffff"),
    ]
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      
      const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function Stars({ count = 200 }: { count?: number }) {
  const starsRef = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = -5 - Math.random() * 15
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.z = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffd700" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function Scene() {
  const balloonConfigs = useMemo(() => [
    { position: [-3, 2, -2] as [number, number, number], color: "#ff69b4", scale: 1.1, speed: 0.8 },
    { position: [2.5, 1, -1] as [number, number, number], color: "#ff1493", scale: 0.9, speed: 1.2 },
    { position: [-1, 3, -3] as [number, number, number], color: "#ffd700", scale: 1.3, speed: 0.6 },
    { position: [3.5, 2.5, -2] as [number, number, number], color: "#ff85a2", scale: 1.0, speed: 1.0 },
    { position: [0, 1.5, -1] as [number, number, number], color: "#ffb6c1", scale: 0.8, speed: 1.4 },
    { position: [-2.5, 0, -2] as [number, number, number], color: "#ff4081", scale: 1.2, speed: 0.9 },
    { position: [1, 3.5, -3] as [number, number, number], color: "#ffc107", scale: 1.0, speed: 0.7 },
    { position: [-4, 1, -4] as [number, number, number], color: "#e91e63", scale: 0.7, speed: 1.1 },
    { position: [4, 0, -3] as [number, number, number], color: "#ff69b4", scale: 0.85, speed: 1.3 },
    { position: [0, -1, -2] as [number, number, number], color: "#ffd700", scale: 1.1, speed: 0.5 },
    { position: [-1.5, -2, -1] as [number, number, number], color: "#ff85a2", scale: 0.75, speed: 1.0 },
    { position: [2, -1.5, -2] as [number, number, number], color: "#ff1493", scale: 0.95, speed: 0.8 },
  ], [])

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fff5f5" />
      <pointLight position={[-3, 3, 2]} intensity={0.6} color="#ff69b4" />
      <pointLight position={[3, -2, 2]} intensity={0.4} color="#ffd700" />
      
      {balloonConfigs.map((config, i) => (
        <Balloon key={i} {...config} />
      ))}
      
      <FloatingParticles count={60} />
      <Stars count={150} />
      <Environment preset="sunset" />
    </>
  )
}

export default function BalloonScene() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "linear-gradient(180deg, #1a0a10 0%, #2d1020 50%, #1a0a10 100%)" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
