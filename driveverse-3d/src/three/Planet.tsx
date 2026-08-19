import { useTexture } from "@react-three/drei";

export function Planet() {
    const texture = useTexture('/textures/2k_earth_daymap.jpg');

    return(
        <mesh>
            <sphereGeometry args={[1.2, 64, 64]} />
            <meshStandardMaterial map={texture} roughness={0.8} />
        </mesh>
    );
}

