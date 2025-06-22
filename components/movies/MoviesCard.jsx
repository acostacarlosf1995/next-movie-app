import React, { useRef, useState } from 'react';
import { useSpring, a } from '@react-spring/three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Text, RoundedBox } from '@react-three/drei';
import { useRouter } from 'next/router';
import * as THREE from 'three';

const Card3D = ({ movie }) => {
  const router = useRouter();

  const meshRef = useRef();

  const [hovered, setHovered] = useState(false);

  const securePosterUrl = movie.poster.replace(/^http:\/\//i, 'https://');

  const spring = useSpring({
    scale: hovered ? 1.1 : 1,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  useFrame((state) => {
    if (meshRef.current) {
      if (hovered) {
        const { x, y } = state.mouse;
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (x * Math.PI) / 5, 0.1);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, (-y * Math.PI) / 5, 0.1);
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
      }
    }
  });

  const handleClick = () => {
    router.push(`/movie/${movie.id}`);
  };

  return (
    <a.mesh
      ref={meshRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
      scale={spring.scale}
    >

      <RoundedBox args={[3.8, 6, 0.15]} radius={0.25}>
        <meshStandardMaterial color="black" />
      </RoundedBox>


      <Image
        url={securePosterUrl}
        position={[0, 0.4, 0.08]}
        scale={[3.2, 4.8, 1]}
        crossOrigin="anonymous"
        borderRadius={0.25}
      />

      <Text
        position={[0, -2.5, 0.08]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        {movie.title}
      </Text>
    </a.mesh>
  );
};

export const MoviesCard = ({ movies }) => {
  return (
    <div style={{ width: '100%', height: '400px', cursor: 'pointer' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Card3D movie={movies} />
      </Canvas>
    </div>
  );
};