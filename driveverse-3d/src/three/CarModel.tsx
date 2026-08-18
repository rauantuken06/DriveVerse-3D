import { useGLTF } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';

export function CarModel() {
  const { scene, materials } = useGLTF('/models/ferrari.glb');

  const bodyMaterial = materials.Body_Color as MeshStandardMaterial;
  bodyMaterial.color.set('green');

  return <primitive object={scene} />;
}

useGLTF.preload('/models/ferrari.glb');
