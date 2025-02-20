import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Text, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const FloatingPlatform = () => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      {/* Main Platform */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[4, 5, 0.5, 32]} />
        <meshStandardMaterial color="#2563eb" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Decorative Rings */}
      <mesh position={[0, 0.3, 0]}>
        <torusGeometry args={[3, 0.1, 16, 100]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} emissive="#60a5fa" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Center Pillar */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 2, 32]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const FloatingCrystals = () => {
  const crystalsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (crystalsRef.current) {
      crystalsRef.current.rotation.y += 0.005;
      crystalsRef.current.children.forEach((crystal, i) => {
        crystal.position.y = Math.sin(state.clock.elapsedTime + i) * 0.3;
      });
    }
  });

  return (
    <group ref={crystalsRef}>
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 3;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              1,
              Math.sin(angle) * radius
            ]}
          >
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial
              color="#60a5fa"
              metalness={0.9}
              roughness={0.1}
              emissive="#60a5fa"
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const FloatingText = () => {
  const textRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + 2;
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={textRef}>
      <Text
        position={[0, 0, 0]}
        fontSize={1.5}
        color="#60a5fa"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#1e3a8a"
      >
        SkillHunter
      </Text>
    </group>
  );
};

const RotatingLights = () => {
  const lightsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (lightsRef.current) {
      lightsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={lightsRef}>
      {[...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const radius = 8;
        return (
          <pointLight
            key={i}
            position={[
              Math.cos(angle) * radius,
              2,
              Math.sin(angle) * radius
            ]}
            color={i % 2 === 0 ? "#60a5fa" : "#818cf8"}
            intensity={5}
            distance={15}
          />
        );
      })}
    </group>
  );
};

export const Scene3D = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 5, 12], fov: 60 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 5, 30]} />
        
        <ambientLight intensity={0.5} />
        <RotatingLights />
        
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        
        <FloatingPlatform />
        <FloatingCrystals />
        <FloatingText />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};