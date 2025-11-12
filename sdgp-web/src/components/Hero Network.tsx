import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function HeroNetwork({
  width = '100%',
  height = 700,
  backgroundColor = 0x05070f,
  nodeColor = 0x4fd2ff,
  lineColor = 0x0099ff,
  nodesDesktop = 400,
  nodesMobile = 160,
  maxConnectionDistance = 70,
  mouseParallax = true,
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const pointersRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / height, 0.1, 2000);
    camera.position.set(0, 0, 120);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ✨ create soft glow sprite
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(200,240,255,0.8)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const spriteTex = new THREE.CanvasTexture(canvas);

    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? nodesMobile : nodesDesktop;
    const radius = 80;
    const positions = new Float32Array(NODE_COUNT * 3);
    const basePositions = new Float32Array(NODE_COUNT * 3);

    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = radius * (0.7 + Math.random() * 0.4);
      const x = Math.cos(theta) * Math.sin(phi) * r;
      const y = Math.cos(phi) * r;
      const z = Math.sin(theta) * Math.sin(phi) * r;
      positions.set([x, y, z], i * 3);
      basePositions.set([x, y, z], i * 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 2 : 3.2,
      map: spriteTex,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: nodeColor,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 🧩 connections
    const connections: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = basePositions[i * 3] - basePositions[j * 3];
        const dy = basePositions[i * 3 + 1] - basePositions[j * 3 + 1];
        const dz = basePositions[i * 3 + 2] - basePositions[j * 3 + 2];
        const dist2 = dx * dx + dy * dy + dz * dz;
        if (dist2 < maxConnectionDistance * maxConnectionDistance * 0.7) {
          connections.push(
            basePositions[i * 3],
            basePositions[i * 3 + 1],
            basePositions[i * 3 + 2],
            basePositions[j * 3],
            basePositions[j * 3 + 1],
            basePositions[j * 3 + 2]
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connections, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: 0.25, // ⬅️ softer lines
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const group = new THREE.Group();
    group.add(points);
    group.add(lines);
    scene.add(group);

    // ✨ GSAP intro (gentle zoom-in)
    gsap.fromTo(camera.position, { z: 180 }, { z: 120, duration: 2, ease: 'power2.out' });

    if (mouseParallax) {
      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        pointersRef.current = { x, y };
      });
    }

    const clock = new THREE.Clock();

    function animate() {
      const t = clock.getElapsedTime();

      const pos = geometry.getAttribute('position');
      for (let i = 0; i < NODE_COUNT; i++) {
        const ix = basePositions[i * 3];
        const iy = basePositions[i * 3 + 1];
        const iz = basePositions[i * 3 + 2];
        // smaller amplitude, slower motion
        pos.array[i * 3] = ix + Math.sin(t * 0.2 + i) * 0.5;
        pos.array[i * 3 + 1] = iy + Math.cos(t * 0.25 + i) * 0.4;
        pos.array[i * 3 + 2] = iz + Math.sin(t * 0.15 + i) * 0.3;
      }
      pos.needsUpdate = true;

      // very slow rotation
      group.rotation.y += 0.0003;
      group.rotation.x += 0.0002;

      if (mouseParallax) {
        gsap.to(group.rotation, {
          x: pointersRef.current.y * 0.15,
          y: pointersRef.current.x * 0.25,
          duration: 0.8,
          ease: 'power1.out',
        });
      }

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationIdRef.current!);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      spriteTex.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [height, backgroundColor, nodeColor, lineColor]);

  return (
    // <div
    //   ref={containerRef}
    //   style={{
    //     width,
    //     height,
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     overflow: 'hidden',
    //   }}
    // />
    <></>
  );
}
