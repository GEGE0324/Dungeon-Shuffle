import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// 加载小岛模型
function IslandModel() {
  const { scene } = useGLTF('/models/island.glb'); // 确保放在 public/models 目录下

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

// 控制相机运动
function CameraController() {
  const { camera } = useThree();
  const [currentProgress, setCurrentProgress] = useState(0); // 记录当前的进度
  const [targetProgress, setTargetProgress] = useState(0); // 目标进度，用于平滑过渡

  // 多个镜头的位置和朝向数组
  const cameraPositions = [
    { position: new THREE.Vector3(0, -50, 50), lookAt: new THREE.Vector3(0, -70, 0) },
    { position: new THREE.Vector3(-80, -20, 50), lookAt: new THREE.Vector3(0, -30, 0) },
    { position: new THREE.Vector3(-3, 6, 5), lookAt: new THREE.Vector3(-10, 6, 0) },
    { position: new THREE.Vector3(-5, 5, 3), lookAt: new THREE.Vector3(-5, 5, -3) },
    { position: new THREE.Vector3(-5, 6.5, -5), lookAt: new THREE.Vector3(2.5, 6.5, -3)},
    { position: new THREE.Vector3(5, 8, -10), lookAt: new THREE.Vector3(10, 3, 10) },
    { position: new THREE.Vector3(-5, 3, 20), lookAt: new THREE.Vector3(-5, 3, 5) },
    { position: new THREE.Vector3(-5, 5, 10), lookAt: new THREE.Vector3(0, 5, 0) },
    { position: new THREE.Vector3(0, 20, 10), lookAt: new THREE.Vector3(0, 10, 0) },
    { position: new THREE.Vector3(0,12, 66), lookAt: new THREE.Vector3(0,12, 0) },
  ];

  // 监听滚轮事件，控制镜头进度
  const handleWheel = (event) => {
    // 阻止默认滚轮行为
    event.preventDefault();
    
    // 增加平滑效果，限制滚轮增量的变化
    setTargetProgress((prevProgress) => {
      let newProgress = prevProgress + (event.deltaY > 0 ? 0.01 : -0.01);
      // 保证进度在0到1之间
      return Math.min(Math.max(newProgress, 0), 1);
    });
  };

  // 每帧更新相机位置和朝向
  useFrame(() => {
    // 平滑过渡目标进度
    const smoothProgress = THREE.MathUtils.lerp(currentProgress, targetProgress, 0.1);
    setCurrentProgress(smoothProgress);

    // 根据进度计算当前镜头的位置和下一个镜头的位置
    const totalCameras = cameraPositions.length;
    const currentIndex = Math.floor(currentProgress * (totalCameras - 1));
    const nextIndex = Math.min(currentIndex + 1, totalCameras - 1);

    const startPos = cameraPositions[currentIndex];
    const endPos = cameraPositions[nextIndex];

    // 计算目标位置的平滑过渡
    const lerpedPosition = new THREE.Vector3().lerpVectors(
      startPos.position, endPos.position, currentProgress * (totalCameras - 1) - currentIndex
    );

    const lerpedLookAt = new THREE.Vector3().lerpVectors(
      startPos.lookAt, endPos.lookAt, currentProgress * (totalCameras - 1) - currentIndex
    );

    camera.position.copy(lerpedPosition);
    camera.lookAt(lerpedLookAt);
  });

  useEffect(() => {
    // 监听滚轮事件
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return null;
}

export default function Island() {
  const texture = useLoader(THREE.TextureLoader, '/sky.jpg');

  return (
    <Canvas camera={{ position: [0, 5, 25], fov: 45 }}>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>

      <ambientLight intensity={0.4} color={new THREE.Color(0xFFFFFF)} />
      <directionalLight
        position={[100, 200, 100]}
        intensity={2.5}
        color={new THREE.Color(0xFFD750)}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={500}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
      />
      <directionalLight
        position={[-50, -100, -50]}
        intensity={0.8}
        color={new THREE.Color(0x87CEFA)}
        castShadow={false}
      />
      <spotLight
        position={[50, 80, 50]}
        intensity={3.0}
        angle={0.3}
        penumbra={0.5}
        castShadow
        color={new THREE.Color(0xFFFF00)}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight
        position={[10, 0, 30]}
        intensity={5.5}
        color={new THREE.Color(0xFFD700)}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      
      <IslandModel />
      <CameraController />
      <OrbitControls />
    </Canvas>
  );
}
