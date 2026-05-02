"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Decal } from "@react-three/drei";
import * as THREE from "three";
import { useScroll, useTransform } from "framer-motion";

function useBrandTexture() {
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

    useEffect(() => {
        const generate = () => {
            const canvas = document.createElement("canvas");
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            const W = 2048;
            const H = 512;
            canvas.width = W * dpr;
            canvas.height = H * dpr;

            const ctx = canvas.getContext("2d")!;
            ctx.scale(dpr, dpr);

            ctx.clearRect(0, 0, W, H);

            // Subtle ceramic noise grain
            const imageData = ctx.getImageData(0, 0, W * dpr, H * dpr);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                if (Math.random() < 0.03) {
                    const grain = Math.floor(Math.random() * 15);
                    data[i] = grain;       // R
                    data[i + 1] = grain;   // G
                    data[i + 2] = grain;   // B
                    data[i + 3] = 15;      // slightly more visible alpha for clay
                }
            }
            ctx.putImageData(imageData, 0, 0);

            const fontStack = '"Playfair Display", Georgia, "Times New Roman", serif';
            const fontSize = 164;
            const letterSpacing = 18;
            const text = "CHAIKO";
            const chars = text.split("");

            ctx.font = `700 ${fontSize}px ${fontStack}`;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";

            let totalWidth = 0;
            chars.forEach((char, i) => {
                totalWidth += ctx.measureText(char).width;
                if (i < chars.length - 1) totalWidth += letterSpacing;
            });

            const startX = (W - totalWidth) / 2;
            const centerY = H / 2;

            // Deep shadow — intaglio depression
            ctx.save();
            ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
            ctx.shadowBlur = 6;
            ctx.shadowOffsetX = 1.5;
            ctx.shadowOffsetY = 2;
            ctx.fillStyle = "rgba(40, 20, 10, 0.4)";
            let x = startX;
            chars.forEach((char) => {
                ctx.fillText(char, x, centerY + 1.5);
                x += ctx.measureText(char).width + letterSpacing;
            });
            ctx.restore();

            // Primary saffron/gold fill for CHAIKO
            const gradient = ctx.createLinearGradient(0, centerY - fontSize / 2, 0, centerY + fontSize / 2);
            gradient.addColorStop(0, "#F2D2A2"); 
            gradient.addColorStop(0.4, "#D98E5F");
            gradient.addColorStop(1, "#A65D37");

            ctx.save();
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = 1.5;
            ctx.shadowOffsetY = 1.5;
            ctx.fillStyle = gradient;
            x = startX;
            chars.forEach((char) => {
                ctx.fillText(char, x, centerY);
                x += ctx.measureText(char).width + letterSpacing;
            });
            ctx.restore();

            const tex = new THREE.CanvasTexture(canvas);
            tex.anisotropy = 16;
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.generateMipmaps = true;
            setTexture(tex);
        };

        document.fonts.ready.then(generate);
    }, []);

    return texture;
}

function createCupProfile(): THREE.Vector2[] {
    const points: THREE.Vector2[] = [];

    // Tapered base for a traditional Kulhad
    points.push(new THREE.Vector2(0, -1.5));
    points.push(new THREE.Vector2(0.6, -1.5));
    points.push(new THREE.Vector2(0.65, -1.45)); // smooth bottom edge

    // Tapered sides
    points.push(new THREE.Vector2(1.0, 0.0));
    points.push(new THREE.Vector2(1.3, 1.35));
    points.push(new THREE.Vector2(1.35, 1.5)); // Top outer edge

    // Rim top surface
    points.push(new THREE.Vector2(1.25, 1.5)); // Top inner edge

    // Interior profile
    points.push(new THREE.Vector2(1.2, 1.35));
    points.push(new THREE.Vector2(0.9, 0.0));
    points.push(new THREE.Vector2(0.55, -1.35));
    points.push(new THREE.Vector2(0, -1.35)); // Center interior bottom

    return points;
}

function createLiquidGeometry(radius: number, segments: number): THREE.BufferGeometry {
    const geo = new THREE.CircleGeometry(radius, segments);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const dist = Math.sqrt(x * x + y * y) / radius;

        const meniscus = dist * dist * dist * 0.08;
        pos.setZ(i, meniscus);
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
}

export function Cup3D() {
    const groupRef = useRef<THREE.Group>(null);
    const cupMeshRef = useRef<THREE.Mesh>(null);
    const liquidRef = useRef<THREE.Mesh>(null);
    const { scrollYProgress } = useScroll();
    const brandTexture = useBrandTexture();

    const xTransform = useTransform(scrollYProgress, [0, 1], [-4, 4]);
    const yTransform = useTransform(scrollYProgress, [0, 1], [3, -3]);
    const zTransform = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 1.5, 0.5, -1]);

    const rotateYTransform = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
    const rotateZTransform = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [0, -0.2, 0.1, -0.15, 0.2]
    );
    const rotateXTransform = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.4, 0.15]);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;

        const t = clock.getElapsedTime();

        groupRef.current.position.x = xTransform.get();
        const bob = Math.sin(t * 1.5) * 0.15;
        groupRef.current.position.y = yTransform.get() + bob;
        groupRef.current.position.z = zTransform.get();

        groupRef.current.rotation.x = rotateXTransform.get();
        groupRef.current.rotation.y = rotateYTransform.get();
        groupRef.current.rotation.z = rotateZTransform.get();

        if (liquidRef.current) {
            const geo = liquidRef.current.geometry;
            const pos = geo.attributes.position;
            for (let i = 1; i < pos.count; i++) {
                const x = pos.getX(i);
                const y = pos.getY(i);
                const dist = Math.sqrt(x * x + y * y);
                const ripple = Math.sin(dist * 4 + t * 2) * 0.005;
                const baseMeniscus = (dist / 1.25) ** 3 * 0.08;
                pos.setZ(i, baseMeniscus + ripple);
            }
            pos.needsUpdate = true;
        }
    });

    const cupGeometry = useMemo(() => {
        const profile = createCupProfile();
        const lathe = new THREE.LatheGeometry(profile, 64);
        lathe.computeVertexNormals();
        return lathe;
    }, []);

    const liquidGeometry = useMemo(() => {
        return createLiquidGeometry(1.25, 64);
    }, []);

    const ceramicMaterial = useMemo(() => {
        const mat = new THREE.MeshPhysicalMaterial({
            color: "#8B5E3C",           // Earthy terracotta clay
            roughness: 0.8,             // Matte/raw ceramic texture
            metalness: 0.0,
            clearcoat: 0.0,             // No glaze for raw kulhad look
            sheen: 0.5,
            sheenColor: new THREE.Color("#D98E5F"),
            side: THREE.DoubleSide,
        });
        mat.stencilWrite = true;
        mat.stencilRef = 1;
        mat.stencilFunc = THREE.AlwaysStencilFunc;
        mat.stencilZPass = THREE.ReplaceStencilOp;
        mat.stencilFail = THREE.KeepStencilOp;
        mat.stencilZFail = THREE.KeepStencilOp;
        return mat;
    }, []);

    const liquidMaterial = useMemo(
        () =>
            new THREE.MeshPhysicalMaterial({
                color: "#D7B17E",       // Creamy milky chai color
                roughness: 0.2,
                metalness: 0.0,
                transmission: 0.1,      // Mostly opaque milky liquid
                ior: 1.33,
                thickness: 2.0,
                attenuationColor: new THREE.Color("#8B5E3C"),
                attenuationDistance: 0.5,
                clearcoat: 0.5,
                clearcoatRoughness: 0.1,
                transparent: true,
                side: THREE.DoubleSide,
            }),
        []
    );

    return (
        <group ref={groupRef} scale={1.2}>
            <mesh
                ref={cupMeshRef}
                geometry={cupGeometry}
                position={[0, 0, 0]}
                castShadow
                receiveShadow
            >
                <primitive object={ceramicMaterial} attach="material" />

                {brandTexture && (
                    <Decal
                        position={[0, 0.2, -1.25]} // Pushed further back because of wider lathe
                        rotation={[0, Math.PI, 0]}
                        scale={[2.4, 0.6, 1]}
                    >
                        <meshPhysicalMaterial
                            map={brandTexture}
                            transparent
                            depthTest={false}
                            depthWrite={false}
                            polygonOffset
                            polygonOffsetFactor={-10}
                            roughness={0.8}
                            metalness={0.0}
                            clearcoat={0.0}
                        />
                    </Decal>
                )}
            </mesh>

            <mesh
                ref={liquidRef}
                geometry={liquidGeometry}
                position={[0, 0.85, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow
            >
                <primitive object={liquidMaterial} attach="material" />
            </mesh>
        </group>
    );
}
