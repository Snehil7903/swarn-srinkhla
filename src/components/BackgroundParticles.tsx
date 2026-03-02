"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate 2000 random coordinates scattered in a 3D sphere
  const particlesCount = 2000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      // Spreading particles across a 10x10x10 area
      positions[i] = (Math.random() - 0.5) * 10; 
    }
    return positions;
  }, []);

  // Slowly rotate the entire cloud of particles on every frame render
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.05;
      pointsRef.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* Passed the typed array and item size directly into the args prop */}
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015} // Tiny, subtle specks
        color="#D4AF37" // Our custom metallic gold
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

export default function BackgroundParticles() {
  return (
    // pointer-events-none ensures the canvas doesn't block users from clicking/selecting text
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ParticleCloud />
      </Canvas>
    </div>
  );
}