import React, { useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  useEffect(() => {
    // 创建场景
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // 创建 WebGL 渲染器并附加到页面
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 创建一个立方体并添加到场景中
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 设置相机位置
    camera.position.z = 5;

    // 创建动画循环
    const animate = () => {
      requestAnimationFrame(animate);

      // 旋转立方体
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // 渲染场景
      renderer.render(scene, camera);
    };

    animate();

    // 清理渲染器
    return () => {
      renderer.dispose();
    };
  }, []);

  return null;
};

export default ThreeScene;
