"use client";
import { useEffect, useRef, ReactNode } from "react";

interface ParallaxBackgroundProps {
  imageUrl: string;
  intensity?: number;
  children?: ReactNode;
}

export default function ParallaxBackground({
  imageUrl,
  intensity = 5,
  children,
}: ParallaxBackgroundProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX / window.innerWidth) * intensity;
      const moveY = (e.clientY / window.innerHeight) * intensity;
      bg.style.transform = `translate3d(-${moveX}%, -${moveY}%, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [intensity]);

  return (
    <div className="absolute inset-0">
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          top: "-5%",
          left: "-5%",
          width: "115%",
          height: "115%",
          backgroundImage: `url('${imageUrl}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          willChange: "transform",
          transition: "transform 0.18s ease-out",
        }}
      />
      {children}
    </div>
  );
}
