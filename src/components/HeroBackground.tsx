import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Enhanced Three.js particle field for the hero.
 * - DPR clamped to 1.5
 * - Pauses when offscreen / tab hidden
 * - Disposes on unmount
 * - Added floating particles, varying sizes, and glow effect
 */
export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 1. MAIN PARTICLE FIELD (Background)
    const count = window.innerWidth < 768 ? 1200 : 2400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colorA = new THREE.Color("#FF3C00");
    const colorB = new THREE.Color("#FF7A00");

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const r = 45 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      const c = colorA.clone().lerp(colorB, t);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      
      // Variable sizes
      sizes[i] = 0.2 + Math.random() * 0.4;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 2. FLOATING STAR PARTICLES (Foreground)
    const starCount = 400;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 150;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 20;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xff8844,
      size: 0.15,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 3. SUBTLE TORUS ACCENT (Main)
    const torusGeo = new THREE.TorusGeometry(30, 0.12, 32, 300);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xff5a00,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 2.4;
    torus.rotation.z = Math.PI / 4;
    scene.add(torus);

    // 4. SECONDARY TORUS (Smaller, opposite rotation)
    const torus2Geo = new THREE.TorusGeometry(22, 0.08, 24, 200);
    const torus2Mat = new THREE.MeshBasicMaterial({
      color: 0xff8844,
      transparent: true,
      opacity: 0.2,
    });
    const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
    torus2.rotation.x = Math.PI / 3;
    torus2.rotation.z = -Math.PI / 6;
    scene.add(torus2);

    // 5. GLOW SPHERE (Center accent)
    const glowGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4400,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowSphere);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    let visible = true;
    const onVisibility = () => (visible = !document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    let raf = 0;
    const clock = new THREE.Clock();
    
    // Store initial positions for stars animation
    const initialStarPositions = starPositions.slice();
    
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      
      const t = clock.getElapsedTime();
      
      // Rotate main particle field
      points.rotation.y = t * 0.05;
      points.rotation.x = Math.sin(t * 0.1) * 0.15;
      points.rotation.z = Math.cos(t * 0.08) * 0.08;
      
      // Rotate stars independently
      stars.rotation.y = t * 0.02;
      stars.rotation.x = Math.sin(t * 0.05) * 0.1;
      
      // Animate torus rings
      torus.rotation.z = t * 0.15;
      torus.rotation.y = Math.sin(t * 0.2) * 0.2;
      torus2.rotation.x = Math.sin(t * 0.25) * 0.3;
      torus2.rotation.z = -t * 0.1;
      
      // Pulse glow sphere
      const scale = 1 + Math.sin(t * 2) * 0.1;
      glowSphere.scale.set(scale, scale, scale);
      
      // Smooth camera follow with easing
      camera.position.x += ((mouse.x * 8) - camera.position.x) * 0.03;
      camera.position.y += ((-mouse.y * 8) - camera.position.y) * 0.03;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      starGeometry.dispose();
      material.dispose();
      starMaterial.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      torus2Geo.dispose();
      torus2Mat.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10"
    />
  );
}