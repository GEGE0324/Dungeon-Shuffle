// src/Crow.js
import React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function CrowModel() {
  const { scene, animations } = useGLTF('/models/crow.glb'); // 确保放在 public/models 目录下
  const mixer = React.useMemo(() => new THREE.AnimationMixer(scene), [scene]);

  React.useEffect(() => {
    const action = mixer.clipAction(animations[0]);
    action.play();
    return () => animations.forEach((clip) => mixer.uncacheClip(clip));
  }, [animations, mixer]);

  useFrame((state, delta) => mixer.update(delta));

  return <primitive object={scene} />;
}

export default function Crow() {
  return (
    <Canvas camera={{ position: [0, 5, 25] }}>
      <ambientLight intensity={3} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls />
      <CrowModel />
    </Canvas>
  );
}
