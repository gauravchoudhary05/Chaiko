import { Hero } from "@/components/Hero";
import { TheVibe } from "@/components/TheVibe";
import { Menu } from "@/components/Menu";
import { SocialProof } from "@/components/SocialProof";
import { Footer } from "@/components/Footer";
import { QuickOrderFAB } from "@/components/QuickOrderFAB";
import { Loader } from "@/components/Loader";

import JarSequence from "@/components/JarSequence";
import SceneWrapper from "@/components/SceneWrapper";

export default function Home() {
    return (
        <main className="relative min-h-screen overflow-clip">
            
            {/* ⏳ LAYER 0: THE INITIAL LOADER */}
            <Loader />

            {/* 🟫 LAYER 1: BASE BACKGROUND */}
            {/* The absolute bottom layer of the website. */}
            <div className="fixed inset-0 bg-[#0a0a0a] z-[1]" />

            {/* ☕ LAYER 2: THE 3D CUP */}
            {/* Floats immediately on top of the base color. Perfectly sharp. */}
            <div className="fixed inset-0 z-[2] pointer-events-none">
                <SceneWrapper />
            </div>

            {/* 🎬 LAYER 3: THE HERO ANIMATION CURTAIN */}
            {/* Solid background. Hides the cup. Scrolls up and disappears. */}
            <div className="relative z-[3] bg-[#0a0a0a]">
                <JarSequence>
                    <Hero />
                </JarSequence>
            </div>

            {/* 📝 LAYER 4: TEXT & BORDERS (THE MENU WINDOW) */}
            {/* Must be transparent. Slides up over the animation to reveal the cup. */}
            <div className="relative z-[4] w-full -mt-[50vh] bg-transparent pointer-events-none">
                {/* 🧹 FIX: Removed pb-20 from this line! */}
                <div className="relative pt-10 pointer-events-auto">
                    <TheVibe />
                    <Menu />
                    <SocialProof />
                    <Footer />
                </div>
            </div>

            {/* 🖱️ LAYER 5: INTERACTIVE BUTTONS */}
            <div className="relative z-[5]">
                <QuickOrderFAB />
            </div>

        </main>
    );
}