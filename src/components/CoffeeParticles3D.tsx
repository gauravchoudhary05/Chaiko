"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll, useTransform } from "framer-motion";

interface ParticleData {
    id: number;
    initialPosition: THREE.Vector3;
    rotationSpeed: THREE.Vector3;
    scale: number;
    scrollMultiplier: number;
}

function seededRand(seed: number): number {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
}

export function ChaiParticles3D() {
    const groupRef = useRef<THREE.Group>(null);
    const { scrollYProgress } = useScroll();

    const globalYProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const particles = useMemo<ParticleData[]>(() => {
        return Array.from({ length: 25 }, (_, i) => ({
            id: i,
            initialPosition: new THREE.Vector3(
                (seededRand(i * 3) - 0.5) * 16,
                (seededRand(i * 5) - 0.5) * 12,
                (seededRand(i * 7) - 0.5) * 8
            ),
            rotationSpeed: new THREE.Vector3(
                (seededRand(i * 11) - 0.5) * 0.02,
                (seededRand(i * 13) - 0.5) * 0.02,
                (seededRand(i * 17) - 0.5) * 0.02
            ),
            scale: 0.08 + seededRand(i * 19) * 0.15,
            scrollMultiplier: 0.5 + seededRand(i * 23) * 2.0,
        }));
    }, []);

    // Chai Spice material (Saffron / Cinnamon / Cardamom blend)
    const spiceMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: "#D98E5F", // Warm saffron/terracotta spice color
            roughness: 0.8,
            metalness: 0.0,
        });
    }, []);

    // Small irregular fragments for spices
    const spiceGeometry = useMemo(() => {
        const geo = new THREE.IcosahedronGeometry(1, 0); // Low-poly fragment
        geo.scale(1, 0.4, 0.6); // Flattened spice fragment shape
        return geo;
    }, []);

    useFrame(() => {
        if (!groupRef.current) return;

        const scrollVal = globalYProgress.get();

        groupRef.current.children.forEach((child, i) => {
            const p = particles[i];

            child.rotation.x += p.rotationSpeed.x;
            child.rotation.y += p.rotationSpeed.y;
            child.rotation.z += p.rotationSpeed.z;

            child.position.y = p.initialPosition.y + (scrollVal * p.scrollMultiplier * 8);

            child.position.x = p.initialPosition.x + Math.sin(Date.now() * 0.001 + i) * 0.1;
        });
    });

    return (
        <group ref={groupRef}>
            {particles.map((p) => (
                <mesh
                    key={p.id}
                    position={p.initialPosition}
                    scale={p.scale}
                    geometry={spiceGeometry}
                    material={spiceMaterial}
                    castShadow
                    receiveShadow
                />
            ))}
        </group>
    );
}
