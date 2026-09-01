"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 5;

    // Particle nodes
    const COUNT = 90;
    const positions = new Float32Array(COUNT * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      velocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.003,
        z: 0,
      });
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0x1e2a20, size: 0.045, transparent: true, opacity: 0.7 });
    const points = new THREE.Points(geom, mat);
    scene.add(points);

    // Connection lines
    const lineGeom = new THREE.BufferGeometry();
    const linePositions = new Float32Array(COUNT * COUNT * 6);
    // Line material for network connections
    lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x1e2a20, transparent: true, opacity: 0.18 });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lines);

    // Mouse
    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    const THRESHOLD = 2.2;
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (reduced) return;

      const pos = geom.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        if (Math.abs(pos[i * 3]) > 5.2) velocities[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 3.2) velocities[i].y *= -1;
      }
      geom.attributes.position.needsUpdate = true;

      // Camera drift toward mouse
      camera.position.x += (mouse.x - camera.position.x) * 0.04;
      camera.position.y += (mouse.y - camera.position.y) * 0.04;

      // Rebuild connection lines
      const lp = lineGeom.attributes.position.array as Float32Array;
      let idx = 0;
      for (let a = 0; a < COUNT; a++) {
        for (let b = a + 1; b < COUNT; b++) {
          const dx = pos[a * 3] - pos[b * 3];
          const dy = pos[a * 3 + 1] - pos[b * 3 + 1];
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < THRESHOLD) {
            lp[idx++] = pos[a * 3]; lp[idx++] = pos[a * 3 + 1]; lp[idx++] = pos[a * 3 + 2];
            lp[idx++] = pos[b * 3]; lp[idx++] = pos[b * 3 + 1]; lp[idx++] = pos[b * 3 + 2];
          }
        }
      }
      lineGeom.setDrawRange(0, idx / 3);
      lineGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      geom.dispose(); mat.dispose();
      lineGeom.dispose(); lineMat.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />;
}
