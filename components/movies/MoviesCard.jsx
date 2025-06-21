import React, { useRef, useState } from 'react';
import { useSpring, a } from '@react-spring/three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Text, RoundedBox } from '@react-three/drei';
import { useRouter } from 'next/router';
import * as THREE from 'three';

// Este es el componente que renderiza la tarjeta 3D individual.
const Card3D = ({ movie }) => {
  // Obtenemos el router de Next.js para poder navegar a la página de detalles de la película.
  const router = useRouter();

  // Creamos una referencia a la malla (el objeto 3D) para poder manipularla directamente.
  const meshRef = useRef();

  // Creamos un estado para saber si el cursor está sobre la tarjeta o no.
  const [hovered, setHovered] = useState(false);

  // Usamos el hook useSpring de react-spring para crear una animación de escala.
  // La tarjeta se agrandará un 10% cuando el cursor esté sobre ella.
  const spring = useSpring({
    scale: hovered ? 1.1 : 1,
    // La configuración de la animación define la física del resorte (masa, tensión y fricción).
    config: { mass: 1, tension: 170, friction: 26 },
  });

  // useFrame es un hook de react-three-fiber que ejecuta una función en cada fotograma.
  useFrame((state) => {
    // Si la referencia a la malla existe...
    if (meshRef.current) {
      if (hovered) {
        // Obtenemos la posición del ratón (coordenadas normalizadas de -1 a 1).
        const { x, y } = state.mouse;
        // Interpolamos suavemente la rotación en el eje Y de la tarjeta para que siga al ratón horizontalmente.
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (x * Math.PI) / 5, 0.1);
        // Interpolamos suavemente la rotación en el eje X de la tarjeta para que siga al ratón verticalmente.
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, (-y * Math.PI) / 5, 0.1);
      } else {
        // Si el cursor no está encima, interpolamos la rotación de vuelta a cero para que mire de frente.
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
      }
    }
  });

  // Esta función se ejecuta cuando se hace clic en la tarjeta.
  const handleClick = () => {
    // Navegamos a la página de detalles de la película usando el ID de la película.
    router.push(`/movie/${movie.id}`);
  };

  // Retornamos una malla animada. 'a.mesh' es un componente de react-spring que permite animar propiedades.
  return (
    <a.mesh
      ref={meshRef} // Asignamos la referencia a la malla.
      onPointerEnter={() => setHovered(true)} // Cuando el cursor entra, activamos el estado 'hovered'.
      onPointerLeave={() => setHovered(false)} // Cuando el cursor sale, desactivamos el estado 'hovered'.
      onClick={handleClick} // Asignamos la función de clic.
      scale={spring.scale} // Aplicamos la animación de escala.
    >
      {/* Reemplazamos boxGeometry por RoundedBox para tener bordes redondeados. */}
      {/* args: [ancho, alto, profundidad], radius: radio del borde */}
      <RoundedBox args={[3.8, 6, 0.15]} radius={0.25}>
        {/* Este es el material de la tarjeta, de color negro. */}
        <meshStandardMaterial color="black" />
      </RoundedBox>

      {/* Usamos el componente Image de drei para mostrar el póster de la película. */}
      {/* Añadimos borderRadius para que la imagen también tenga los bordes redondeados. */}
      <Image
        url={movie.poster}
        position={[0, 0.4, 0.08]}
        scale={[3.2, 4.8, 1]}
        crossOrigin="anonymous"
        borderRadius={0.25}
      />

      {/* Usamos el componente Text de drei para mostrar el título de la película. */}
      <Text
        position={[0, -2.5, 0.08]} // Lo posicionamos debajo de la imagen.
        fontSize={0.25} // Tamaño de la fuente.
        color="white" // Color del texto.
        anchorX="center" // Anclaje horizontal del texto.
        anchorY="middle" // Anclaje vertical del texto.
        maxWidth={2} // Ancho máximo del texto antes de hacer un salto de línea.
        textAlign="center" // Alineación del texto.
      >
        {movie.title}
      </Text>
    </a.mesh>
  );
};

// Este es el componente principal que exportamos.
export const MoviesCard = ({ movies }) => {
  return (
    // Ya no necesitamos el componente Grid aquí, el carrusel se encargará del layout.
    // Mantenemos el div contenedor para definir el tamaño del Canvas.
    <div style={{ width: '100%', height: '400px', cursor: 'pointer' }}>
      {/* El componente Canvas es el lienzo donde se renderizará nuestra escena 3D. */}
      <Canvas>
        {/* Añadimos una luz ambiental para iluminar la escena de forma general. */}
        <ambientLight intensity={0.5} />
        {/* Añadimos una luz puntual para crear sombras y reflejos. */}
        <pointLight position={[10, 10, 10]} />
        {/* Renderizamos nuestro componente de la tarjeta 3D. */}
        <Card3D movie={movies} />
      </Canvas>
    </div>
  );
};