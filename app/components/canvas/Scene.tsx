"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Use modern THREE.Timer (replaces deprecated THREE.Clock)
    const timer = new THREE.Timer();

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xf4f1eb, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xc5a880, 1.2);
    dirLight2.position.set(-5, -3, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xc5a880, 2.0, 10);
    pointLight.position.set(2, 3, 2);
    scene.add(pointLight);

    // 3D Sculpture Group
    const group = new THREE.Group();
    // Offset slightly right on larger screens for balanced composition
    group.position.set(1.4, 0, 0);
    scene.add(group);

    // 1. Core Glass & Metallic Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#c5a880"),
      metalness: 0.85,
      roughness: 0.12,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.65,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 2. Outer Rotating Wireframe Frame
    const outerGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#c5a880"),
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // 3. Orbital Halo Ring
    const ringGeo = new THREE.TorusGeometry(2.1, 0.008, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#c5a880"),
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.set(Math.PI / 2.2, 0.4, 0);
    group.add(ringMesh);

    // Mouse Parallax
    const mouse = { targetX: 0, targetY: 0, currentX: 0, currentY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouse.targetX = ((e.clientX / innerWidth) - 0.5) * 0.4;
      mouse.targetY = -((e.clientY / innerHeight) - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Handle Resize & Mobile responsive position
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Mobile position adjustment
      if (width < 768) {
        group.position.set(0, 0.2, 0);
        group.scale.setScalar(0.85);
      } else {
        group.position.set(1.4, 0, 0);
        group.scale.setScalar(1.0);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // Render Animation Loop using THREE.Timer
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate);

      timer.update(timestamp);
      const elapsed = timer.getElapsed();

      if (!reducedMotion) {
        // Smooth lerp mouse parallax
        mouse.currentX = THREE.MathUtils.lerp(mouse.currentX, mouse.targetX, 0.05);
        mouse.currentY = THREE.MathUtils.lerp(mouse.currentY, mouse.targetY, 0.05);

        group.rotation.y = mouse.currentX;
        group.rotation.x = mouse.currentY;
        group.position.y = (container.clientWidth < 768 ? 0.2 : 0) + Math.sin(elapsed * 0.8) * 0.08;

        coreMesh.rotation.x = elapsed * 0.15;
        coreMesh.rotation.y = elapsed * 0.22;

        outerMesh.rotation.x = -elapsed * 0.1;
        outerMesh.rotation.y = elapsed * 0.14;

        ringMesh.rotation.z = elapsed * 0.08;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup & Resource Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();

      coreGeo.dispose();
      coreMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
