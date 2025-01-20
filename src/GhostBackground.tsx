import React, { useState, useEffect } from "react";
import { Ghost } from "lucide-react";

export function GhostBackground() {
  const GHOST_COUNT = 25;
  const GHOST_VARIANTS = [
    "float-1",
    "float-2",
    "float-3",
    "float-4",
    "float-5",
  ];
  const GHOST_SIZES = [24, 32, 48, 64, 72];

  const [ghosts, setGhosts] = useState<
    Array<{
      id: number;
      left: number;
      top: number;
      size: number;
      variant: string;
      delay: number;
      duration: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    const newGhosts = Array.from({ length: GHOST_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: GHOST_SIZES[Math.floor(Math.random() * GHOST_SIZES.length)],
      variant:
        GHOST_VARIANTS[Math.floor(Math.random() * GHOST_VARIANTS.length)],
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 18,
      opacity: 0.1 + Math.random() * 0.15,
    }));
    setGhosts(newGhosts);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ghosts.map((ghost) => (
        <div
          key={ghost.id}
          className={`absolute ${ghost.variant}`}
          style={{
            left: `${ghost.left}%`,
            top: `${ghost.top}%`,
            animationDelay: `${ghost.delay}s`,
            animationDuration: `${ghost.duration}s`,
          }}
        >
          <Ghost
            size={ghost.size}
            className="text-cyan-200 animate-fade-in-out"
            style={
              {
                "--base-opacity": ghost.opacity,
              } as React.CSSProperties
            }
          />
        </div>
      ))}
    </div>
  );
}
