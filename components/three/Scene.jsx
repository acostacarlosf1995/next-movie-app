import { Canvas } from "@react-three/fiber";
import { Stars } from "./Stars";

export const Scene = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <color attach="background" args={['#000']} />
                <Stars />
            </Canvas>
        </div>
    )
}