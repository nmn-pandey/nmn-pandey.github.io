import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NeuralNetwork = () => {
    const count = 120;
    const meshRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);

    const [particles, connections] = useMemo(() => {
        const tempParticles = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            tempParticles[i * 3] = (Math.random() - 0.5) * 15;
            tempParticles[i * 3 + 1] = (Math.random() - 0.5) * 15;
            tempParticles[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }

        // Create connections (lines) between nearby particles
        const tempConnections = [];
        const maxDistance = 3.5;

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = tempParticles[i * 3] - tempParticles[j * 3];
                const dy = tempParticles[i * 3 + 1] - tempParticles[j * 3 + 1];
                const dz = tempParticles[i * 3 + 2] - tempParticles[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < maxDistance) {
                    tempConnections.push(i, j);
                }
            }
        }

        return [tempParticles, new Uint16Array(tempConnections)];
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        const positions = meshRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            positions[i * 3 + 1] += Math.sin(time * 0.5 + positions[i * 3]) * 0.003;
            positions[i * 3] += Math.cos(time * 0.5 + positions[i * 3 + 1]) * 0.003;
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true;

        if (linesRef.current) {
            linesRef.current.geometry.attributes.position.needsUpdate = true;
            linesRef.current.rotation.y = time * 0.05;
            linesRef.current.rotation.x = time * 0.03;
        }

        meshRef.current.rotation.y = time * 0.05;
        meshRef.current.rotation.x = time * 0.03;
    });

    return (
        <group>
            <points ref={meshRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={particles}
                        itemSize={3}
                        args={[particles, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.08}
                    color="#00f2ff"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                />
            </points>
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={particles}
                        itemSize={3}
                        args={[particles, 3]}
                    />
                    <bufferAttribute
                        attach="index"
                        count={connections.length}
                        array={connections}
                        itemSize={1}
                        args={[connections, 1]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color="#7000ff"
                    transparent
                    opacity={0.15}
                    linewidth={1}
                />
            </lineSegments>
        </group>
    );
};

export default NeuralNetwork;

