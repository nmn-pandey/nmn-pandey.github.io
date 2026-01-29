import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  originalPosition: THREE.Vector3;
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const linesRef = useRef<THREE.LineSegments | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const isActiveRef = useRef(true);

  const init = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const particleCount = Math.min(80, Math.floor((width * height) / 15000));
    const particles: Particle[] = [];
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00d4ff); // Cyan
    const color2 = new THREE.Color(0xa855f7); // Purple

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 50;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      particles.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        ),
        originalPosition: new THREE.Vector3(x, y, z)
      });
    }

    particlesRef.current = particles;

    // Particle geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Lines for connections
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.15
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    lines.frustumCulled = false;
    scene.add(lines);
    linesRef.current = lines;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / width) * 2 - 1;
      mouseRef.current.y = -(e.clientY / height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Animation loop
    let frameCount = 0;
    const animate = () => {
      if (!isActiveRef.current) return;
      
      animationFrameRef.current = requestAnimationFrame(animate);
      frameCount++;

      // Render every 2nd frame for performance
      if (frameCount % 2 !== 0) return;

      const positions = geometry.attributes.position.array as Float32Array;
      const linePositions = lines.geometry.attributes.position.array as Float32Array;
      let lineIndex = 0;

      // Update particle positions
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // Mouse interaction - particles move away from cursor
        const mouseX = mouseRef.current.x * 50;
        const mouseY = mouseRef.current.y * 50;
        const dx = particle.position.x - mouseX;
        const dy = particle.position.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 15) {
          const force = (15 - dist) / 15;
          particle.velocity.x += (dx / dist) * force * 0.01;
          particle.velocity.y += (dy / dist) * force * 0.01;
        }

        // Apply velocity with damping
        particle.position.x += particle.velocity.x;
        particle.position.y += particle.velocity.y;
        particle.position.z += particle.velocity.z;

        // Damping
        particle.velocity.multiplyScalar(0.98);

        // Gentle return to original position
        const returnForce = 0.001;
        particle.velocity.x += (particle.originalPosition.x - particle.position.x) * returnForce;
        particle.velocity.y += (particle.originalPosition.y - particle.position.y) * returnForce;
        particle.velocity.z += (particle.originalPosition.z - particle.position.z) * returnForce;

        // Boundary check
        if (Math.abs(particle.position.x) > 60) particle.velocity.x *= -1;
        if (Math.abs(particle.position.y) > 60) particle.velocity.y *= -1;
        if (Math.abs(particle.position.z) > 30) particle.velocity.z *= -1;

        // Update geometry
        positions[i * 3] = particle.position.x;
        positions[i * 3 + 1] = particle.position.y;
        positions[i * 3 + 2] = particle.position.z;

        // Draw connections (only check every 5th particle for performance)
        if (i % 5 === 0) {
          for (let j = i + 1; j < particles.length && j < i + 15; j++) {
            const other = particles[j];
            const dx = particle.position.x - other.position.x;
            const dy = particle.position.y - other.position.y;
            const dz = particle.position.z - other.position.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < 12 && lineIndex < linePositions.length - 6) {
              linePositions[lineIndex++] = particle.position.x;
              linePositions[lineIndex++] = particle.position.y;
              linePositions[lineIndex++] = particle.position.z;
              linePositions[lineIndex++] = other.position.x;
              linePositions[lineIndex++] = other.position.y;
              linePositions[lineIndex++] = other.position.z;
            }
          }
        }
      }

      // Clear remaining line positions
      for (let i = lineIndex; i < linePositions.length; i++) {
        linePositions[i] = 0;
      }

      geometry.attributes.position.needsUpdate = true;
      lines.geometry.attributes.position.needsUpdate = true;

      // Subtle camera rotation based on mouse
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      isActiveRef.current = false;
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const cleanup = init();
    return () => {
      cleanup?.();
    };
  }, [init]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at center, hsl(220 25% 12%) 0%, hsl(220 25% 8%) 100%)' }}
    />
  );
}
