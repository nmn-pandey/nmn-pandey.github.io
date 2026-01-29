import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface Skills3DProps {
  skills: Skill[];
}

export default function Skills3D({ skills }: Skills3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const isActiveRef = useRef(true);

  const init = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 300;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;
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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00d4ff, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create skill cubes
    const cubeGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const cubes: THREE.Mesh[] = [];

    skills.forEach((skill, index) => {
      // Create canvas texture with skill name
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      // Background
      ctx.fillStyle = skill.color + '20';
      ctx.fillRect(0, 0, 256, 256);

      // Border
      ctx.strokeStyle = skill.color;
      ctx.lineWidth = 4;
      ctx.strokeRect(8, 8, 240, 240);

      // Skill name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Wrap text
      const words = skill.name.split(' ');
      let y = 100;
      words.forEach((word) => {
        ctx.fillText(word, 128, y);
        y += 28;
      });

      // Level
      ctx.font = 'bold 36px Inter, sans-serif';
      ctx.fillStyle = skill.color;
      ctx.fillText(`${skill.level}%`, 128, 180);

      const texture = new THREE.CanvasTexture(canvas);

      const materials = [
        new THREE.MeshStandardMaterial({ color: skill.color, transparent: true, opacity: 0.3 }), // right
        new THREE.MeshStandardMaterial({ color: skill.color, transparent: true, opacity: 0.3 }), // left
        new THREE.MeshStandardMaterial({ color: skill.color, transparent: true, opacity: 0.3 }), // top
        new THREE.MeshStandardMaterial({ color: skill.color, transparent: true, opacity: 0.3 }), // bottom
        new THREE.MeshStandardMaterial({ map: texture, transparent: true }), // front
        new THREE.MeshStandardMaterial({ color: skill.color, transparent: true, opacity: 0.3 }), // back
      ];

      const cube = new THREE.Mesh(cubeGeometry, materials);

      // Position cubes in a row
      const spacing = 2.5;
      const startX = -((skills.length - 1) * spacing) / 2;
      cube.position.x = startX + index * spacing;
      cube.position.y = 0;
      cube.position.z = 0;

      // Store original position for animation
      (cube as any).originalY = 0;
      (cube as any).floatOffset = index * 0.5;
      (cube as any).skillData = skill;

      scene.add(cube);
      cubes.push(cube);
    });

    cubesRef.current = cubes;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / height) * 2 + 1;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Click handler for cubes
    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / width) * 2 - 1,
        -((e.clientY - rect.top) / height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(cubes);
      if (intersects.length > 0) {
        const clickedCube = intersects[0].object as THREE.Mesh;

        // Spin animation
        const startRotation = clickedCube.rotation.y;
        const targetRotation = startRotation + Math.PI * 2;
        const duration = 500;
        const startTime = Date.now();

        const spin = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);

          clickedCube.rotation.y = startRotation + (targetRotation - startRotation) * easeProgress;

          if (progress < 1) {
            requestAnimationFrame(spin);
          }
        };
        spin();
      }
    };

    container.addEventListener('click', handleClick);

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
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

      const time = Date.now() * 0.001;

      cubes.forEach((cube) => {
        // Floating animation
        const floatOffset = (cube as any).floatOffset;
        cube.position.y = (cube as any).originalY + Math.sin(time + floatOffset) * 0.2;

        // Gentle rotation
        cube.rotation.x = Math.sin(time * 0.5 + floatOffset) * 0.1;
        cube.rotation.y += 0.003;

        // Mouse interaction - cubes rotate towards mouse
        const targetRotationX = mouseRef.current.y * 0.3;
        const targetRotationY = mouseRef.current.x * 0.3;

        cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.02;
        cube.rotation.y += (targetRotationY * 0.1);

        // Scale on hover (simulated by distance to mouse ray)
        const raycaster = new THREE.Raycaster();
        const mouseVector = new THREE.Vector2(mouseRef.current.x, mouseRef.current.y);
        raycaster.setFromCamera(mouseVector, camera);
        const intersects = raycaster.intersectObject(cube);

        if (intersects.length > 0) {
          cube.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1);
        } else {
          cube.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
      });

      // Camera subtle movement
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      isActiveRef.current = false;
      cancelAnimationFrame(animationFrameRef.current);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      cubes.forEach(cube => {
        cube.geometry.dispose();
        (cube.material as THREE.Material[]).forEach(m => m.dispose());
      });
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [skills]);

  useEffect(() => {
    const cleanup = init();
    return () => {
      cleanup?.();
    };
  }, [init]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[300px] rounded-xl overflow-hidden cursor-pointer"
      style={{ background: 'transparent' }}
    />
  );
}
