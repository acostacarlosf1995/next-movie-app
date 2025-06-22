import { useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

function AnimatedStars() {
  const starsRef = useRef();

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.x -= delta / 10;
      starsRef.current.rotation.y -= delta / 15;
    }
  });

  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade />;
}

export function Scene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <color attach="background" args={['#000']} />
        <AnimatedStars />
      </Canvas>
    </div>
  );
}