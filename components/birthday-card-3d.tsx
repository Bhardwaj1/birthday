"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text3D, Center, Float, Environment, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function CakeBase() {
  const cakeRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={cakeRef} position={[0, -1.5, 0]}>
        {/* Bottom layer */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.8, 32]} />
          <meshStandardMaterial color="#ff85a2" roughness={0.5} />
        </mesh>
        {/* Middle layer */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.6, 32]} />
          <meshStandardMaterial color="#ffb6c1" roughness={0.5} />
        </mesh>
        {/* Top layer */}
        <mesh position={[0, 1.25, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.5, 32]} />
          <meshStandardMaterial color="#ff69b4" roughness={0.5} />
        </mesh>
        {/* Frosting drips */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          return (
            <mesh
              key={i}
              position={[
                Math.cos(rad) * 1.2,
                0.2 - Math.random() * 0.3,
                Math.sin(rad) * 1.2,
              ]}
            >
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color="#ffd700" roughness={0.3} />
            </mesh>
          )
        })}
        {/* Candles */}
        {[-0.3, 0, 0.3].map((x, i) => (
          <group key={i} position={[x, 1.75, 0]}>
            <mesh>
              <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
              <meshStandardMaterial color={i === 1 ? "#ffd700" : "#ff69b4"} />
            </mesh>
            {/* Flame */}
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial
                color="#ffd700"
                emissive="#ff8c00"
                emissiveIntensity={2}
              />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  )
}

function FloatingHearts({ count = 15 }: { count?: number }) {
  const heartsRef = useRef<THREE.Group>(null)

  const hearts = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 8,
      z: -2 - Math.random() * 5,
      scale: 0.1 + Math.random() * 0.2,
      speed: 0.3 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
    }))
  }, [count])

  useFrame((state) => {
    if (heartsRef.current) {
      heartsRef.current.children.forEach((heart, i) => {
        const config = hearts[i]
        heart.position.y = config.y + Math.sin(state.clock.elapsedTime * config.speed + config.offset) * 0.5
        heart.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + config.offset) * 0.3
      })
    }
  })

  return (
    <group ref={heartsRef}>
      {hearts.map((h, i) => (
        <mesh key={i} position={[h.x, h.y, h.z]} scale={h.scale}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <MeshDistortMaterial
            color={i % 2 === 0 ? "#ff69b4" : "#ff1493"}
            roughness={0.3}
            metalness={0.2}
            distort={0.4}
            speed={3}
          />
        </mesh>
      ))}
    </group>
  )
}

function BirthdayText() {
  return (
    <Center position={[0, 1.5, 0]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
          size={0.5}
          height={0.15}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
        >
          {"Happy Birthday!"}
          <meshStandardMaterial
            color="#ffd700"
            metalness={0.8}
            roughness={0.2}
            emissive="#ffd700"
            emissiveIntensity={0.3}
          />
        </Text3D>
      </Float>
    </Center>
  )
}

function GlowingParticles({ count = 40 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      const pos = ref.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.003
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ffd700"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#fff5f5" />
      <pointLight position={[0, 3, 2]} intensity={1} color="#ff69b4" />
      <pointLight position={[-3, -1, 3]} intensity={0.5} color="#ffd700" />

      <BirthdayText />
      <CakeBase />
      <FloatingHearts count={12} />
      <GlowingParticles count={50} />
      <Environment preset="sunset" />
    </>
  )
}

export default function BirthdayCard3D() {
  return (
    <div className="w-full h-[50vh] md:h-[60vh]">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{
          background: "linear-gradient(180deg, #1a0a10 0%, #2d1020 50%, #1a0a10 100%)",
        }}
      >
        <Scene3D />
      </Canvas>
    </div>
  )
}
