"use client";

import { useEffect } from "react";
import { useVibesStore } from "@/store/vibesStore";

const levelConfig = {
    Quiet: {
        dot: "bg-sage",
        pulse: "bg-sage",
        label: "Quiet — Perfect for studying",
        wait: null,
    },
    Buzzing: {
        dot: "bg-gold",
        pulse: "bg-gold",
        label: "Buzzing",
        wait: "~15 min wait",
    },
    Packed: {
        dot: "bg-red-400",
        pulse: "bg-red-400",
        label: "Packed",
        wait: "30+ min wait",
    },
};

export function BusyMeter() {
    const { busyLevel, cycleLevel } = useVibesStore();
    const config = levelConfig[busyLevel];

    // Auto-cycle every 45 seconds to simulate real-time updates
    useEffect(() => {
        const interval = setInterval(cycleLevel, 45_000);
        return () => clearInterval(interval);
    }, [cycleLevel]);

    return (
        <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
            style={{
                background: "rgba(44, 27, 24, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(249, 244, 238, 0.15)",
            }}
        >
            {/* Pulsing indicator dot */}
            <div className="relative flex items-center justify-center w-3 h-3">
                <span
                    className={`absolute inline-block w-3 h-3 rounded-full ${config.pulse} pulse-ring opacity-70`}
                />
                <span className={`relative inline-block w-2 h-2 rounded-full ${config.dot}`} />
            </div>

            {/* Status text */}
            <span className="text-parchment-80 text-sm font-medium">
                {config.label}
            </span>

            {/* Wait time badge */}
            {config.wait && (
                <>
                    <span className="text-parchment-20 text-xs">·</span>
                    <span className="text-gold text-xs font-medium">{config.wait}</span>
                </>
            )}
        </div>
    );
}
