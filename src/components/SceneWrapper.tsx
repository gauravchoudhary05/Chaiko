"use client";

import { useEffect, useState } from "react";
import { Scene3D } from "./Scene3D";

export default function SceneWrapper() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        // Return an empty div with the exact same dimensions while the server is rendering
        return <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
    }

    return <Scene3D />;
}