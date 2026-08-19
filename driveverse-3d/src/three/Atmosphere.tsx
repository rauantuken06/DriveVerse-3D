import { BackSide, AdditiveBlending, Color } from 'three';

const vertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 glowColor;
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
    gl_FragColor = vec4(glowColor, 1.0) * intensity;
  }
`;

type AtmosphereProps = {
  color?: string;
  planetRadius?: number;
};

export function Atmosphere({ color = '#5fdde0', planetRadius = 1.2 }: AtmosphereProps) {
  return (
    <mesh>
      <sphereGeometry args={[planetRadius * 1.15, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ glowColor: { value: new Color(color) } }}
        side={BackSide}
        blending={AdditiveBlending}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
