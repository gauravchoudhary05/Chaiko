"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Steam3D() {
    const groupRef = useRef<THREE.Group>(null);

    const puffs = useMemo(() => {
        return Array.from({ length: 5 }).map(() => ({
            x: (Math.random() - 0.5) * 0.5,
            y: Math.random() * 1.5,
            z: (Math.random() - 0.5) * 0.5,
            speed: 0.005 + Math.random() * 0.01,
            swaySpeed: 1 + Math.random(),
            swayAmount: 0.1 + Math.random() * 0.1,
            scale: 0.8 + Math.random() * 0.5,
        }));
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();
        groupRef.current.children.forEach((mesh, i) => {
            const puff = puffs[i];
            mesh.position.y += puff.speed;
            mesh.position.x = puff.x + Math.sin(time * puff.swaySpeed) * puff.swayAmount;
            if (mesh.position.y > 3) mesh.position.y = 0;
            const mat = (mesh as THREE.Mesh).material as THREE.MeshBasicMaterial;
            const fade = Math.sin((mesh.position.y / 3) * Math.PI);
            mat.opacity = fade * 0.08; 
        });
    });

    return (
        <group ref={groupRef} position={[0, 1.4, 0]}>
            {puffs.map((puff, i) => (
                <mesh key={i} position={[puff.x, puff.y, puff.z]} scale={puff.scale}>
                    <sphereGeometry args={[0.5, 16, 16]} />
                    <meshBasicMaterial color="#ffffff" transparent depthWrite={false} opacity={0} />
                </mesh>
            ))}
        </group>
    );
}
