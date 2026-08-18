import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CarModel } from './three/CarModel';

type Theme = 'dark' | 'light';

function App() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app">
      <button
        style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        Toggle theme
      </button>

      <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={null}>
          <CarModel />
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
