import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
    'Python', 'PyTorch', 'TensorFlow', 'NLP', 'LLMs',
    'Computer Vision', 'Generative AI', 'MLOps', 'SQL',
    'Azure', 'GCP', 'Docker', 'Scikit-learn', 'Pandas',
    'R', 'Java', 'C++', 'Tableau', 'LangChain'
];

const SkillSphere = () => {
    const groupRef = useRef<THREE.Group>(null);

    const skillPositions = useMemo(() => {
        const positions = [];
        const count = skills.length;
        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            const x = 4 * Math.cos(theta) * Math.sin(phi);
            const y = 4 * Math.sin(theta) * Math.sin(phi);
            const z = 4 * Math.cos(phi);

            positions.push(new THREE.Vector3(x, y, z));
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
            groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {skills.map((skill, i) => (
                <Float key={i} speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <Text
                        position={skillPositions[i]}
                        fontSize={0.35}
                        color={i % 3 === 0 ? "#00f2ff" : i % 3 === 1 ? "#7000ff" : "#ffffff"}
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={2}
                        textAlign="center"
                    >
                        {skill}
                    </Text>
                </Float>
            ))}
        </group>
    );
};

export default SkillSphere;

