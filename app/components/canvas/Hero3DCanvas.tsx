"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = new THREE.Timer();

    // 1. Scene & Cinematic Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf4f1eb, 3.2);
    keyLight.position.set(6, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc5a880, 1.4);
    fillLight.position.set(-6, -4, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xc5a880, 4.5, 12);
    rimLight.position.set(2, -2, -2.5);
    scene.add(rimLight);

    // 4. 3D Architectural Quantum Sculpture Group
    const group = new THREE.Group();
    group.position.set(1.4, 0, 0);
    scene.add(group);

    // Primary Core: Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(1.15, 0.35, 100, 24, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#c5a880"),
      metalness: 0.92,
      roughness: 0.08,
      reflectivity: 0.98,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 0.78,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    group.add(knotMesh);

    // Outer Harmonic Wireframe Cage
    const wireGeo = new THREE.TorusKnotGeometry(1.18, 0.36, 60, 16, 2, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#f4f1eb"),
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireMesh);

    // Orbital Halo Ring
    const haloGeo = new THREE.TorusGeometry(2.1, 0.008, 8, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#c5a880"),
      transparent: true,
      opacity: 0.25,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.set(Math.PI / 2.3, 0.35, 0);
    group.add(haloMesh);

    // 5. Floating Star Dust
    const dustCount = 35;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 8;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: new THREE.Color("#c5a880"),
      size: 0.035,
      transparent: true,
      opacity: 0.5,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // 6. Interactive Mouse State
    const mouse = { targetX: 0, targetY: 0, currentX: 0, currentY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = ((e.clientX / window.innerWidth) - 0.5) * 0.5;
      mouse.targetY = -((e.clientY / window.innerHeight) - 0.5) * 0.35;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // 7. Viewport Responsive Sizing
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      if (width < 768) {
        group.position.set(0, 0.2, 0);
        group.scale.setScalar(0.8);
      } else {
        group.position.set(1.4, 0, 0);
        group.scale.setScalar(1.0);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // 8. Performance Guard: Pause WebGL Loop when Hero is Off-Screen (ibelick/baseline-ui)
    let animationFrameId = 0;
    let isVisible = true;

    const animate = (timestamp: number) => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);

      timer.update(timestamp);
      const delta = timer.getDelta();
      const elapsed = timer.getElapsed();

      if (!reducedMotion) {
        mouse.currentX = THREE.MathUtils.damp(mouse.currentX, mouse.targetX, 3.5, delta);
        mouse.currentY = THREE.MathUtils.damp(mouse.currentY, mouse.targetY, 3.5, delta);

        group.rotation.y = THREE.MathUtils.damp(group.rotation.y, mouse.currentX * 0.8, 3.0, delta);
        group.rotation.x = THREE.MathUtils.damp(group.rotation.x, mouse.currentY * 0.8, 3.0, delta);
        group.position.y = (container.clientWidth < 768 ? 0.2 : 0) + Math.sin(elapsed * 0.8) * 0.08;

        knotMesh.rotation.x = elapsed * 0.14;
        knotMesh.rotation.y = elapsed * 0.22;
        wireMesh.rotation.x = -elapsed * 0.09;
        wireMesh.rotation.y = elapsed * 0.15;
        haloMesh.rotation.z = elapsed * 0.06;
      }

      renderer.render(scene, camera);
    };

    // Observer pauses render loop completely when scrolled away
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          timer.reset();
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { rootMargin: "100px 0px" }
    );
    intersectionObserver.observe(container);

    animationFrameId = requestAnimationFrame(animate);

    // 9. Resource Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      knotGeo.dispose();
      knotMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
